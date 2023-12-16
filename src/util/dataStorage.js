
import { Store } from "tauri-plugin-store-api";
import { v4 as uuid } from "uuid"
const KEY_STORAGE = "local-storage"
const KEY_STORAGE_CUSTOMERS = "customers"

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
    return await getDataStorage(KEY_STORAGE_CUSTOMERS) || []
}
export async function deleteCustomerById(id = -1) {
    try {
        if (id == -1)
            throw Error("Id not found!!")
        const store = new Store(KEY_STORAGE)
        const list = await getCustomers()
        await store.set(KEY_STORAGE_CUSTOMERS, list.filter(customer => customer.id != id))
        await store.save()

    } catch (error) {
        console.log(error.toString())
    }
}

export async function createCustomer({ name = "", last_name = "", contact_1 = "", email_1 = "", address = "" }) {
    try {
        if (name == "" || last_name == "")
            throw Error("feld name and last_name are required!!")
        const store = new Store(KEY_STORAGE)
        const list = await getCustomers()
        list.push({ id: uuid(), name, last_name, contact_1, email_1, address })
        await store.set(KEY_STORAGE_CUSTOMERS, list)
        await store.save()
    } catch (error) {
        console.log(error.toString())
    }

}