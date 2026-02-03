'use client';

import { ChangeEvent } from "react";
import ChevronIcon from "../ChevronIcon";

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
    defaultValue?: string | number
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

    const renderTextInput = () => {
        if (!value || !onChange) {
            return <input
                className='bg-navbar py-2 px-4 rounded-lg w-full'
                type={ type }
                placeholder={ placeholder }
                id={ id }
                name={ inputName }
                required={ isRequired }
                defaultValue={ defaultValue }
            />
        }

        return <input
            className='bg-navbar py-2 px-4 rounded-lg w-full'
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

    const renderBooleanInput = () => {
        return (
            <>
                <select
                    className="w-full bg-navbar py-2 px-4 rounded-lg"
                    id={ id }
                    name={ inputName }
                    defaultValue={ defaultValue ? 1 : 0 }
                >
                    <option value={ 1 }>Yes</option>
                    <option value={ 0 }>No</option>
                </select>
                <span className="absolute translate-x-[-25px] translate-y-[10px]">
                    <ChevronIcon />
                </span>
            </>
        )
    }

    const renderAsterisk = () => {
        if (!isRequired) {
            return null;
        }

        return <span className="text-red-400 absolute translate-1/2">*</span>
    }

    const renderMap: { [key: string]: () => React.ReactElement } = {
        'text': renderTextInput,
        'bool': renderBooleanInput
    }

    const renderInput = () => {
        const renderer = renderMap[type];

        if (typeof renderer !== 'function') {
            return null;
        }

        return renderer();
    }

    return (
        <div className={ `Field Field_type_${type} grid grid-cols-2 items-center ${className}` } key={ String(defaultValue) }>
            { renderLabel() }
            <div className="ml-auto relative w-full">
                { renderInput() }
                { renderAsterisk() }
            </div>
        </div>
    );
}