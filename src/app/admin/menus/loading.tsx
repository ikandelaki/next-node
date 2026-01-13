export default function Loading() {
    return (
        <div>
            <div className="flex items-center">
                <h1>Welcome to menu manager</h1>
                <div className="skeleton w-12 h-5 ml-auto"></div>
            </div>
            <div className="skeleton w-full max-w-7xl h-50 mx-auto mt-4"></div>
        </div>
    )
}