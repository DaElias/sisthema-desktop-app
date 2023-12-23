import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import { getAllSettings, setSettings } from "../../util/dataStorage";
import Row from "../UI/Row";
import { OPTIONS_CONFIG_APP } from "../../util/const";

export default function ModalSettings({ show, onClose }) {
    const [ListSettings, setListSettings] = useState([])
    const [setting, setSetting] = useState({})

    const getDataListSettings = async () => {
        const data = await getAllSettings()
        const listData = []
        for (let key in data) {
            listData.push({ id: key, value: data[key] })
        }
        setListSettings(listData)
    }

    const handleChange = (event) => {
        const { value, name } = event.target
        setSetting(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleSave = async () => {
        await setSettings(setting)
        onClose()
    }


    useEffect(() => {
        getDataListSettings()
    }, [show])


    return (
        <ModalComponent onClose={onClose} show={show} titleModal="Impostazioni">
            {ListSettings.map((setting) => {
                return (
                    <Row key={setting?.id}>
                        <label htmlFor={setting?.id} className="block mb-2 text-sm font-medium text-gray-900 ">
                            {OPTIONS_CONFIG_APP[setting?.id]}
                        </label>
                        <input
                            className="text-white bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700" placeholder="..."
                            type="text"
                            id={setting?.id}
                            onChange={handleChange}
                            name={setting?.id}
                            value={setting[setting?.id]}
                            defaultValue={setting?.value}
                        />
                    </Row>
                )
            })}
            <button
                onClick={handleSave}
                type="button" className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Salvar
            </button>
        </ModalComponent>
    )
}