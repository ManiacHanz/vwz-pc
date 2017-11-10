import fetch from '../config/fetch'

//发送图片
export const __sendBase64 = (data) => fetch('http://192.168.100.17:8080/lltrvl/site/upload_img',	data,	'POST')
// export const __sendBase64 = (data) => fetch('/upload',	data,	'POST')





