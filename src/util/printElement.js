import { open } from "@tauri-apps/api/shell"
import { getSettingByKey } from "./dataStorage"
import { getTimeFormat } from "./util"


export default async function printElement(
    { elementName = "", customersName = "", id = "...", value = "", delivery_description = "" }
) {
    try {
        const url = await getSettingByKey("print-api-setting")
        if (!url)
            throw Error('Url api print not found!!')

        open(`${url}?elementName="${elementName}"&customersName="${customersName}"&id="${id}"&value="${value}"&delivery_description="${delivery_description}"&createdAt="${getTimeFormat()}"`)
    } catch (error) {
        console.log(error.toString())
    }
}