import {
	baseUrl,
	loginUrl,
} from './env'
import qs from 'querystring'


export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			// credentials: 'include',  //带不带cookies
			method: type,
			headers: {
				// 'Accept': 'application/json',
				// 'Content-Type': 'application/json'
				'Content-Type': 'application/x-www-form-urlencoded'

			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: qs.stringify(data),
				enumerable: true
				// value: JSON.stringify(data)
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);

			const responseJson = await response.json();
			// console.log('fetch:',responseJson)
			if (responseJson.statusCode==202) {
				alert('登录信息失效，点击返回登录页面重新登录')
				window.location = loginUrl
				return false
			}
			return responseJson
		} catch (error) {
			alert('网络请求错误，请检查网络或稍后再试')
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}