/**
 * The Formatter Function 
 * @param {*string[]} array The Array string 
 * @returns 
 */
const formatDatas = (array) => {
    let data = "{";
    array.forEach((element, index) => {
        let value = "";
        if (index === array.length - 1) {
            value = element;
        }
        else {
            value = element + ",";
        }
        data += value;
    });
    data += "}";
    return data;
}

module.exports = formatDatas;