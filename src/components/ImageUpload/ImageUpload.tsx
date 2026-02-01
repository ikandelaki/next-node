'use client';

import { ChangeEvent, useEffect, MouseEvent, useState } from "react";
import Image from "next/image";
import { fetchNext } from "@/lib/fetchData";
import { useNotificationStore } from "@/store/useNotificationStore";
import { normalizeImageUrl } from "@/lib/utils/url";

export type MediaGalleryType = {
    id?: number;
    url: string;
    role: string;
}

export type ImageUploadType = {
    isSquare?: boolean;
    mediaGallery?: MediaGalleryType[]
}

export default function ImageUpload({ isSquare, mediaGallery = [] }: ImageUploadType) {
    const [uploadedFiles, setUploadedFiles] = useState<MediaGalleryType[]>(mediaGallery);
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
            formData.append('file', selectedFile, selectedFile.name);
        }

        const { type, message, data } = await fetchNext(
            '/images/upload',
            formData
        );

        setNotifications({ type, message });

        if (data?.length) {
            console.log('>> data', data);
            const formattedFileData = data.map((filePath: string) => ({ url: filePath, role: '' }))
            setUploadedFiles([...uploadedFiles, ...formattedFileData]);
        }
    }

    // If we already have mediaGallery for the entity we can render it directly.
    // This is useful for entity EDIT forms.
    const renderExistingMediaGallery = () => {
        console.log('>> uploadedFiles', uploadedFiles);
        if (!uploadedFiles?.length) {
            return null;
        }

        return uploadedFiles.map(({ url }, key) => {
            return (
                <div key={ `${url}-${key}` }>
                    <Image
                        src={ normalizeImageUrl(url) }
                        alt="Product image"
                        width={ 160 }
                        height={ 160 }
                    />
                </div>
            );
        })
    }

    // After uploading the files we need to store uploaded file paths in inputs
    // This is needed because after we create a product we need to assign these filePaths to the product
    // This is how we store file path data for now
    const renderHiddenInputFields = () => {
        console.log('>> uploadedFiles', uploadedFiles);
        if (!uploadedFiles?.length) {
            return (
                <input
                    type="text"
                    defaultValue=''
                    className="hidden"
                    name="image"
                />
            );
        }

        return uploadedFiles.map(({ url }, key) => (
            <input
                type="text"
                defaultValue={url}
                key={ `${url}-${key}` }
                className="hidden"
                name="image"
            />
        ))
    }

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
            <label htmlFor="image-files" className="Button">Upload Image</label>
        )
    }

    return (
        <section>
            <div className="flex gap-2">
                { renderExistingMediaGallery() }
                <div className="inline-block">
                    <input type="file" id="image-files" name="image-files" className="hidden" onChange={ handleFileUpload } multiple />
                    { renderLabel() }
                    { renderHiddenInputFields() }
                </div>
            </div>
        </section>
    )
}