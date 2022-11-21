import Vue from 'vue'
import axios from 'axios'

/**
 * This plugin creates an instance of axios pre-configured to talk the
 * back-end REST API.
 */

function http (accesstoken, timeout=2000) {
  const request = {
    baseURL: process.env.VUE_APP_API_HOST,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  if (accesstoken) {
    request.headers['Authorization'] = `Bearer ${accesstoken}`
  }

  const http = axios.create(request)
  return http
}

export default {
  install() {
    Vue.prototype.$http = http
  }
}
