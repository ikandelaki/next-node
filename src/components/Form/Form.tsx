type FormType = {
    action: (formData: FormData) => void;
    className?: string;
    children: React.ReactNode
}

export default function Form({ action, className, children }: FormType) {
    return (
        <form action={ action } className={ `Section mt-4 w-max ${className}` }>
            { children }
            <button type='submit' className="Button mt-8">Submit</button>
        </form>
    )
}