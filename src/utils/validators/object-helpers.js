export const updateObjectInArray = (items, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === items) {
            return { ...u, ...newObjProps }
        }
        return u;
    })
}