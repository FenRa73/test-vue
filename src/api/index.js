import axios from 'axios'

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'applicattion/json',
    'X-Auth-Token': ' 38ad5403799949229807d96fedcde01d',
  },
})

export default api