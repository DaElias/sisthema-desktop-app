
import { Store } from "tauri-plugin-store-api";
import { v4 as uuid } from "uuid"
import { covertArrayToHas } from "./util";
const KEY_STORAGE = "local-storage"
const KEY_STORAGE_CUSTOMERS = "customers"
const KEY_STORAGE_CATEGORIES = "categories"
const KEY_STORAGE_ELEMENTS = "elements"
const KEY_STORAGE_SETTINGS = "settings"

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

export async function editCustomerById(customerEdit = {}) {
    try {
        if (!customerEdit.id)
            throw Error('id not found!!')

        const store = new Store(KEY_STORAGE)
        const list = await getCustomers()
        await store.set(KEY_STORAGE_CUSTOMERS, list.map(
            (customer) => {
                if (customer.id == customerEdit.id) {
                    return {
                        ...customerEdit
                    }
                }
                return customer
            }
        ))
        await store.save()

    } catch (error) {
        console.log(error.toString())
    }
}


export async function getAllCategories() {
    return await getDataStorage(KEY_STORAGE_CATEGORIES) || []
}
export async function getAllCategoriesHash() {
    const list = await getDataStorage(KEY_STORAGE_CATEGORIES) || []
    return covertArrayToHas({ key: "id", array: list })
}

export async function createCategory(category = { name: "" }) {
    try {
        if (category.name == "")
            throw Error("Name is empty!!")
        const list = await getAllCategories()
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == category.name)
                throw Error(`the name_category: ${category.name} is already used!!`)
        }
        list.push({ name: category.name, id: uuid() })
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_CATEGORIES, list)
        await store.save()
    } catch (error) {
        console.log(error.toString())
    }
}

export async function deleteCategoryById(id = -1) {
    try {
        if (id == -1)
            throw Error("id not found!!")
        const list = await getAllCategories()
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_CATEGORIES, list.filter((category) => {
            if (category.id != id) return category
        }))
        await store.save()
    } catch (error) {
        console.log(error.toString())
    }
}


export async function editCategoryById(newCategory) {
    try {
        if (newCategory.id == -1)
            throw Error("id not found!!")
        const list = await getAllCategories()
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_CATEGORIES, list.map((category) => {
            if (category.id == newCategory.id) return newCategory
            return category
        }))
        await store.save()
    } catch (error) {
        console.log(error.toString())
    }
}

export async function getAllElement() {
    return await getDataStorage(KEY_STORAGE_ELEMENTS) || {}
}

export async function getAllElementById(id = -1) {
    try {
        if (id == -1)
            throw Error("id not found!!")
        const hashCategory = await getAllCategoriesHash()
        const object = await getAllElement()
        const list = object[id] || []
        return list.map(element => {
            const nameCategory = hashCategory[element.id_category]
            return { ...element, category: nameCategory?.name }
        })
    } catch (error) {
        console.log(error.toString())
    }
}

export async function createElementByIdCustomer(
    element = { idCustomer: "", name: "", description: "", description_shiping: "", value: 0, id_category: "", state: "" }
) {
    try {
        if (element.idCustomer == "")
            throw Error("id customer is not found!!")

        const newElement = { ...element, id: uuid() }
        const hashElement = await getAllElement()
        // if (!hashElement[element.idCustomer]) {
        // hashElement[element.idCustomer] = [element]
        // } else {
        const list = hashElement[element.idCustomer] || []
        list.push(newElement)
        hashElement[element.idCustomer] = list
        // }
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_ELEMENTS, hashElement)
        await store.save()
        return newElement
    } catch (error) {
        console.log(error.toString())
    }
}

export async function updateElement(
    element = { id: "", idCustomer: "", name: "", description: "", description_shiping: "", value: 0, id_category: "", state: "" }
) {
    try {
        if (element.id == "")
            throw Error("id element is not found!!")

        const hashElement = await getAllElement()
        const list = hashElement[element.idCustomer] || []
        hashElement[element.idCustomer] = list.map(item => {
            if (item.id == element.id) {
                return element
            }
            return item
        })
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_ELEMENTS, hashElement)
        await store.save()

    } catch (error) {
        console.log(error.toString())
    }
}

export async function deleteElementByIdCustomer(payload = { id: "", idCustomer: "" }) {
    try {
        if (payload.idCustomer == "")
            throw Error("idCustomer is not found!!")
        if (payload.id == "")
            throw Error("id element is not found!!")

        const hashElement = await getAllElement()
        const list = hashElement[payload.idCustomer] || []
        hashElement[payload.idCustomer] = list.filter(element => {
            if (element.id != payload.id) return element
        })
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_ELEMENTS, hashElement)
        await store.save()

    } catch (error) {
        console.log(error.toString())
    }
}


export async function getAllSettings() {
    return await getDataStorage(KEY_STORAGE_SETTINGS) || {}
}

export async function setSettingByKey({ key, value }) {
    try {
        if (!key)
            throw Error("key is not found!!")
        if (!value)
            throw Error("value is not found!!")

        const settings = await getAllSettings()
        settings[key] = value
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_SETTINGS, settings)
        await store.save()
    } catch (error) {
        console.log(error.toString())
    }
}

export async function setSettings(objectSettings = {}) {
    try {
        const store = new Store(KEY_STORAGE)
        await store.set(KEY_STORAGE_SETTINGS, objectSettings)
        await store.save()
    } catch (error) {
        console.log(error.toString())
    }
}


export async function getSettingByKey(key) {
    const settings = await getAllSettings()
    return settings[key]
}
