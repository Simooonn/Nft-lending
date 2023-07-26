import { get, post, looksRareGet } from './http'
import { CHAINS_CONFIGURATION } from '~/lib/constants'
const apiGet = (url: string, p: any) =>
	get(url, p)
		.then((res: any) => {
			return res
		})
		.catch((ee: any) => {
			return ee
		})
const apiPost = (url: string, p: any, config: any = {}) =>
	post(url, p, config)
		.then((res: any) => {
			return res
		})
		.catch((ee: any) => {
			return ee
		})

const looksRareApiGet = (url: string, p: string) =>
	looksRareGet(url + p)
		.then((res: any) => {
			return res
		})
		.catch((ee: any) => {
			return ee
		})

export const storeApply = (p: any) => apiPost('/store/apply', p)
export const getBuyNFTs = (p?: any) => apiGet('http://35.89.86.149:8080/nfts', p)
export const getBuyRecords = (address: any, p?: any) => apiGet('http://35.89.86.149:8080/loans/' + address, p)
export const getOpenseaNFTInfo = (p?: any) => apiPost('http://35.89.86.149:8080/opensea', p)
export const getLooksRareNFTInfo = (p: any) =>
	apiGet(
		CHAINS_CONFIGURATION[1]['looksrare_api_url'] +
			'/orders?status=VALID&quoteType=1&collection=' +
			p.nft_address +
			'&itemId=' +
			p.token_id,
		{}
	)
export const getNonce = (p?: any) => apiGet('http://35.89.86.149:8080/', p)
export const login = (p?: any) => apiPost('http://35.89.86.149:8080/login', p)
export const PostBuy = (p?: any) => apiPost('http://35.89.86.149:8080/buy', p)
export const PostSell = (p?: any) => apiPost('http://35.89.86.149:8080/repay', p)

export const uploadFile = (p: any) => apiPost('/file/upload', p, { content_type: 'multipart/form-data' })
