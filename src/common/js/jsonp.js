// 封装jsonp

import oldJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    oldJSONP(url, option, (err, data) => {
      if(!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for(let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value) // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  }
  return url ? url.substring(1) : ''
}