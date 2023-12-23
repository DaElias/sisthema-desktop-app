import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent/ModalComponent";
import InputText from "./UI/InputText";
import { getAllCategories } from "../util/dataStorage";
import Row from "./UI/Row";

export default function ElementsForm({ show, onClose, isNew = false, handleCreate = (e) => { },
    id = "",
    idCustomer = "",
    name = "",
    description = "",
    description_shipping = "",
    value = "",
    id_category = "",
    state = ""
}) {
    const [listCategory, setlistCategory] = useState([])

    const [element, setElement] = useState({
        name_element: name,
        description_element: description,
        description_shipping_element: description_shipping,
        value_element: value,
        id_category_element: id_category,
        state_element: state,
        idCustomer
    })

    const handleChange = (event) => {
        const { value, name } = event.target

        if (name == "value_element") {
            if (value < 0)
                return
            if (value == "")
                setElement(prev => {
                    return { ...prev, [name]: 0 }
                })
            if (!parseInt(value))
                return
        }
        setElement(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleSendDate = () => {
        handleCreate({
            name: element.name_element,
            description: element.description_element,
            description_shipping: element.description_shipping_element,
            value: element.value_element,
            id_category: element.id_category_element,
            state: element.state_element,
            idCustomer,
            id
        })
        onClose()
    }

    const handlePrintApi = (element) => {
        // ${URL}/?elementName="PC"&customersName="juan"&id="1"&value="12"&delivery_description="loremas"&createdAt="12/12/2012"
    }

    useEffect(() => {
        const getDatalistCategory = async () => {
            const data = await getAllCategories()
            setlistCategory(data)
        }
        getDatalistCategory()
    }, [])

    return (
        <ModalComponent onClose={onClose} show={show} titleModal={isNew ? "Crea nuovo elemento" : "Elemento"} >
            <label htmlFor="name_element" className="w-full block mb-2 text-sm font-medium text-black">Nome
                <InputText
                    onChange={handleChange}
                    value={element.name_element}
                    id="name_element" />
            </label>
            <label htmlFor="description_element" className="w-full block mb-2 text-sm font-medium text-black">Descrizione
                <textarea
                    onChange={handleChange}
                    value={element.description_element}
                    id="description_element" name="description_element" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="scrivi l'indirizzo..."></textarea>
            </label>
            <label htmlFor="description_shipping_element" className="w-full block mb-2 text-sm font-medium text-black">Descrizione Consegna
                <textarea
                    onChange={handleChange}
                    value={element.description_shipping_element}
                    id="description_shipping_element" name="description_shipping_element" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="scrivi l'indirizzo..."></textarea>
            </label>
            <Row className="items-start">
                <label htmlFor="value_element" className="w-1/2 block mb-2 text-sm font-medium text-black">Valore del servizio
                    <InputText
                        onChange={handleChange}
                        value={element.value_element}
                        name="value_element" type="number" id="value_element" placeholder="10 $" />
                </label>
                <div>
                    <label htmlFor="id_category_element" className="w-full block mb-2 text-sm font-medium text-black">Categoria
                    </label>
                    <select id="id_category_element"
                        name="id_category_element"
                        onChange={handleChange}
                        value={element.id_category_element}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected>Scegli una categoria</option>
                        {listCategory.map(category => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
            </Row>
            <div>
                <label htmlFor="state_element" className="w-full block mb-2 text-sm font-medium text-black">Stato
                </label>
                <select
                    id="state_element"
                    name="state_element"
                    onChange={handleChange}
                    value={element.state_element}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected>Scegli una stato</option>
                    <option value="IN_PROCESS">IN CORSO</option>
                    <option value="READY">PRONTO</option>
                    <option value="WAITING">IN ATTESA</option>
                    <option value="HAS_NO_REPAIR">NON HA RIPARAZIONE</option>
                </select>
            </div>

            <button
                onClick={() => { handleSendDate() }}
                type="button" className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
        </ModalComponent>
    )
}