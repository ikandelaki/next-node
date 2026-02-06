import Loader from "../Loader/Loader";

type AdminSkeletonType = {
  heading?: string | (() => React.ReactNode);
  content?: string | (() => React.ReactNode);
};

export default function AdminSkeleton({ heading, content }: AdminSkeletonType) {
  const renderHeading = () => {
    if (!heading) {
      return null;
    }

    if (typeof heading === "function") {
      return heading();
    }

    return <h1 className="Section">{heading}</h1>;
  };

  const renderContent = () => {
    if (!content) {
      return null;
    }

    if (typeof content === "function") {
      return content();
    }

    return <h1 className="Section">{content}</h1>;
  };

  return (
    <section className="relative h-full">
      {renderHeading()}
      {renderContent()}
      <div>
        <Loader />
      </div>
    </section>
  );
}
