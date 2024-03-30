export const updateObjectInArrayById = (items, itemId, objPropertyName, newObjProperty) => 
  items.map((item) => {
    return item[objPropertyName] === itemId ? {...item, ...newObjProperty} : item
  })