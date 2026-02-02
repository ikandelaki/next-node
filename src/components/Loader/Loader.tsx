export default function Loader() {
    return (
        <div className="w-full h-full absolute flex items-center justify-center z-9 bg-navbar/60">
            <div className="flex gap-1">
                <span className="w-4 h-4 bg-white border border-black rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                <span className="w-4 h-4 bg-white border border-black rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                <span className="w-4 h-4 bg-white border border-black rounded-full animate-bounce"></span>
            </div>
        </div>
    )
}