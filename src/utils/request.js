import axios from 'axios'
import to from 'await-to-js'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

instance.defaults.timeout = 20000
// instance.interceptors.request.use(
//   (config) => {},
//   (err) => {}
// )

// instance.interceptors.response.use(
//   (config) => {},
//   (err) => {}
// )

export function post(url, data) {
  return to(
    instance.post({
      url,
      data,
      method: 'post'
    })
  )
}

export function get(url, params) {
  return to(
    instance.get({
      url,
      params,
      method: 'get'
    })
  )
}
