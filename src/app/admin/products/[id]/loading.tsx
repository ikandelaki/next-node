import AdminSkeleton from "@/components/AdminSkeleton";

export default function ProductPageLoading() {
    const renderHeadingFallback = () => {
        return (
            <div className="Section flex items-center">
                <h1>Edit product</h1>
                <div className="ml-auto">
                    <button type='submit' className="Button bg-red-500">Save</button>
                </div>
            </div>
        )
    }

    return (
        <AdminSkeleton heading={ renderHeadingFallback } />
    )
}