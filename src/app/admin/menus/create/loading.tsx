export default function Loading() {
    return (
        <div>
            <h1>Create menu</h1>
            <div>
                <div>
                    <span>Menu title</span>
                    <span className="skeleton w-24 h-5"></span>
                </div>
                <div>
                    <span>Menu Items</span>
                </div>
                <div>
                    <span>Menu item title</span>
                    <span className="skeleton w-24 h-5"></span>
                    <span>Menu item link</span>
                    <span className="skeleton w-24 h-5"></span>
                </div>
                <button type='submit' className="Button mt-8">Submit</button>
            </div>
        </div>
    )
}