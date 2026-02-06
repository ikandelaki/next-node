import AdminSkeleton from "@/components/AdminSkeleton";

export default function CategoryPageSkeleton() {
  const renderFormFallback = () => {
    return (
      <main className="grid grid-cols-4 w-full h-full gap-x-4 mt-8">
        <section className="Section">Category list</section>
        <div className="Section col-[2/-1]" />
      </main>
    );
  };

  return <AdminSkeleton heading="Categories" content={renderFormFallback} />;
}
