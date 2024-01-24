//converts objects in an array of their values
// or returns a deep copy of the array passed in
function arrayed(collection){
    if (Array.isArray(collection))
        return [...collection]
    else if(typeof collection === 'object')
        return Object.values(collection)
    else
        throw new Error('Invalid collection type')
}

function myEach(collection, callback){
    for(let e of arrayed(collection))
        callback(e)
  
    return collection
}

function myMap(collection, callback){
    let newArray = arrayed(collection)
    for(let e = 0; e < newArray.length; e++)
        newArray[e] = callback(newArray[e])

    return newArray
}

function myReduce(collection, callback, acc = undefined){
    let newArray = arrayed(collection)
    
    if(acc === undefined){
        if(newArray.length === 0)
            throw new Error('Empty collection')
        acc = newArray[0];
        newArray = newArray.slice(1);
    }
    for (let i = 0; i < newArray.length; i++)
        acc = callback(acc, newArray[i], collection)

    return acc
}

function myFind(collection, predicate){
    for(let e of collection)
        if(predicate(e))
            return e
    return undefined
}

function myFilter(collection, predicate){
    let filteredValues = []

    for(let e of arrayed(collection)){
        if(predicate(e) === true)
            filteredValues.push(e)
    }
    return filteredValues
}

function mySize(collection){
    let newArray = arrayed(collection)
    let counter = 0
    while(newArray[counter] != undefined)
        ++counter
    return counter
}

function myFirst(array, n = 1){
    if(n <= 1)
        return array[0]
    return array.slice(0, n)
}

function myLast(array, n = 1){
    if(n <= 1)
        return array[array.length-1]
    return array.slice(-n)
}

function myKeys(object){
    let keys = []
    for(let i in object){
        keys.push(i)
    }
    return keys
}

function myValues(object){
    let values = []
    for(let i in object){
        values.push(object[i])
    }
    return values
}

function mySortBy(array, callback){
    return array.slice().sort(function(a, b){
        const valueA = callback(a)
        const valueB = callback(b)

        if(typeof valueA === 'number' && typeof valueB === 'number')
            return valueA - valueB;
        else
            return String(valueA).localeCompare(String(valueB))
    })
}

function myFlatten(array, shallow = false, newArr=[]){
    for(let i of array){
        if(typeof i === 'object' && shallow != 'stop'){
            if(!shallow)
                myFlatten(i, shallow, newArr)
            else if(shallow)
                myFlatten(i, 'stop', newArr)
        }else
            newArr.push(i)
    }
    return newArr
}