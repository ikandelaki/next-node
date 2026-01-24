'use client';

import { ChangeEvent, useEffect, MouseEvent, useState } from "react";
import Image from "next/image";
import { fetchNext } from "@/lib/fetchData";
import { useNotificationStore } from "@/store/useNotificationStore";

type ImageUploadType = {
    isSquare?: boolean;
}

export default function ImageUpload({ isSquare }: ImageUploadType) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedFilePaths, setUploadedFilePaths] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
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

        setIsLoading(true);

        const { type, message, data } = await fetchNext(
            '/images/upload',
            formData
        );

        setIsLoading(false);
        setNotifications({ type, message });

        if (data?.length) {
            setUploadedFilePaths(data);
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
        if (!uploadedFilePaths?.length) {
            return null;
        }

        return uploadedFilePaths.map((filePath, key) => (
            <input
                type="text"
                defaultValue={filePath}
                key={ `${filePath}-${key}` }
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