'use client';

import React, { useState } from "react"

export type FieldGroupType = {
    isMultipliable?: boolean,
    /**
     * children must be a render-prop: `(index: number) => React.ReactNode`
     */
    children: (index: number) => React.ReactNode,
    label: string,
    className?: string
}

export default function FieldGroup({ isMultipliable, children, label, className = '' }: FieldGroupType) {
    const [fieldCount, setFieldCount] = useState(1);

    const renderLabel = () => {
        const labelTitle = label
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');

        return <div>{ labelTitle }</div>
    }

    const handleAddField = () => {
        setFieldCount(c => c + 1);
    }

    const renderAddFieldButton = () => {
        if (!isMultipliable) {
            return null;
        }

        return <button type='button' onClick={ handleAddField } className='Button'>+ Add { label }</button>
    }

    const renderChildren = () => {
        if (isMultipliable) {
            return Array.from({ length: fieldCount }).map((_, i) => {
                const groupId = `${label}-${i}`;

                return (
                    <div key={ groupId } className='flex gap-4 items-center'>
                        { children(i) }
                    </div>
                )
            })
        }

        return children(0);
    }
    
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            { renderLabel() }
            { renderChildren() }
            { renderAddFieldButton() }
        </div>
    )
}