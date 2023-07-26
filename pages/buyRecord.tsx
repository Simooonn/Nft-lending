import React, { useEffect, useState } from 'react'
import { ethers, utils } from 'ethers'
import { useAccount, useNetwork } from 'wagmi'
import Head from 'next/head'
import BigNumber from 'bignumber.js'
import Layout from '~/components/Layout'
import { Dialog, useDialogState } from 'ariakit/dialog'
import { getBuyRecords, getOpenseaNFTInfo, PostSell } from '~/utils/request/api'
import ImgNFT from '~/public/assets/img/NFT.png'
import Image from 'next/image'
import { hideStr } from '~/utils/function'
import { InputText } from '~/components/Form'

export default function BuyContainer() {
	const [dataList, setDataList] = useState<any>([])
	const [isLoading1, setIsLoading1] = useState<boolean>(true)
	const [cartOpen, setCartOpen] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [selectNFT, setSelectNFT] = useState<any>('')
	const [sellPrice, setSellPrice] = useState<any>('')
	const { address, isConnecting, isDisconnected } = useAccount()
	const { chain } = useNetwork()

	const fetchData = async () => {
		getBuyRecords(address, { chain_id: chain?.id ?? 1 }).then(async (res: any) => {
			if (typeof res !== 'string') {
				for (const resKey in res) {
					let item = res[resKey]
					item.liquidationPrice = getLiquidationPrice(item.market_price, item.leverage)
					item.currentPrice = await getNFTInfoCurrentPrice(item.token_id, item.nft_address)
				}
				setDataList(res)
			}
			setIsLoading1(false)
		})
	}

	const openSellAlert = async (item: any) => {
		setIsSuccess(false)
		setCartOpen(true)
		setSelectNFT(item)
	}

	const getNFTInfoCurrentPrice = async (tokenId: any, nftContractAddress: any) => {
		// 获取订单信息
		// const nftContractAddress = '0x2BB7c3a05c878480FE61cfa7C63d38234A64AEE2';
		// const tokenId = '682';
		const order = await getOpenseaNFTInfo({
			assetContractAddress: nftContractAddress,
			tokenId: tokenId,
			side: 'ask' // 1 表示要购买 NFT
		})
		console.log('order', order.status)
		const marketingPrice1: any = ethers.utils.formatEther(order?.currentPrice ?? 0).toString()
		return marketingPrice1

		// const marketingPrice1: any = web3.utils.fromWei(order.currentPrice, 'ether').toString()
	}

	const getLiquidationPrice = (marketingPrice1: any, leverageNum: any) => {
		const BmarketingPrice = new BigNumber(marketingPrice1) //multiply
		const BrPrice = BmarketingPrice.div(leverageNum)
		const Bm_rPrice = BmarketingPrice.plus(-BrPrice)
		const BlPrice = Bm_rPrice.multipliedBy(1.1)
		return BlPrice.toNumber()
	}

	const sendSell = async (loan_id: any) => {
		const form_data = {
			message: '',
			sell_price: sellPrice,
			address: address,
			loan_id: selectNFT.id.toString()
		}
		console.log('aa', form_data)
		await PostSell(form_data)
		setIsSuccess(true)
	}

	const closeCart = () => {
		setIsSuccess(false)
		setCartOpen(false)
		// setSellPrice('22')
		// setMarketingPrice(0)
		// setLiquidationPrice(0)
		// setRequiredPrice(0)
		// setAmount('0')
	}

	const dialog = useDialogState({
		open: cartOpen
		// setOpen: (open) => {
		// 	if (!open) {
		// 		router.push(
		// 			{
		// 				pathname: router.pathname,
		// 				query: { ...queries }
		// 			},
		// 			undefined,
		// 			{ shallow: true }
		// 		)
		// 	}
		// }
	})

	function sellbutton(item: any) {
		switch (item.status) {
			case 'complete':
				return (
					<button
						style={{
							margin: '0 auto',
							padding: '20px 0',
							background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
							borderRadius: '12px'
						}}
						className="cus-button flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
						onClick={() => openSellAlert(item)}
					>
						Sell
					</button>
				)
				break
			case 'pending':
				return (
					<button
						style={{
							margin: '0 auto',
							padding: '20px 0',
							background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
							borderRadius: '12px'
						}}
						className="cus-button flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
						onClick={() => openSellAlert(item)}
						disabled
					>
						Pending
					</button>
				)
				break
			case 'sell request':
				return (
					<button
						style={{
							margin: '0 auto',
							padding: '20px 0',
							background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
							borderRadius: '12px'
						}}
						className="cus-button flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
						onClick={() => openSellAlert(item)}
						disabled
					>
						listing
					</button>
				)
				break
			default:
				// code block
				return (
					<button
						style={{
							margin: '0 auto',
							padding: '20px 0',
							background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
							borderRadius: '12px'
						}}
						className="cus-button flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
						onClick={() => openSellAlert(item)}
						disabled
					>
						{item.status}
					</button>
				)
		}
	}
	useEffect(() => {
		console.log('dataList', dataList)
		fetchData()
	}, [isSuccess])

	return (
		<>
			<Head>
				<title>Buy Record</title>
			</Head>

			<Layout>
				<div
					className="Desktop relative mx-auto mt-8 mb-auto overflow-x-auto rounded-xl sm:my-9"
					style={{ margin: '0 10%', boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)' }}
				>
					<div className="flex min-h-[80px] items-center p-4 pl-10 text-xl font-semibold shadow">
						<div>Buy Record</div>
					</div>
					<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
						<div
							className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 pl-10 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[280px_repeat(3,_150px)_250px]"
							// className="flex flex-row  min-h-[60px]  justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[240px_repeat(3,_120px)]  xl:grid-cols-[360px_repeat(2,_150px)_240px]"
						>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">NFT</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Price</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Leverage</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Liquidation Price</h1>
							</div>
							<div className=" flex flex-col justify-center text-center">
								<h1 className="ml-0.5 min-h-[1.5rem] ">Action</h1>
							</div>
						</div>
					</ul>
					{isLoading1 ? (
						<>
							{new Array(5).fill('x').map((_, index) => (
								<li
									key={'pl' + index}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 pl-10 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[280px_repeat(3,_150px)_250px]"
								>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className=" mx-auto flex w-full flex-col justify-center md:col-span-1 md:mr-0">
										<button
											style={{
												margin: '0 auto',
												padding: '20px 0',
												background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
												borderRadius: '12px'
											}}
											className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
										></button>
									</div>
								</li>
							))}
						</>
					) : (
						<>
							{dataList.map((item: any, key: any) => (
								<li
									key={key}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 pl-10 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[280px_repeat(3,_150px)_250px]"
								>
									<div className={' flex flex-row items-center gap-4'}>
										<Image
											//src={ImgNFT}
											src={`/assets/nft/${item.nft_address}.avif`}
											alt="ImgNFT"
											height={50}
											width={50}
										/>
										<div className={'flex flex-col gap-1'}>
											<div className="text-sm font-semibold">{'#' + item.token_id}</div>
											{/*<div className="text-xs text-[#47494B]">{item.nft_address}</div>*/}
											<div className="text-xs text-[#47494B]">{hideStr(item.nft_address, 6, 6, '...', 1)}</div>
										</div>
									</div>
									<div className="">
										<div className={'flex flex-col gap-1'}>
											<div className={'flex flex-row gap-1'}>
												<div className="text-sm ">Current: </div>
												<div className="text-sm font-semibold">{item.marketingPrice}</div>
												<div className="text-sm "> ETH</div>
											</div>
											<div className={'flex flex-row gap-1'}>
												<div className="text-sm ">Purchase: </div>
												<div className="text-sm font-semibold">{item.market_price}</div>
												<div className="text-sm "> ETH</div>
											</div>
										</div>
									</div>
									<div className="flex flex-row items-center text-sm">
										<div className={''}>{item.leverage}X</div>
									</div>
									<div className={'flex flex-row items-center text-sm'}>
										<div className={'flex flex-row gap-1'}>
											<div className="text-sm font-semibold">{item.liquidationPrice}</div>
											<div className="text-sm "> ETH</div>
										</div>
									</div>

									<div className="whitespace-nowrap">{sellbutton(item)}</div>
								</li>
							))}
						</>
					)}
				</div>

				<div
					className="Mobile relative mt-8 mb-auto overflow-x-auto sm:my-9"
					style={{ boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)' }}
				>
					<div className="flex min-h-[80px] items-center p-4 text-xl font-semibold shadow">
						<div>Buy Record</div>
					</div>
					<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
						<div
							className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[360px_repeat(3,_150px)_240px]"
							// className="flex flex-row  min-h-[60px]  justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[240px_repeat(3,_120px)]  xl:grid-cols-[360px_repeat(2,_150px)_240px]"
						>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">NFT</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Price</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Leverage</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Liquidation Price</h1>
							</div>
							<div className=" flex flex-col justify-center">
								<h1 className="ml-0.5 min-h-[1.5rem] ">Action</h1>
							</div>
						</div>
					</ul>
					{isLoading1 ? (
						<>
							{new Array(5).fill('x').map((_, index) => (
								<li
									key={'pl' + index}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[360px_repeat(3,_150px)_240px]"
								>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
									<div className=" mx-auto flex w-full flex-col justify-center md:col-span-1 md:mr-0">
										<button
											style={{
												margin: '0 auto',
												background: 'linear-gradient(90deg, #9747FF 0%, #29337D 100%)',
												borderRadius: '12px'
											}}
											className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
										></button>
									</div>
								</li>
							))}
						</>
					) : (
						<>
							{dataList.map((item: any, key: any) => (
								<li
									key={key}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[360px_repeat(3,_150px)_240px]"
								>
									<div className={' flex flex-row items-center gap-4'}>
										<Image
											//src={ImgNFT}
											src={`/assets/nft/${item.nft_address}.avif`}
											alt="ImgNFT"
											height={50}
											width={50}
										/>
										<div className={'flex flex-col gap-1'}>
											<div className="text-sm font-semibold">{'#' + item.token_id}</div>
											{/*<div className="text-xs text-[#47494B]">{item.nft_address}</div>*/}
											<div className="text-xs text-[#47494B]">{hideStr(item.nft_address, 6, 6, '...', 1)}</div>
										</div>
									</div>
									<div className="">
										<div className={'flex flex-col gap-1'}>
											<div className={'flex flex-row gap-1'}>
												<div className="text-sm ">Current: </div>
												<div className="text-sm font-semibold">{item.marketingPrice}</div>
												<div className="text-sm "> ETH</div>
											</div>
											<div className={'flex flex-row gap-1'}>
												<div className="text-sm ">Purchase: </div>
												<div className="text-sm font-semibold">{item.market_price}</div>
												<div className="text-sm "> ETH</div>
											</div>
										</div>
									</div>
									<div className="flex flex-row items-center text-sm">
										<div className={''}>{item.leverage}X</div>
									</div>
									<div className={'flex flex-row items-center text-sm'}>
										<div className={'flex flex-row gap-1'}>
											<div className="text-sm font-semibold">{item.liquidationPrice}</div>
											<div className="text-sm "> ETH</div>
										</div>
									</div>

									<div className="col-span-2 whitespace-nowrap">{sellbutton(item)}</div>
								</li>
							))}
						</>
					)}
				</div>
				<Dialog
					state={dialog}
					portal={typeof window !== 'undefined'}
					className="dialog min-h-[300px] w-full max-w-[520px] overflow-auto !border-none bg-[#F2F1F6] !p-0"
				>
					<div className="buttonDismiss cursor_pointer absolute top-2 right-2" onClick={closeCart}>
						<span className="sr-only">Close cart</span>
						<svg
							aria-hidden="true"
							fill="none"
							height="10"
							viewBox="0 0 10 10"
							width="10"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L3.58579 5L0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L5 6.41421L8.29289 9.70711C8.68342 10.0976 9.31658 10.0976 9.70711 9.70711C10.0976 9.31658 10.0976 8.68342 9.70711 8.29289L6.41421 5L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z"
								fill="currentColor"
							></path>
						</svg>
					</div>

					{isSuccess && (
						<>
							<div className="mt-20 justify-center p-8 text-center text-black">
								<p className="text-xl">Thank you for your request!</p>
								<p>
									Transaction was <span className="text-[#00B720]">successful!</span>
								</p>
							</div>
						</>
					)}
					{!isSuccess && (
						<>
							<div className="text-black">
								<div
									className={'flex flex-col gap-4 p-8'}
									style={{ background: '#F2F1F6', borderRadius: '8px 8px 0 0' }}
								>
									<div className={' flex flex-row items-center gap-4 '}>
										<Image style={{ borderRadius: '8px' }} src={ImgNFT} alt="ImgNFT" height={50} width={50} />
										<div className={'flex flex-col gap-1'}>
											<div className="text-xl font-semibold">{selectNFT.nft_name}</div>
											<div className="text-xl text-[#47494B]">
												{hideStr(selectNFT.nft_address, 4, 4, '...', 1) + ' #' + selectNFT.token_id}
											</div>
										</div>
									</div>

									<InputText
										name="SellPrice"
										placeholder="Type your Sell Price."
										label={'Sell Price'}
										required
										// pattern="^0x[a-fA-F0-9]{40}$"
										// title="Type your ID1."
										defaultValue={sellPrice}
										onChange={(e) => setSellPrice(e.target.value)}
									/>
									<button
										style={{
											margin: '20px auto 0',
											background: 'linear-gradient(90deg, #9747FF 0%, #29337D 100%)',
											borderRadius: '12px',
											width: '10px'
										}}
										className="ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
										onClick={sendSell}
									>
										Sell
									</button>
								</div>
							</div>
						</>
					)}
				</Dialog>
			</Layout>
		</>
	)
}
