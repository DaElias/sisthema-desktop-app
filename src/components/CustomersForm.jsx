import { useEffect, useState } from "react";
import { createElementByIdCustomer, deleteElementByIdCustomer, getAllElementById } from "../util/dataStorage";
import { open } from '@tauri-apps/api/shell';
import Row from "./UI/Row";
import InputText from "./UI/InputText";
import ElementsForm from "./ElementsForm";
import ModalComponent from "./ModalComponent/ModalComponent";
import PrintIcon from "./UI/svg/PrintIcon"
import { OPTIONS_STATE_ELEMENT } from "../util/const";

export default function CustomersFormModal(
    { show, onClose, handleAction = () => { },
        id = "", name = "", last_name = "", contact_1 = "", email_1 = "", address = "" }
) {
    const [customers, setCustomers] = useState({ id, name, last_name, contact_1, email_1, address })
    const [listElements, setListElements] = useState([])
    const [showModalElements, setShowModalElements] = useState(false)

    const getDataElements = async () => {
        const data = await getAllElementById(id)
        setListElements(data)
    }
    useEffect(() => {
        if (show) {
            getDataElements()
        }
    }, [show])

    useEffect(() => {
        setCustomers({
            id, name, last_name, contact_1, email_1, address
        })
    }, [id, name, last_name, contact_1, email_1, address])

    const handleChangeCustomers = (event) => {
        const { value, name } = event.target
        setCustomers(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleCreate = async (element) => {
        console.log(element)
        if (element.id == "") {
            await createElementByIdCustomer(element)
        } else {

        }
    }

    const handleDeleteElements = async ({ id, idCustomer }) => {
        await deleteElementByIdCustomer({ id, idCustomer })
        await getDataElements()
    }

    const handlePrint = async (element) => {
        console.log("print: ",element)
    }

    return (
        <ModalComponent show={show} titleModal="👤 Informazioni" onClose={onClose} isBlockEsc={showModalElements}>
            <Row>
                <label htmlFor="name" className="w-1/2 block mb-2 text-sm font-medium text-black">Nome
                    <InputText onChange={handleChangeCustomers} value={customers.name} id="name" />
                </label>
                <label htmlFor="last_name" className="w-1/2 block mb-2 text-sm font-medium text-black">Cognome
                    <InputText onChange={handleChangeCustomers} value={customers.last_name} id="last_name" />
                </label>
            </Row>
            <Row>
                <label htmlFor="contact_1" className="w-1/2 block mb-2 text-sm font-medium text-black">Telefono
                    <InputText onChange={handleChangeCustomers} value={customers.contact_1} id="contact_1" />
                </label>
                <label htmlFor="email_1" className="w-1/2 block mb-2 text-sm font-medium text-black">Email
                    <InputText onChange={handleChangeCustomers} value={customers.email_1} id="email_1" type="email" />
                </label>
            </Row>
            <button
                onClick={() => open(`https://wa.me/+39${customers.contact_1}`)}
                type="button"
                className="w-1/2 transition-all flex gap-2 items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                <img className="h-5 w-5" src="./icon-whtsapp.png" alt="icon-whtsapp" />
                <span>Vai su Whatsapp</span>
            </button>
            <label htmlFor="address_customer" className="block mb-2 text-sm font-medium text-black">Indirizzo
                <textarea value={customers.address} onChange={handleChangeCustomers} name="address" id="address_customer" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="scrivi l'indirizzo..."></textarea>
            </label>
            <div className="p-1 flex items-center justify-between text-white bg-blue-700 dark:text-white rounded-t-md">
                <h3 className="font-semibold">Elementi</h3>
                <Row>
                    <button
                        onClick={() => setShowModalElements(true)}
                        className="p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >Aggiungi elemento</button>
                    {/* <button className="p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >Aggiungi categoria</button> */}
                </Row>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-b-lg max-h-60 bg-blue-600">
                <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                    <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categoria
                            </th>
                            <th scope="col" className="px-6 py-3">
                                stato
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Azione
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listElements.map(element => {
                                return (
                                    <tr key={element.id} className="bg-blue-500 border-b border-blue-400">
                                        <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                            {element.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {element.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {OPTIONS_STATE_ELEMENT[element.state] || "?"}
                                        </td>
                                        <td className="flex gap-2 px-6 py-4">
                                            <button className="font-medium text-white hover:underline">Modificare</button>
                                            <button
                                                onClick={() => handleDeleteElements({ id: element.id, idCustomer: element.idCustomer })}
                                                className="font-medium text-white hover:underline">
                                                Eliminare
                                            </button>
                                            <button
                                                onClick={() => handlePrint(element)}
                                                className="font-medium text-white hover:underline">
                                                <PrintIcon isWhite size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => { handleAction(customers); }}
                type="button" className="w-full my-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
            <ElementsForm
                show={showModalElements}
                onClose={() => setShowModalElements(false)}
                idCustomer={customers.id}
                handleCreate={handleCreate}
            />
        </ModalComponent>
    )
}