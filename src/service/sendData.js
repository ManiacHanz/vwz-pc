import fetch from '../config/fetch'

//发送图片
// export const __sendBase64 = (data) => fetch('/site/upload_img',	data,	'POST')
export const __sendBase64 = (data) => fetch('/upload',	data,	'POST')





