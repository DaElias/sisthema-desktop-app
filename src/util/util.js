export function covertArrayToHas({ key, array }) {
    const hashMapByKey = {};
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let keyValue = element[key]
        hashMapByKey[keyValue] = element;
    }
    return hashMapByKey
}
export function getTimeFormat(date = new Date()) {
    const currentDateTime = typeof date == "string" ? new Date(date) : date
    const year = currentDateTime.getFullYear()
    const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDateTime.getDate().toString().padStart(2, '0')
    const hours = currentDateTime.getHours().toString().padStart(2, '0')
    const minutes = currentDateTime.getMinutes().toString().padStart(2, '0')
    const seconds = currentDateTime.getSeconds().toString().padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}