import Loader from "../Loader/Loader";

type AdminSkeletonType = {
    heading?: string | (() => React.ReactNode)
}

export default function AdminSkeleton({ heading }: AdminSkeletonType) {
    const renderHeading = () => {
        if (!heading) {
            return null;
        }

        if (typeof heading === 'function') {
            return heading();
        }

        return heading;
    }

    return (
        <section className="relative h-full">
            { renderHeading() }
            <div>
                <Loader />
            </div>
        </section>
    )
}
