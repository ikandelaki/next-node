'use client';

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { fetchNext } from "@/lib/fetchData";
import { ERROR_TYPE, SUCCESS_TYPE, useNotificationStore } from "@/store/useNotificationStore";

export default function ImageUpload() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFileUrls, setSelectedFileUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const setNotifications = useNotificationStore((state) => state.setNotifications);

    const handleFileUploadSave = async () => {
        if (!selectedFiles?.length) {
            return;
        }

        const formData = new FormData();
        for (const selectedFile of selectedFiles) {
            formData.append('file', selectedFile, selectedFile.name);
        }

        setIsLoading(true);

        const { type, message } = await fetchNext(
            '/images/upload',
            formData
        );

        setIsLoading(false);

        setNotifications({ type, message });
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
            <Image
                src={ imageUrl }
                alt="Product image"
                width={ 180 }
                height={ 180 }
                key={ `${imageUrl}-${key}` }
            />
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
            <button type="submit" className="Button bg-red-600 ml-4" onClick={ handleFileUploadSave }>Save</button>
        )
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
                <input type="file" id="image" name="image" className="hidden" onChange={ handleFileUploadChange } multiple />
                <label htmlFor="image" className="Button">Upload Image</label>
                { renderSaveButton() }
            </div>
        </div>
    )
}