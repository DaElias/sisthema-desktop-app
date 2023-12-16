
import { Store } from "tauri-plugin-store-api";

const KEY_STORAGE = "local-storage"

export async function getDataStorage(key = null) {
    if (!key)
        return undefined
    const store = new Store(KEY_STORAGE)
    const data = await store.get(key)
    return data
}


export async function setDataStorage(key = null, value = null) {
    try {
        if (!key || !value)
            throw Error("Key or value not found!!")

        const store = new Store(KEY_STORAGE)
        await store.set(key, value)
        await store.save()

    } catch (error) {
        console.log(error.toString())
    }
}


export async function getCustomers() {
    return await getDataStorage("customers")
}
