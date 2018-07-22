'use strict'

import axios from 'axios'
import { auth } from '@/helpers/firebaseConfig'

// create api object
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000
})

/**
 * Add token header to requests
 */
api.interceptors.request.use(async function (config) {
  const token = await auth.currentUser.getIdToken()
  config.headers.Authorization = `Bearer ${token}`

  return config
})

/**
 * Get user stats balance
 */
api.getStatsBalance = async function (dateStart, dateEnd) {
  const response = await api.get(`/stats/balance?ds=${dateStart}&de=${dateEnd}`)

  return response.data
}

export default api
