/* eslint-disable no-undef */

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) return response

  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(error) // eslint-disable-line no-console
  throw error
}

const parseJSON = response => response.json()

const fetchUsers = cb => fetch('api/user', {
  accept: 'application/json',
}).then(checkStatus)
  .then(parseJSON)
  .then(cb)

const fetchMessages = cb => fetch('api/message', {
  accept: 'application/json',
}).then(checkStatus)
  .then(parseJSON)
  .then(cb)

export default {
  fetchUsers,
  fetchMessages,
}
