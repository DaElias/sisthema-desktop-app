import { useCallback, useEffect, useState } from "react"
import { getCustomers } from "../../util/dataStorage"
import CustomersFormModal from "../CustomersForm"
import { open } from "@tauri-apps/api/shell"
import Tooltip from "../UI/Tooltip"



export default function ListCustomers() {
    const [constumers, setConstumers] = useState([])
    const [currentConstumers, setCurrentConstumers] = useState({ id: "", name: "", last_name: "", contact_1: "", email_1: "", address: "" })
    const [inputSearchText, setInputSearchText] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleChange = (event) => {
        const { value } = event.target
        setInputSearchText(value)
    }

    const getDataCustomers = async () => {
        const data = await getCustomers()
        setConstumers(data)
    }

    const filterSearchCustomers = async () => {
        const newConstumers = await getCustomers()
        setConstumers(newConstumers.filter(elemento =>
            elemento.name.toLowerCase().startsWith(inputSearchText.toLowerCase())
        ))
    }
    useEffect(() => {
        getDataCustomers()
    }, [])
    useEffect(() => {
        filterSearchCustomers()
    }, [inputSearchText])
    const handleEditCustomers = (newCustomers) => {
        setCurrentConstumers({
            address: newCustomers.address,
            contact_1: newCustomers.contact_1,
            email_1: newCustomers.email_1,
            id: newCustomers.id,
            last_name: newCustomers.last_name,
            name: newCustomers.name
        })
        setShowModal(true)
    }
    const renderTable = useCallback((constumer) => {
        return (
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={constumer.id}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {constumer.name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {constumer.last_name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {constumer.address}
                </td>
                <td
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Tooltip text={"Vai su Whatsapp"}>
                        <span
                            onClick={() => open(`https://wa.me/+39${constumer.contact_1}`)}
                            className="cursor-pointer border-white hover:border-blue-500 border-b-2 ">{constumer.contact_1}</span>
                    </Tooltip>
                </td>
                <td className="px-6 py-4 text-right">
                    <button
                        onClick={() => handleEditCustomers(constumer)}
                        href="#" className="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">📝 Modificare</button>
                    <button href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">🗑️ Eliminare</button>
                </td>
            </tr>
        )
    }, [constumers])
    return (
        <div className="flex flex-col m-2 gap-2">
            <div className="flex justify-between">
                <div className="w-1/2 relative">
                    <input
                        onChange={handleChange}
                        value={inputSearchText}
                        type="text"
                        placeholder="Cerca per nome del cliente..."
                        className="w-full p-2 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:text-white"
                    />
                    {inputSearchText.length !== 0 &&
                        (
                            <span
                                onClick={() => setInputSearchText("")}
                                className="cursor-pointer dark:text-white absolute right-4 top-2 font-extrabold text-xl"
                            >🅧</span>
                        )
                    }
                </div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span>
                        ✚ Creare Cliente
                    </span>
                </button>
            </div>
            <div className="relative overflow-x-auto rounded-xl">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cognome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Indirizzo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefono
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    {constumers.length == 0 ?
                        <div className="flex justify-center w-screen ">
                            <span className="mt-10 text-lg font-extrabold text-white">Nessun consumatore trovato</span>
                        </div>
                        :
                        <tbody>
                            {constumers.map((item) => {
                                return renderTable(item)
                            })}
                        </tbody>
                    }
                </table>
            </div>
            <CustomersFormModal {...currentConstumers} show={showModal} onClose={() => { setShowModal(false) }} />
        </div>
    )
}