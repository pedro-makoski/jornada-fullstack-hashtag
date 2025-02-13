export const searchValuesWithThisValue = (list, thisValue, keyOfTheListValue) => {
    const valuesEqual = list.filter((value) => thisValue === value[keyOfTheListValue]);
    return valuesEqual
}

export const getRandomValueOnIntervalInt = (min, max, cantBeList) => {
    const randomValue = Math.random()
    const randomValueMinMax = Math.floor((randomValue*(max-min))+min)

    if(cantBeList.contains(randomValueMinMax)) {
        return getRandomValueOnIntervalInt(min, max, cantBeList)
    }

    return randomValueMinMax
}
