import AdminSkeleton from "@/components/AdminSkeleton";

export default function CreateProductPageLoading() {
    const renderHeadingFallback = () => (
        <div className="flex items-center Section">
            <h1>Create a product</h1>
            <button className="Button ml-auto bg-red-500">save</button>
        </div>
    )

    return <AdminSkeleton heading={ renderHeadingFallback } />
}