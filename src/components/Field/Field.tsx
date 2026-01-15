'use client';

import { ChangeEvent } from "react";

export type FieldType = {
    type: string,
    id: string,
    name?: string,
    placeholder?: string,
    value?: string,
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    isRequired?: boolean,
    className?: string,
    defaultValue?: string
}

export default function Field({
    type,
    placeholder,
    value,
    onChange,
    id,
    label,
    name,
    isRequired,
    className,
    defaultValue
}: FieldType
) {
    if (!type) {
        return null;
    }

    const renderLabel = () => {
        if (!label) {
            return null;
        }

        return <label htmlFor={ id }>{ label }</label>
    }

    const inputName = name ?? id;

    const renderInput = () => {
        if (!value || !onChange) {
            return <input
                className='bg-navbar py-2 px-4 rounded-lg'
                type={ type }
                placeholder={ placeholder }
                id={ id }
                name={ inputName }
                required={ isRequired }
                defaultValue={ defaultValue }
            />
        }

        return <input
            className='bg-navbar py-2 px-4 rounded-lg'
            type={ type }
            placeholder={ placeholder }
            id={ id }
            name={ inputName }
            value={ value }
            onChange={ onChange }
            required={ isRequired }
            defaultValue={ defaultValue }
        />
    }

    return (
        <div className={ `Field Field_type_${type} flex gap-2 items-center ${className}` }>
            { renderLabel() }
            { renderInput() }
        </div>
    );
}