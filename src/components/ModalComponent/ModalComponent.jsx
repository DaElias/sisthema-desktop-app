
export default function ModalComponent({ children, show = false, onClose, titleModal = "Modal Title" }) {
    if (!show) {
        return null
    }

    const handleKeyDown = (event) => {
        const { keyCode } = event
        if (keyCode == 27) {
            onClose()
        }
    }

    return (
        <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-slate-100 p-6 rounded-lg">
                <button className="float-right text-gray-700 hover:text-black" onClick={onClose}>
                    <svg
                        className="w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M18.364 5.636a.999.999 0 0 0-1.414 0L12 10.586 7.05 5.636a.999.999 0 1 0-1.414 1.414L10.586 12 5.636 16.95a.999.999 0 1 0 1.414 1.414L12 13.414l4.95 4.95a.999.999 0 1 0 1.414-1.414L13.414 12l4.95-4.95a.999.999 0 0 0 0-1.414z" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-4">{titleModal}</h2>
                {children}
            </div>
        </div>
    );
}