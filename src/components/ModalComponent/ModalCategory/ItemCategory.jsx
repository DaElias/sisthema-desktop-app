import { useState } from "react"

export default function ItemCategory({ setIsCreateCategory = false, isNew = false, id = -1, name = "", handleEdit = (e) => { }, handleDelete = (e) => { }, handleCreate = (e) => { } }) {
    const [category, setCategory] = useState({ id, name })
    const [isEdit, setIsEdit] = useState(isNew)

    const handleChange = (event) => {
        const { value } = event.target
        setCategory(prev => {
            return { ...prev, name: value }
        })
    }

    const handleCancel = () => {
        setIsEdit(false)
        setCategory({ id, name })
        if (isNew)
            setIsCreateCategory(false)
    }

    const handleAction = () => {
        if (isNew) {
            handleCreate(category)
            setIsCreateCategory(false)
        } else {
            handleEdit(category)
            setIsEdit(false)
        }
    }

    const handleKeyDown = (event) => {
        const { keyCode } = event
        if (keyCode == 13) {
            handleAction()
        }
        if (keyCode == 27) {
            handleCancel()
        }
    }

    return (
        <tr
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {!isEdit ?
                    category.name
                    :
                    <input className="text-black" type="text" value={category.name} onChange={handleChange} />
                }
            </td>
            <td className="flex gap-2 px-6 py-4">
                {
                    !isEdit ?
                        <button
                            onClick={() => setIsEdit(true)}
                            className="font-medium text-green-600 dark:text-green-500 hover:underline">
                            {isNew ?
                                "✚ Creare"
                                :
                                "📝 Modificare"
                            }
                        </button>
                        :
                        <button
                            onClick={handleCancel}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline">❌ Annulla</button>
                }
                {!isEdit ?
                    <button
                        onClick={() => handleDelete(id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        🗑️ Rimuovere
                    </button>
                    :
                    <button
                        onClick={handleAction}
                        className="font-medium text-green-600 dark:text-green-500 hover:underline">
                        💾 Salva
                    </button>
                }
            </td>
        </tr>
    )
}