import { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent";
import { createCategory, deleteCategoryById, editCategoryById, getAllCategories } from "../../../util/dataStorage";
import ItemCategory from "./ItemCategory";


export default function ModalCategory({ show, onClose }) {
    const [listCategory, setListCategory] = useState([])
    const [isCreateCategory, setIsCreateCategory] = useState(false)

    const getData = async () => {
        const data = await getAllCategories()
        setListCategory(data)
    }
    
    useEffect(() => {
        getData()
    }, [])

    const handleEdit = async (category) => {
        await editCategoryById(category)
        await getData()
    }

    const handleDelete = async (id) => {
        await deleteCategoryById(id)
        await getData()
    }

    const handleCreate = async (category) => {
        await createCategory(category)
        await getData()
    }

    return (
        <ModalComponent show={show} titleModal="Categoria" onClose={onClose} isBlockEsc>
            <button
                onClick={() => setIsCreateCategory(true)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Creare Categori</button>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Azione
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(listCategory.length == 0 || isCreateCategory) && (
                            <ItemCategory isNew
                                setIsCreateCategory={setIsCreateCategory}
                                handleCreate={handleCreate}
                            />
                        )}
                        {listCategory.map(category => {
                            return (
                                <ItemCategory
                                    key={category.id}
                                    id={category.id}
                                    name={category.name}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </ModalComponent >
    )
}