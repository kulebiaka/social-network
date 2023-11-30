export const updateObjectInArrayById = (items, itemId, objPropName, newObjProp) => 
  items.map((item) => {
    return item[objPropName] === itemId ? {...item, ...newObjProp} : item
  })