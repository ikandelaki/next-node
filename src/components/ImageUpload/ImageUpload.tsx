'use client';

import { ChangeEvent, useEffect, MouseEvent, useState } from "react";
import Image from "next/image";
import { fetchNext } from "@/lib/fetchData";
import { useNotificationStore } from "@/store/useNotificationStore";

export default function ImageUpload() {
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

        const fileData = [];
        for (const file of files) {
            fileData.push(file);
        }
        
        setSelectedFiles(fileData);
    }

    const renderSelectedImage = (image: File, key = 0) => {
        const imageUrl = URL.createObjectURL(image);
        
        return (
            <div key={ `${imageUrl}-${key}` }>
                <Image
                    src={ imageUrl }
                    alt="Product image"
                    width={ 180 }
                    height={ 180 }
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
                { selectedFiles.map((selectedFile, key) => renderSelectedImage(selectedFile, key)) }
            </div>
        )
    }

    const renderSaveButton = () => {
        if (!selectedFiles || !selectedFiles?.length) {
            return null;
        }

        return (
            <button className="Button bg-red-600 ml-4" onClick={ handleFileUploadSave }>Save</button>
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

    // Need to implement this, probably
    // useEffect(() => {
    //     return () => selectedFiles.forEach(file =>
    //         URL.revokeObjectURL(file)
    //     );
    // }, [selectedFiles]);

    return (
        <div>
            { renderSelectedFiles() }
            <div>
                <input type="file" id="image-files" name="image-files" className="hidden" onChange={ handleFileUploadChange } multiple />
                <label htmlFor="image-files" className="Button">Upload Image</label>
                { renderHiddenInputFields() }
                { renderSaveButton() }
            </div>
        </div>
    )
}