import AdminSkeleton from "@/components/AdminSkeleton";

export default function ProductsPageLoading() {
  const renderHeadingFallback = () => (
    <div className="Section flex items-center">
      <h1>Products</h1>
      <div className="ml-auto">
        <button type="submit" className="Button">
          Save
        </button>
      </div>
    </div>
  );

  return <AdminSkeleton heading={renderHeadingFallback} />;
}
