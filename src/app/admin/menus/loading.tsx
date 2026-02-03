import AdminSkeleton from "@/components/AdminSkeleton"

export default function Loading() {
    const renderHeadingFallback = () => (
        <div className="flex items-center Section">
            <h1>Welcome to menu manager</h1>
            <button className="Button ml-auto">Create</button>
        </div>
    )

    return <AdminSkeleton heading={ renderHeadingFallback } />
}