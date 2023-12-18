
import { Store } from "tauri-plugin-store-api";
import { v4 as uuid } from "uuid"
const KEY_STORAGE = "local-storage"
const KEY_STORAGE_CUSTOMERS = "customers"
const KEY_STORAGE_CATEGORIES = "categories"

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