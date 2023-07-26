import React, { useEffect, useState } from 'react'
import { ethers, utils } from 'ethers'
import { useDebounce } from 'use-debounce'
import { usePrepareSendTransaction, useAccount, useSendTransaction, useWaitForTransaction, useNetwork } from 'wagmi'
import Head from 'next/head'
import BigNumber from 'bignumber.js'
import Layout from '~/components/Layout'
import { Dialog, useDialogState } from 'ariakit/dialog'
import { BuySlider } from '~/components/Form/BuySlider'
import { getBuyNFTs, getLooksRareNFTInfo, PostBuy } from '~/utils/request/api'
import ImgCopy from '~/public/assets/img/copy.png'
import ImgNFTIcon from '~/public/assets/img/nft_icon.png'
import ImgDay from '~/public/assets/img/day.png'
import Image from 'next/image'
import { getJWTToken, hideStr, receiving_address } from '~/utils/function'
import { InputText } from '~/components/Form'
import toast from 'react-hot-toast'
import { CHAINS_CONFIGURATION } from '~/lib/constants'

export default function BuyContainer() {
	const [isLoading1, setIsLoading1] = useState<boolean>(true)
	const [cartOpen, setCartOpen] = useState<boolean>(false)
	const [dataList, setDataList] = useState<[]>([])
	let poolsInterestRange = [2, 5]
	const [LeverageNum, setLeverageNum] = useState<any>(2)
	const [liquidationPrice, setLiquidationPrice] = useState<any>(0)
	const [requiredPrice, setRequiredPrice] = useState<any>(0)
	const [marketingPrice, setMarketingPrice] = useState<any>(0)
	const [tokenID, setTokenID] = useState<any>('')
	const [selectNFT, setSelectNFT] = useState<any>('')

	const [to, setTo] = useState(receiving_address())
	const [debouncedTo] = useDebounce(to, 500)
	const [amount, setAmount] = useState('0')
	const [debouncedValue] = useDebounce(amount, 500)
	const { address, isConnecting, isDisconnected } = useAccount()
	const { chain } = useNetwork()

	// usePrepareSendTransaction会尝试解析目标地址是否有效和交易可能花费的gas
	const { config, error } = usePrepareSendTransaction({
		request: {
			to: debouncedTo,
			value: debouncedValue ? utils.parseEther(debouncedValue.toString()) : undefined
		}
	})

	const { data: Txdata1, isSuccess: SendisSuccess, sendTransaction } = useSendTransaction(config)

	//data: Txdata2, isError: TxisError, isLoading: TxisLoading,
	const { isSuccess: TxisSuccess } = useWaitForTransaction({ hash: Txdata1?.hash })

	const onInterestRateChange = (value: Array<number>) => {
		setLeverageNum(value[0])
	}

	const fetchData = () => {
		getBuyNFTs({ chain_id: chain?.id ?? 1 }).then((res: any) => {
			setDataList(typeof res === 'string' ? [] : res)
			setIsLoading1(false)
		})
	}

	const openBuyAlert = async (buy: any) => {
		setCartOpen(true)
		setSelectNFT(buy)

		// setNFTOrder(null)
		setTokenID('')
		setMarketingPrice(0)
		setLiquidationPrice(0)
		setRequiredPrice(0)
		setAmount('0')
	}
	const closeCart = () => {
		setCartOpen(false)
		setTokenID('22')
		setMarketingPrice(0)
		setLiquidationPrice(0)
		setRequiredPrice(0)
		setAmount('0')
	}

	const changeTokenID = async () => {
		const BmarketingPrice = new BigNumber(marketingPrice) //multiply
		const BrPrice = BmarketingPrice.div(LeverageNum)
		setRequiredPrice(BrPrice.toNumber())
		const Bm_rPrice = BmarketingPrice.plus(-BrPrice)
		const BlPrice = Bm_rPrice.multipliedBy(1.1)
		setLiquidationPrice(BlPrice.toNumber())

		// 获取订单信息
		const order = await getLooksRareNFTInfo({
			chain_id: chain?.id ?? 1,
			nft_address: selectNFT.nft_address,
			token_id: tokenID
		})
		console.log(order)
		// setNFTOrder(order)
		if (order.data.length != 1) {
			setMarketingPrice(0)
			setRequiredPrice(0)
			// setAmount('0.0005')
			setAmount('0')
			setLiquidationPrice(0)
		} else {
			const marketingPrice1: any = ethers.utils.formatEther(order.data[0].price).toString()
			setMarketingPrice(marketingPrice1)
			const BmarketingPrice = new BigNumber(marketingPrice1) //multiply
			const BrPrice = BmarketingPrice.div(LeverageNum)
			setRequiredPrice(BrPrice.toNumber())
			// setAmount('0.0005')
			setAmount(BrPrice.toNumber().toString())
			const Bm_rPrice = BmarketingPrice.plus(-BrPrice)
			const BlPrice = Bm_rPrice.multipliedBy(1.1)
			setLiquidationPrice(BlPrice.toNumber())
		}
	}

	const BuyNFT = async () => {
		if (!getJWTToken()) {
			toast.error('Please verify your account first!')
			setCartOpen(false)
			return false
		}
		sendTransaction?.()
	}

	const sendBuy = async () => {
		const form_data = {
			tx: {
				hash: Txdata1?.hash,
				sign: '',
				amount: ethers.utils.parseEther(amount).toString(),
				from: address,
				nonce: '',
				chain_id: '1'
			},
			loan: {
				nft_address: selectNFT.nft_address,
				token_id: tokenID,
				leverage: LeverageNum.toString(),
				market_price: marketingPrice,
				interest: selectNFT.interest,
				hash: Txdata1?.hash,
				from: address
			}
		}
		await PostBuy(form_data)
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

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {}, [TxisSuccess])

	useEffect(() => {
		if (SendisSuccess) {
			sendBuy()
		}
	}, [SendisSuccess])

	return (
		<>
			<Head>
				<title>Buy Collections</title>
			</Head>

			<Layout>
				<div
					className="Desktop relative mx-auto mt-8 mb-auto overflow-x-auto rounded-xl sm:my-9"
					style={{ margin: '0 10%', boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)' }}
				>
					<div className="flex min-h-[80px] items-center p-4 pl-10 text-xl font-semibold shadow">
						<div>Buy Collections</div>
					</div>
					<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
						<li className="grid min-h-[80px] grid-cols-2 justify-between gap-4 p-4 pl-10 font-semibold shadow md:grid-cols-[280px_repeat(4,_120px)] xl:grid-cols-[250px_repeat(3,_160px)_250px]">
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Nft Collections</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Smart Contract</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">NFTs in Collection </h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Interest</h1>
							</div>
							<div className=" flex flex-col justify-center text-center">
								<h1 className="ml-0.5 min-h-[1.5rem] ">Action</h1>
							</div>
						</li>
					</ul>

					{isLoading1 ? (
						<ul>
							{new Array(5).fill('x').map((_, index) => (
								<li
									key={'pl' + index}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[80px] grid-cols-2 justify-between gap-4 p-4 pl-10 shadow md:grid-cols-[280px_repeat(4,_120px)] xl:grid-cols-[250px_repeat(3,_160px)_250px]"
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
												background: 'linear-gradient(90deg, #9747FF 0%, #29337D 100%)',
												borderRadius: '12px'
											}}
											className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
										></button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<ul className="mb-9 flex flex-col overflow-x-auto rounded-xl">
							{dataList.map((buy: any, key: any) => (
								<li
									key={key}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[80px] grid-cols-2 justify-between gap-4 p-4 pl-10 shadow md:grid-cols-[280px_repeat(4,_120px)] xl:grid-cols-[250px_repeat(3,_160px)_250px]"
								>
									<div className={' flex flex-row items-center gap-1'}>
										<Image
											style={{ borderRadius: '8px' }}
											src={`/assets/nft/${buy.nft_name}.avif`}
											alt="ImgNFT"
											height={50}
											width={50}
											// width={500} automatically provided
											// height={500} automatically provided
											// blurDataURL="data:..." automatically provided
											// placeholder="blur" // Optional blur-up while loading
										/>
										<div>{buy.nft_name}</div>
									</div>
									<div className={'flex flex-row items-center gap-2'}>
										<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgCopy} alt="ImgCopy" />
										<div className="text-sm text-[#585858]">{hideStr(buy.nft_address, 6, 4, '...', 1)}</div>
									</div>
									<div className={'flex flex-row items-center gap-2'}>
										<Image
											style={{ cursor: 'pointer', width: '18px', height: '18px' }}
											src={ImgNFTIcon}
											alt="ImgNFTIcon"
										/>
										<div className="text-sm text-[#585858]">{parseFloat(buy.nfts_in_collection).toLocaleString()}</div>
									</div>

									<div className={'flex flex-row items-center gap-2'}>
										<Image style={{ width: '18px', height: '18px' }} src={ImgDay} alt="ImgDay" />
										<div>
											{/*<div className="text-xs text-[#47494B]"></div>*/}
											<div className="text-sm">
												<span>{buy.interest * 100}% / </span>
												<span className={'font-semibold'}>Day</span>
											</div>
										</div>
									</div>
									<div className=" mx-auto flex w-full flex-col justify-center md:col-span-1 md:mr-0">
										<button
											style={{
												margin: '0 auto',
												padding: '20px 0',
												background: 'linear-gradient(90deg, #9747FF 0%, #29337D 100%)',
												borderRadius: '12px'
											}}
											className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
											onClick={() => openBuyAlert(buy)}
										>
											Buy
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				<div
					className="Mobile relative mx-0 mt-8 mb-auto overflow-x-auto sm:my-9"
					style={{ boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)' }}
					// style={{ boxShadow: '0px 0px 8px 0px rgba(9, 30, 66, 0.16), 0px 0px 1px 0px rgba(9, 30, 66, 0.31)' }}
				>
					<div className="flex min-h-[80px] items-center p-4 text-xl font-semibold shadow">
						<div>Buy Collections</div>
					</div>
					<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
						<div className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[360px_repeat(3,_150px)_240px]">
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Nft Collections</h1>
							</div>

							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Smart Contract</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">NFTs in Collection</h1>
							</div>
							<div className="flex flex-col justify-center">
								<h1 className="min-h-[1.5rem]">Interest</h1>
							</div>
							<div className=" flex flex-col justify-center">
								<h1 className="ml-0.5 min-h-[1.5rem] ">Action</h1>
							</div>
						</div>
					</ul>

					{isLoading1 ? (
						<ul>
							{new Array(5).fill('x').map((_, index) => (
								<li
									key={'pl' + index}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[80px] grid-cols-2 justify-between gap-4 p-4 shadow md:grid-cols-[280px_repeat(4,_120px)] xl:grid-cols-[360px_repeat(3,_150px)_240px]"
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
						</ul>
					) : (
						<ul>
							{dataList.map((buy: any, key: any) => (
								<li
									key={key}
									style={{ borderBottom: '1px solid #ddd' }}
									className="grid min-h-[80px] grid-cols-2 justify-between gap-4 p-4 shadow md:grid-cols-[280px_repeat(4,_120px)] xl:grid-cols-[360px_repeat(3,_150px)_240px]"
								>
									<div className={' flex flex-row items-center gap-1'}>
										<Image
											style={{ borderRadius: '8px' }}
											src={`/assets/nft/${buy.nft_name}.avif`}
											alt="ImgNFT"
											height={50}
											width={50}
										/>
										<div className={'text_overflow'}>{buy.nft_name}</div>
									</div>

									<div className={'flex flex-row items-center gap-1'}>
										<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgCopy} alt="ImgCopy" />
										<div className="text-sm text-[#585858]">{hideStr(buy.nft_address, 4, 4, '...', 1)}</div>
									</div>
									<div className={'flex flex-row items-center gap-1'}>
										<Image
											style={{ cursor: 'pointer', width: '18px', height: '18px' }}
											src={ImgNFTIcon}
											alt="ImgNFTIcon"
										/>
										<div className="text-sm text-[#585858]">{parseFloat(buy.nfts_in_collection).toLocaleString()}</div>
									</div>
									<div className={'flex flex-row items-center gap-1'}>
										<Image style={{ width: '18px', height: '18px' }} src={ImgDay} alt="ImgDay" />
										<div>
											{/*<div className="text-xs text-[#47494B]"></div>*/}
											<div className="text-sm">
												<span>{buy.interest * 100}% / </span>
												<span className={'font-semibold'}>Day</span>
											</div>
										</div>
									</div>
									<div className=" mx-auto flex w-full flex-col justify-center md:col-span-1 md:mr-0">
										<button
											style={{
												margin: '0 auto',
												background: 'linear-gradient(90deg, #9747FF 0%, #29337D 100%)',
												borderRadius: '12px'
											}}
											className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
											onClick={() => openBuyAlert(buy)}
										>
											Buy
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				<Dialog
					state={dialog}
					portal={typeof window !== 'undefined'}
					className="dialog min-h-[300px] w-full max-w-[520px] overflow-auto !border-none bg-[#FFFFFF] !p-0"
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
					{SendisSuccess && !TxisSuccess && (
						<>
							<div className="mt-20 justify-center p-8 text-center text-black">
								<p className="text-xl text-[#00B720]">Trading in progress, please wait for a moment!</p>
							</div>
						</>
					)}
					{SendisSuccess && TxisSuccess && (
						<>
							<div className="mt-20 justify-center p-8 text-center text-black">
								<p className="text-xl">Thank you for your request!</p>
								<p>
									Transaction was <span className="text-[#00B720]">successful!</span>
								</p>
							</div>
						</>
					)}
					{!SendisSuccess && !TxisSuccess && (
						<>
							<div className="text-black">
								<div
									className={'flex flex-col gap-4 p-8'}
									style={{ background: '#F2F1F6', borderRadius: '8px 8px 0 0' }}
								>
									<div className={' flex flex-row items-center gap-4 '}>
										<Image
											style={{ borderRadius: '8px' }}
											src={`/assets/nft/${selectNFT.nft_name}.avif`}
											alt="ImgNFT"
											height={50}
											width={50}
										/>
										<div className={'flex flex-col gap-1'}>
											<div className="text-xl font-semibold">{selectNFT.nft_name}</div>
											<div className="text-xl text-[#47494B]">{hideStr(selectNFT.nft_address, 4, 4, '...', 1)}</div>
										</div>
									</div>

									<InputText
										name="tokenID"
										placeholder="Type your ID."
										label={'ID'}
										required
										// pattern="^0x[a-fA-F0-9]{40}$"
										// title="Type your ID1."
										defaultValue={tokenID}
										onChange={(e) => setTokenID(e.target.value)}
									/>
									<button
										style={{
											margin: '20px auto 0',
											background: 'linear-gradient(90deg, #9747FF 0%, #29337D 100%)',
											borderRadius: '12px',
											width: '10px'
										}}
										className="ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
										onClick={changeTokenID}
									>
										get price
									</button>
								</div>
								<div className={'p-8 '}>
									<div>Leverage</div>
									<div>
										<BuySlider
											key={'interestRates' + poolsInterestRange.join('')}
											range={poolsInterestRange}
											symbol="X"
											label=""
											decimals={0}
											disabled={false}
											onValueCommit={onInterestRateChange}
										/>
									</div>
									<div className="flex justify-between border-b py-3">
										<div>Liquidation Price:</div>
										<div>{liquidationPrice} ETH</div>
									</div>
									<div className="flex justify-between border-b py-3">
										<div>Required Collateral:</div>
										<div>{requiredPrice} ETH</div>
									</div>
									<div className="flex justify-between border-b py-3">
										<div>Marketing Price:</div>
										<div className="text-lg">{marketingPrice} ETH</div>
									</div>

									<button
										style={{
											margin: '20px auto 0',
											background: 'linear-gradient(90deg, #9747FF 0%, #29337D 100%)',
											borderRadius: '12px'
										}}
										className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
										onClick={BuyNFT}
									>
										Confirm
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
