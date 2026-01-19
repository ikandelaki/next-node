'use client';

import React, { useState } from "react"
import TrashIcon from "../TrashIcon";

export type ChildrenRenderer = (index: number) => React.ReactNode

export type FieldGroupType = {
    isMultipliable?: boolean,
    /**
     * children can be a render-prop: `(index: number) => React.ReactNode`
     */
    children: ChildrenRenderer | React.ReactNode,
    label?: string,
    className?: string,
    isDeletable?: boolean
}

export default function FieldGroup({ isMultipliable, children, label, className = '', isDeletable }: FieldGroupType) {
    const [fieldCount, setFieldCount] = useState(1);

    const renderLabel = () => {
        if (!label) {
            return null;
        }

        const labelTitle = label
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');

        return <h2>{ labelTitle }</h2>
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

    const renderDeleteButton = () => {
        if (!isDeletable) {
            return null;
        }
        return <TrashIcon />
    }

    const renderChildren = () => {
        if (isMultipliable && typeof children !== 'function') {
            console.error('>> FieldGroup component: if isMultipliable is provided as true, children should be a function that returns a react node')

            return null;
        }

        if (!isMultipliable && typeof children === 'function') {
            return (
                <div className='flex gap-4 items-center'>
                    { (children as ChildrenRenderer)(1) }
                    { renderDeleteButton() }
                </div>
            )
        }

        if (isMultipliable) {
            return Array.from({ length: fieldCount }).map((_, i) => {
                const groupId = `${label}-${i}`;

                return (
                    <div key={ groupId } className='flex gap-4 items-center'>
                        { (children as ChildrenRenderer)(i) }
                        { renderDeleteButton() }
                    </div>
                )
            })
        }

        return (children as React.ReactNode);
    }
    
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            { renderLabel() }
            { renderChildren() }
            { renderAddFieldButton() }
        </div>
    )
}