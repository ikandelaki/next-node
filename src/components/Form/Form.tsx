type FormType = {
  action: (formData: FormData) => void;
  className?: string;
  children: React.ReactNode;
  id?: string;
  shouldRenderSubmitButton?: boolean;
};

export default function Form({
  action,
  className,
  children,
  id,
  shouldRenderSubmitButton,
}: FormType) {
  const renderSubmitButton = () => {
    if (!shouldRenderSubmitButton) {
      return null;
    }

    return (
      <button type="submit" className="Button mt-8">
        Submit
      </button>
    );
  };

  return (
    <form action={action} className={`Section mt-4 w-max ${className}`} id={id}>
      {children}
      {renderSubmitButton()}
    </form>
  );
}
