export const searchValuesWithThisValue = (list, thisValue, keyOfTheListValue) => {
    const valuesEqual = [];
    list.map((value) => {
        if(thisValue === value[keyOfTheListValue]) {
            valuesEqual.push(value);
        }
    })
    return valuesEqual
}