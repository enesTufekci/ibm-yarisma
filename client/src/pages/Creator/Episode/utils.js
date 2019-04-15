import { isEmpty, update } from 'ramda'

export function appendOrUpdate(index, newData, data) {
  let updatedData = data
  if (isEmpty(data)) {
    return [newData]
  }
  if (!index) {
    updatedData[data.length] = newData
    console.log(updatedData)
    return updatedData
  }
  return update(index, newData, data)
}
