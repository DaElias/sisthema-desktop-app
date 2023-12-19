export function covertArrayToHas({ key, array }) {
    const hashMapByKey = {};
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let keyValue = element[key]
        hashMapByKey[keyValue] = element;
    }
    return hashMapByKey
}