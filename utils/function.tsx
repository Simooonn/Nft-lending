import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

// /* Check whether it is a mobile access */
// export function _isMobile() {
//   return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
// }
/**
 *  Hiding string
 *
 *  str         String to be processed
 *  start_len    The first few reserved
 *  end_len      Reserved last few digits
 *  symbol         Replaced string
 *  replace_len      How many characters to replace with the previously defined characters(Not transmitted or <=0, will be replaced with an equal number of characters)
 * */
export function hideStr(str = '', start_len = 1, end_len = 1, symbol = '*', replace_len = -1) {
	let len = replace_len <= 0 ? str.length - start_len - end_len : replace_len
	let replace_symbol = ''
	for (let i = 0; i < len; i++) {
		replace_symbol += symbol
	}
	return str.substring(0, start_len) + replace_symbol + str.substring(str.length - end_len)
}

/* Json String to Object */
export function json_to_obj(_data_: any) {
	if (typeof _data_ === 'object') {
		return _data_
	}
	if (!_data_ || typeof _data_ !== 'string') {
		return {}
	}

	const pattern = '&quot;'
	if (_data_.indexOf(pattern) !== -1) {
		_data_ = _data_.replace(new RegExp(pattern, 'gm'), '"')
	}
	return JSON.parse(_data_)

	/*if(type === 'local'){
    return eval('(' + _data_ + ')');
  }
  else{
    const json_str = _data_.replace(new RegExp('&quot;', "gm"), '"');
    return JSON.parse(json_str);
  }*/
}

/* The list array is sorted according to the fields of the objects in it */
export function arrListSort(arrList: any[], key: string = 'id') {
	const handle = (property: any) => {
		return function (a: any, b: any) {
			const val1 = a[property]
			const val2 = b[property]
			return val1 - val2
		}
	}
	return arrList.sort(handle(key))
}

/* Judge whether it is empty */
export function empty(value: any): boolean {
	return typeof value === 'undefined' || value === null || value === false || value.length === 0
}

export function array_column(array: any[], field: string | null, fid: string = 'id'): any {
	if (field !== null) {
		return array.map((v) => v[field])
	} else {
		let obj: any = {}
		array.map((v) => {
			obj[v[fid]] = v
			return v
		})
		return obj
	}
}

// export function explode(str,separator){
//   return str.split(separator)
// }
// export function implode(array,separator){
//   return array.join(separator)
// }
//
//
// /* The seconds are optimized and displayed as days,hours,minutes */
// export function timeToFriendly(time = 0) {
//   let days = parseInt((time / ( 60 * 60 * 24)).toString());
//   let hours = parseInt(((time % ( 60 * 60 * 24)) / ( 60 * 60)).toString());
//   let minutes = parseInt(((time % (60 * 60)) / ( 60)).toString());
//   return days + " Days, " + hours + " Hours, " + minutes + " Minutes";
// }
//
export function conversionUtcToDate(date: string, type: string = 'local') {
	if (type === 'local') {
		// Pass in local to convert UTC time to local time
		return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
	} else if (type === 'UTC') {
		// Convert the time to UTC when it is passed in to UTC
		return dayjs(date).utc().format()
	}
}

export function conversionTimestampToDate(time: number, type: string = 'local') {
	if (type === 'local') {
		// Pass in local to convert UTC time to local time
		return dayjs.unix(time).local().format('YYYY-MM-DD HH:mm:ss')
	} else if (type === 'UTC') {
		// Convert the time to UTC when it is passed in to UTC
		return dayjs(time).utc().format()
	}
}

//取得[n,m]范围随机数
export function randomNum(n: number, m: number): number {
	let result = Math.random() * (m + 1 - n) + n
	while (result > m) {
		result = Math.random() * (m + 1 - n) + n
	}
	return Math.ceil(result)
}

function md5(value: any) {
	return value
}

const localStorageKey = 'localStorageData'

/* set localStorage */
function setLocal(key: string = '', value: any) {
	let vv: any = {}
	vv[localStorageKey] = typeof value === 'undefined' ? 'undefined' : value
	key = md5(key)
	return localStorage.setItem(key, JSON.stringify(vv))
}

/* delete localStorage */
function deleteLocal(key = '') {
	key = md5(key)
	return localStorage.removeItem(key)
}

function clearLocal() {
	return localStorage.clear()
}

export function clearAccount() {
	return clearLocal()
}

export function receiving_address() {
	return '0xfC00537F19ED9dB980F9aB80c6546c67009111b4'
}

/* get localStorage */
export function getLocal(key = '') {
	//When the incoming key is incorrect, an empty string is returned directly
	if (typeof key !== 'string' || key === '') {
		return ''
	}

	key = md5(key)
	//When the obtained data is null or does not contain the specified string, null is returned directly
	let result = localStorage.getItem(key)
	if (result === null || result.indexOf(localStorageKey) === -1) {
		return null
	}

	//The json string is parsed into an object
	let data = json_to_obj(result)[localStorageKey]
	let undef
	return data === 'undefined' ? undef : data
}

/* set JWTToken  */
export function setJWTToken(value: any) {
	return setLocal('JWTToken', value)
}

/* get JWTToken */
export function getJWTToken() {
	return getLocal('JWTToken')
}

/* getLocalUserInfo */
export function getLocalUserInfo() {
	return getLocal('userInfo')
}

export function copy_text(content: string) {
	content = content === null ? '' : content
	if (typeof navigator.clipboard != 'undefined' && window.isSecureContext) {
		navigator.clipboard.writeText(content)
		if (content === '') {
			return false
		} else {
			return true
		}
	} else {
		const input = document.createElement('input')
		input.setAttribute('readonly', 'readonly')
		input.setAttribute('value', content)
		document.body.appendChild(input)
		input.select()
		let re = document.execCommand('copy')
		document.body.removeChild(input)
		if (re) {
			return true
		} else {
			return false
		}
	}
}

//Regular check email
export function regEmail(email: any = '') {
	// let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	// eslint-disable-next-line no-useless-escape
	const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
	if (reg.test(email)) {
		return { status: true, msg: 'Verification passed.' }
	} else {
		return { status: false, msg: 'Please fill in the correct email format: hello@gmail.com' }
	}
}

//Regular check url
export function regUrl(url: any = '') {
	// const urlReg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
	let urlReg = /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
	if (urlReg.test(url)) {
		return { status: true, msg: 'Url passed.' }
	} else {
		return { status: false, msg: 'Please fill in the correct url format: http://aa.com or https://aa.com' }
	}
}

export function api_url() {
	if (typeof window !== 'undefined') {
		let wUrl
		const port = window.location.port
		if (window.location.origin.indexOf('merchant.metablox.io') != -1) {
			if (port == '80' || port == '443' || port == '') {
				//prod
				wUrl = 'https://api.metablox.io'
			} else {
				//stg
				wUrl = 'https://apistage.metablox.io'
			}
		} else {
			//test
			wUrl = 'http://apitest.metablox.io'
		}
		return wUrl + '/v1/merchant'
	} else {
		return '/v1/merchant'
	}
}

export {}
