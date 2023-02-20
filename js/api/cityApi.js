import axiosClient from './axiosClient'

const cityAPI = {
  getAll(params) {
    const url = '/cities'
    return axiosClient.get(url, { params })
  },

  getById(id) {
    const url = `/cities/${id}`
    return axiosClient.get(url)
  },

  add(data) {
    const url = `/cities`
    return axiosClient.post(url, data)
  },

  update(data) {
    const url = `/cities/${data.id}`
    return axiosClient.patch(url, data)
  },

  remove(id) {
    const url = `/cities/${id}`
    return axiosClient.patch(url)
  },
}

export default cityAPI
