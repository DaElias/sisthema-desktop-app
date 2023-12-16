import ModalComponent from "./ModalComponent";

export default function ModalAlertDelete({ onClose, show, handleAction = () => { } }) {
    return (
        <ModalComponent titleModal="Sei sicuro?" onClose={onClose} show={show} >
            <div className="p-2">
                <button
                    onClick={() => handleAction()}
                    type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Sí
                </button>
                <button
                    onClick={onClose}
                    type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">NO
                </button>
            </div>
        </ModalComponent>
    )
}