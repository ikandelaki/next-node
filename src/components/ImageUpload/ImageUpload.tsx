'use client';

import { ChangeEvent, useEffect, MouseEvent, useState } from "react";
import Image from "next/image";
import { fetchNext } from "@/lib/fetchData";
import { useNotificationStore } from "@/store/useNotificationStore";
import { normalizeImageUrl } from "@/lib/utils/url";

type MediaGalleryType = {
    id: number;
    url: string;
    role: string;
}

type ImageUploadType = {
    isSquare?: boolean;
    mediaGallery?: MediaGalleryType[]
}

export default function ImageUpload({ isSquare, mediaGallery = [] }: ImageUploadType) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<MediaGalleryType[]>(mediaGallery);
    const setNotifications = useNotificationStore((state) => state.setNotifications);

    const handleFileUploadSave = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!selectedFiles?.length) {
            return;
        }

        const formData = new FormData();
        for (const selectedFile of selectedFiles) {
            formData.append('file', selectedFile, selectedFile.name);
        }

        const { type, message, data } = await fetchNext(
            '/images/upload',
            formData
        );

        setNotifications({ type, message });

        if (data?.length) {
            setUploadedFiles(data);
        }
    }

    const handleFileUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files = [] } = event.target;

        if (!files?.length) {
            return null;
        }

        const fileData: File[] = [];
        for (const file of files) {
            fileData.push(file);
        }
        
        setSelectedFiles((files) => [...files, ...fileData]);
    }

    // If we already have mediaGallery for the entity we can render it directly.
    // This is useful for entity EDIT forms.
    const renderExistingMediaGallery = () => {
        if (!mediaGallery?.length) {
            return null;
        }

        return mediaGallery.map(({ url }, key) => {
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

    const renderSelectedFile = (image: File, key = 0) => {
        const imageUrl = URL.createObjectURL(image);
        
        return (
            <div key={ `${imageUrl}-${key}` }>
                <Image
                    src={ imageUrl }
                    alt="Product image"
                    width={ 160 }
                    height={ 160 }
                />
            </div>
        );
    }

    const renderSelectedFiles = () => {
        if (!selectedFiles || !selectedFiles?.length) {
            return null;
        }

        return (
            <div className="flex gap-2">
                { selectedFiles.map((selectedFile, key) => renderSelectedFile(selectedFile, key)) }
            </div>
        )
    }

    const renderSaveButton = () => {
        if (!selectedFiles || !selectedFiles?.length) {
            return null;
        }

        return (
            <div className="block">
                <button className="Button bg-red-600 mt-2" onClick={ handleFileUploadSave }>Save</button>
            </div>
        )
    }

    // After uploading the files we need to store uploaded file paths in inputs
    // This is needed because after we create a product we need to assign these filePaths to the product
    // This is how we store file path data for now
    const renderHiddenInputFields = () => {
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
                    + Add
                </label>
            );
        }

        return (
            <label htmlFor="image-files" className="Button">Upload Image</label>
        )
    }

    useEffect(() => {
        return () => selectedFiles.forEach(file =>
            URL.revokeObjectURL(file.name)
        );
    }, [selectedFiles]);

    return (
        <section>
            <div className="flex gap-2">
                { renderExistingMediaGallery() }
                { renderSelectedFiles() }
                <div className="inline-block">
                    <input type="file" id="image-files" name="image-files" className="hidden" onChange={ handleFileUploadChange } multiple />
                    { renderLabel() }
                    { renderHiddenInputFields() }
                </div>
            </div>
            { renderSaveButton() }
        </section>
    )
}