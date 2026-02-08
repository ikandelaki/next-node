"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { fetchNext } from "@/lib/fetchData";
import { normalizeImageUrl } from "@/lib/utils/url";
import TrashIcon from "../TrashIcon";
import Loader from "../Loader/Loader";

type ImageType = string | null;

type CategoryImageUploadType = {
  image?: ImageType;
  categoryId?: number;
};

export default function CategoryImageUpload({ image }: CategoryImageUploadType) {
  const [uploadedFile, setUploadedFile] = useState<ImageType>(image ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
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

    setIsLoading(true);

    const { data } = await fetchNext("/images/upload/category", formData);

    setIsLoading(false);
    setUploadedFile(data);
  };

  const handleImageDelete = () => {
    setUploadedFile(null);

    if (imageInputRef.current?.value) {
      imageInputRef.current.value = "";
    }
  };

  // If we already have mediaGallery for the entity we can render it directly.
  // This is useful for entity EDIT forms.
  const renderExistingMediaGallery = () => {
    if (!uploadedFile) {
      return null;
    }

    console.log(">> uploadedFile", normalizeImageUrl(uploadedFile));
    return (
      <div className="relative group w-max">
        <Image
          src={normalizeImageUrl(uploadedFile)}
          alt="Product image"
          width={192}
          height={108}
          className="cursor-pointer"
        />
        <div className="absolute w-full h-full left-0 top-0 transition-opacity transition-300 opacity-0 group-hover:opacity-100 group-hover:bg-black/30">
          <button onClick={handleImageDelete} className="absolute top-1/2 left-1/2 -translate-1/2 ">
            <TrashIcon className="**:stroke-red-400" />
          </button>
        </div>
        <input hidden value={uploadedFile} name="mainImage" readOnly />
      </div>
    );
  };

  const renderLabel = () => {
    return (
      <label htmlFor="file" className="Button ml-auto">
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
    <section className="relative w-full">
      {renderLoader()}
      <div className="flex gap-2">
        <div className="flex w-full">
          <span>Main image</span>
          <input type="file" id="file" name="file" className="hidden" onChange={handleFileUpload} ref={imageInputRef} />
          {renderLabel()}
        </div>
      </div>
      {renderExistingMediaGallery()}
    </section>
  );
}
