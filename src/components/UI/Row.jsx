export default function Row({ className = "", children }) {
    return (
        <div className={`${className} flex flex-row gap-4 items-center py-2`}>
            {children}
        </div>
    )
}