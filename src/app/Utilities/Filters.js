/**
 * filterArrayByValue(): Filters the entire array based on search query.
 * @param {*} dataArray - Array of objects for filtering
 * @param {*} queryString - Search queryString
 * @returns Filtered array
 * @author Vivek PS
 */
export function filterArrayByValue(dataArray, queryString) {
    return dataArray.filter((data) => JSON.stringify(data).toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
}

/**
 * filterArrayByKeyAndValue(): Filtered the array if search query is found in provided keyArray
 * @param {*} dataArray - Array of objects for filtering
 * @param {*} keyArray - String array specifying which key's corresponding values to look for search query match
 * Eg: const keyArray = ['name', 'location_address', 'location_zip', 'orderclient', 'status'];
 * @param {*} queryString 
 * @returns  Filtered array
 * @author Vivek PS
 */
export function filterArrayByKeyAndValue(dataArray, keyArray, queryString) {
    return dataArray.filter(object =>
        keyArray.some(key =>
            String(object[key]).toLowerCase().includes(queryString.toLowerCase())
        )
    );
}