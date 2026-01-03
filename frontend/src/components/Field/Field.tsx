'use client';

import { ChangeEvent } from "react";

export type FieldType = {
    type: string,
    id: string,
    name?: string,
    placeholder?: string,
    value?: string,
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void,
    label?: string
}

export default function Field({
    type,
    placeholder,
    value,
    onChange,
    id,
    label,
    name
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
            return <input className='bg-gray-900 p-2' type={ type } placeholder={ placeholder } id={ id } name={ inputName } />
        }

        return <input className='bg-gray-900 p-2' type={ type } placeholder={ placeholder } id={ id } name={ inputName } value={ value } onChange={ onChange } />
    }

    return (
        <div className={ `Field Field_type_${type} flex gap-2 items-center` }>
            { renderLabel() }
            { renderInput() }
        </div>
    );
}