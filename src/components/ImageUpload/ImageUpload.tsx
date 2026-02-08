"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import Image from "next/image";
import { fetchNext } from "@/lib/fetchData";
import { SUCCESS_TYPE, useNotificationStore } from "@/store/useNotificationStore";
import { normalizeImageUrl } from "@/lib/utils/url";
import TrashIcon from "../TrashIcon";
import { ImageModel } from "@/app/generated/prisma/models";
import Loader from "../Loader/Loader";

export type MediaGalleryType = {
  id?: number;
  url: string;
  role: string;
};

export type ImageUploadType = {
  isSquare?: boolean;
  mediaGallery?: MediaGalleryType[];
  productId?: number;
};

export default function ImageUpload({ isSquare, mediaGallery = [], productId }: ImageUploadType) {
  const [uploadedFiles, setUploadedFiles] = useState<MediaGalleryType[]>(mediaGallery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setNotifications = useNotificationStore((state) => state.setNotifications);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = event.target;

    if (!files?.length) {
      return null;
    }

    const fileData: File[] = [];
    for (const file of files) {
      fileData.push(file);
    }

    const formData = new FormData();
    for (const selectedFile of fileData) {
      formData.append("file", selectedFile, selectedFile.name);
    }

    if (productId) {
      formData.set("productId", productId.toString());
    }

    setIsLoading(true);

    const { type, message, data } = await fetchNext("/images/upload", formData);

    setIsLoading(false);
    setNotifications({ type, message });

    console.log(">> data 1", data);
    if (data?.length && productId) {
      const formattedFileData = data.map(({ id, url, role, parentId }: ImageModel) => ({
        id,
        url,
        role,
        parentId,
      }));
      setUploadedFiles([...uploadedFiles, ...formattedFileData]);

      return;
    }

    console.log(">> data", data);
    const formattedFileData = data.map((filePath: ImageModel, key: number) => ({
      id: key,
      url: filePath,
      role: "",
      parentId: "",
    }));
    setUploadedFiles([...uploadedFiles, ...formattedFileData]);
  };

  const handleImageDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const imageId = event?.currentTarget?.dataset?.imageid;

    if (!imageId) {
      return;
    }

    setIsLoading(true);
    const { type, message } = await fetchNext("/images/delete", imageId);

    setIsLoading(false);
    setNotifications({ type, message });

    if (type === SUCCESS_TYPE) {
      const newFiles = uploadedFiles.filter((uploadedFile) => uploadedFile.id !== parseInt(imageId));
      console.log(">> newFiles", newFiles);
      setUploadedFiles(newFiles);
    }
  };

  // If we already have mediaGallery for the entity we can render it directly.
  // This is useful for entity EDIT forms.
  const renderExistingMediaGallery = () => {
    if (!uploadedFiles?.length) {
      return null;
    }

    console.log(">> rendering image uploadedFiles", uploadedFiles);
    return uploadedFiles.map(({ id, url }, key) => {
      return (
        <div key={`${url}-${key}`} className="relative group">
          <Image src={normalizeImageUrl(url)} alt="Product image" width={160} height={160} className="cursor-pointer" />
          <div className="absolute w-full h-full left-0 top-0 transition-opacity transition-300 opacity-0 group-hover:opacity-100 group-hover:bg-black/30">
            <button onClick={handleImageDelete} className="absolute top-1/2 left-1/2 -translate-1/2 " data-imageid={id}>
              <TrashIcon className="**:stroke-red-400" />
            </button>
          </div>
        </div>
      );
    });
  };

  // After uploading the files we need to store uploaded file paths in inputs
  // This is needed because after we create a product we need to assign these filePaths to the product
  // This is how we store file path data for now
  const renderHiddenInputFields = () => {
    if (!uploadedFiles?.length) {
      return <input type="text" defaultValue="" className="hidden" name="image" />;
    }

    return uploadedFiles.map(({ url }, key) => (
      <input type="text" defaultValue={url} key={`${url}-${key}`} className="hidden" name="image" />
    ));
  };

  const renderLabel = () => {
    if (isSquare) {
      return (
        <label
          className="w-40 h-40 cursor-pointer border border-dashed flex items-center justify-center text-sm"
          htmlFor="image-files"
        >
          <div className="flex flex-col items-center gap-2">
            <span>+ Add</span>
            <span className="text-xs text-gray-300">(.jpg, .jpeg, .png only)</span>
          </div>
        </label>
      );
    }

    return (
      <label htmlFor="image-files" className="Button">
        Upload Image
      </label>
    );
  };

  const renderLoader = () => {
    if (!isLoading) {
      return null;
    }

    return <Loader />;
  };

  return (
    <section className="relative">
      {renderLoader()}
      <div className="flex gap-2">
        {renderExistingMediaGallery()}
        <div className="inline-block">
          <input
            type="file"
            id="image-files"
            name="image-files"
            className="hidden"
            onChange={handleFileUpload}
            multiple
          />
          {renderLabel()}
          {renderHiddenInputFields()}
        </div>
      </div>
    </section>
  );
}
