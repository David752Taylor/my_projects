const INFO_KEY = 'my_shopping_info'
const HISTORY_KEY = 'hm_history_list'
// const ADDRESS_LIST = 'user_address_list'

export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : ['手机', '平板', '电视']
}

export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}

// export const getAddressList = () => {
//   const result = localStorage.getItem(ADDRESS_LIST)
//   return result ? JSON.parse(result) : []
// }

// export const setAddressList = (arr) => {
//   localStorage.setItem(ADDRESS_LIST, JSON.stringify(arr))
// }
