import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import BigNumber from 'bignumber.js'
import Layout from '~/components/Layout'
import { RepayCart } from '~/components/Cart'
import Tooltip from '~/components/Tooltip'
import { useGetLoans } from '~/queries/useLoans'
import { useGetCartItems, useSaveItemToCart } from '~/queries/useCart'
import { chainConfig } from '~/lib/constants'
import { formatLoanDeadline, getLoansPayableAmount } from '~/utils'
import React from 'react'
import { hideStr } from '~/utils/function'
import ImgNFTIcon from '~/public/assets/img/nft_icon.png'
import ImgETH from '~/public/assets/img/ETH9.png'
import ImgFire from '~/public/assets/img/fire.png'

interface ILoansContainerProps {
	chainId?: number | null
	chainName?: string | null
	userAddress?: string
}

export default function LoanPoolsContainer({ chainId, chainName, userAddress }: ILoansContainerProps) {
	const { isConnected, address } = useAccount()

	const { openConnectModal } = useConnectModal()

	const config = chainConfig(chainId)

	var { data, isLoading, isError } = useGetLoans({ chainId, userAddress })

	const chainSymbol = chainConfig(chainId).nativeCurrency?.symbol

	// query to get cart items from local storage
	// dont pass user address to this query, as we only to get items in cart of connected wallet's userAddress
	const { data: itemsInCart } = useGetCartItems({ contractAddress: 'repay', chainId })
	data = [
		{
			id: '0x26406f61d96c380f003812dc12bcf70f6f1618b272cd77f6c7fbe5e16a05e60b',
			loanId: '17301735190166545819289071869347783820973880322306676732416538922368266266123',
			nftId: '38607',
			interest: '9690511412',
			startTime: '1682618459',
			borrowed: '2800000000000000',
			toPay: {
				initialBorrowed: 2800000000000000,
				apr: 0.305599967888832,
				interestAccrued: 49057244972.1088,
				lateFees: 0,
				buffer: '0.0001',
				total: 2800049057244972,
				totalPayable: '0.0029'
			},
			deadline: 1683828059000,
			imgUrl: '',
			owner: '0xdc98adec106b6bae77b61a54d7dd87fbc11072f7',
			pool: {
				name: 'ZORBFI',
				owner: '0x8c580556fdb1f57853e49f409ae9b89f7658e7a2',
				address: '0x4e6b6B85ED7889f4FC2b1577774F912DB238Ba2f'
			}
		},
		{
			id: '0x26406f61d96c380f003812dc12bcf70f6f1618b272cd77f6c7fbe5e16a05e60b',
			loanId: '17301735190166545819289071869347783820973880322306676732416538922368266266123',
			nftId: '38607',
			interest: '9690511412',
			startTime: '1682618459',
			borrowed: '2800000000000000',
			toPay: {
				initialBorrowed: 2800000000000000,
				apr: 0.305599967888832,
				interestAccrued: 49057244972.1088,
				lateFees: 0,
				buffer: '0.0001',
				total: 2800049057244972,
				totalPayable: '0.0029'
			},
			deadline: 1683828059000,
			imgUrl: '',
			owner: '0xdc98adec106b6bae77b61a54d7dd87fbc11072f7',
			pool: {
				name: 'ZORBFI',
				owner: '0x8c580556fdb1f57853e49f409ae9b89f7658e7a2',
				address: '0x4e6b6B85ED7889f4FC2b1577774F912DB238Ba2f'
			}
		}
	]
	// query to save items to cart
	const { mutate: addToCart } = useSaveItemToCart({ chainId })

	const payableAmout = data && data.reduce((acc, curr) => (acc += curr.toPay.total), 0)

	return (
		<>
			<Head>
				<title>Repay - ProTradex</title>
			</Head>

			<Layout>
				<div
					className="Desktop relative mx-auto mt-8 mb-auto overflow-x-auto rounded-xl sm:my-9"
					style={{
						margin: '0 10%',
						boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)',
						fontSize: '16px',
						lineHeight: '21px'
					}}
				>
					{!chainId || !chainName ? (
						<p className="fallback-text">Network not supported.</p>
					) : !userAddress ? (
						<p className="fallback-text">
							<button onClick={openConnectModal}>Connect</button> your wallet to view loans.
						</p>
					) : isError ? (
						<p className="fallback-text">Something went wrong, couldn't get loans.</p>
					) : data?.length === 0 ? (
						<p className="fallback-text">
							You don't have any loans, Click{' '}
							<Link href="/borrow" className="underline">
								here
							</Link>{' '}
							to borrow {chainSymbol}.
						</p>
					) : (
						<>
							<div className="flex min-h-[80px] items-center p-4 pl-10 text-xl font-semibold shadow">
								<div>Repay</div>
							</div>
							<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
								<div className="flex grid min-h-[90px] grid-cols-8 flex-row justify-between  pl-10  font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[120px_160px_595px_150px]">
									<div className="flex flex-col justify-center border-r">
										<h1 className="min-h-[1.5rem]">Token ID</h1>
									</div>
									<div className="flex flex-col justify-center border-r">
										<h1 className="min-h-[1.5rem]">Pool</h1>
									</div>

									<div className={'flex flex-col items-center justify-center'}>
										<div className={'flex min-h-[45px] w-full flex-row  items-center  justify-center'}>To Pay</div>
										<div
											className={
												'flex grid  min-h-[45px] flex-row gap-6 text-[13px]  xl:grid-cols-[100px_90px_110px_repeat(2,_100px)]'
											}
										>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Initial Borrowed</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">APR</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Interest Accrued</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Late Fees</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Total</h1>
											</div>
										</div>
									</div>
									<div className=" flex flex-col justify-center border-l text-center">
										<h1 className="ml-0.5 min-h-[1.5rem] ">Deadline</h1>
									</div>
								</div>
							</ul>
							{isLoading ? (
								<>
									{new Array(5).fill('x').map((_, index) => (
										<li
											key={'pl' + index}
											style={{ borderBottom: '1px solid #ddd' }}
											className="grid min-h-[60px] grid-cols-8 justify-between p-4 pl-10  font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[120px_160px_repeat(5,_100px)_150px]"
										>
											<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
											<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
											<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
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
									{data.map((loan: any, key: any) => (
										<li
											key={key}
											style={{ borderBottom: '1px solid #ddd' }}
											className="grid min-h-[60px] grid-cols-8 justify-between p-4 pl-10 text-[14px] font-normal text-[#1E293B]  xl:grid-cols-[120px_160px_repeat(5,_100px)_150px] "
										>
											<div className={' flex flex-row items-center gap-2'}>
												<div className="relative aspect-square h-10 rounded bg-[#f0f0f0]">
													{loan.imgUrl !== '' && (
														<Image src={loan.imgUrl} fill alt="" className="aspect-square rounded" />
													)}
												</div>
												<a
													target="_blank"
													rel="noreferrer noopener"
													href={`${config.blockExplorer.url}/token/${loan.pool.address}?a=${loan.loanId}`}
													className="text-[#262626]"
												>
													{loan.id.slice(0, 4) + '...' + loan.id.slice(-4)}
												</a>
											</div>
											<div className="flex flex-row items-center gap-1">
												<a
													target="_blank"
													rel="noreferrer noopener"
													href={`${config.blockExplorer.url}/address/${loan.pool.address}`}
													className="text-[#000000] underline"
												>
													{loan.pool.name}
												</a>
												<span className={' text-[#262626]'}>{` by `}</span>
												<a
													target="_blank"
													rel="noreferrer noopener"
													href={`${config.blockExplorer.url}/address/${loan.pool.owner}`}
													className="text-[#262626] underline"
												>
													{loan.pool.owner.slice(0, 4) + '...' + loan.pool.owner.slice(-4)}
												</a>
											</div>
											<div className="flex flex-row items-center  gap-0.5">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.initialBorrowed / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>
											<div className="flex flex-row items-center text-sm">
												<Image
													style={{ cursor: 'pointer', width: '18px', height: '18px' }}
													src={ImgFire}
													alt="ImgFire"
												/>
												<div>{(loan.toPay.apr * 100).toFixed(2) + ' %'}</div>
											</div>
											<div className="flex flex-row items-center gap-0.5 text-sm">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.interestAccrued / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>

											<div className="flex flex-row items-center gap-0.5 text-sm">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.lateFees / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>
											<div className="flex flex-row items-center gap-0.5 text-sm">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.total / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>
											{/*<div className="flex flex-row items-center text-sm">*/}
											{/*	<Tooltip content={new Date(loan.deadline).toUTCString()}>*/}
											{/*		<span className="w-full text-center">{formatLoanDeadline(loan.deadline)}</span>*/}
											{/*	</Tooltip>*/}
											{/*</div>*/}

											<div className="whitespace-nowrap">
												{itemsInCart?.includes(loan.id) ? (
													<button
														style={{
															background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
															borderRadius: '12px',
															padding: '10px 35px'
														}}
														className="ml-auto flex h-4  items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white"
														onClick={() => addToCart({ contractAddress: 'repay', tokenId: loan.id })}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-4 w-4"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															strokeWidth={2}
														>
															<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
														</svg>
														<span>Added to cart</span>
													</button>
												) : (
													<button
														style={{
															background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
															borderRadius: '12px',
															padding: '20px 30px'
														}}
														className="ml-auto flex h-4  items-center justify-center gap-1 rounded-lg  bg-[#3B82F6] p-4 text-sm text-white disabled:cursor-not-allowed disabled:text-opacity-50"
														onClick={() => addToCart({ contractAddress: 'repay', tokenId: loan.id })}
														disabled={!isConnected || address?.toLowerCase() !== userAddress?.toLowerCase()}
													>
														Add to cart
													</button>
												)}
											</div>
										</li>
									))}
								</>
							)}
							<ul className="">
								<li className="whitespace-nowrap px-4 py-6 text-right font-medium">
									Total: {payableAmout && new BigNumber(payableAmout).div(1e18).toFixed(4)} {chainSymbol}
								</li>
							</ul>
						</>
					)}
				</div>

				<div
					className="Mobile relative mt-8 mb-auto overflow-x-auto sm:my-9"
					style={{
						boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)',
						fontSize: '16px',
						lineHeight: '21px'
					}}
				>
					{!chainId || !chainName ? (
						<p className="fallback-text">Network not supported.</p>
					) : !userAddress ? (
						<p className="fallback-text">
							<button onClick={openConnectModal}>Connect</button> your wallet to view loans.
						</p>
					) : isError ? (
						<p className="fallback-text">Something went wrong, couldn't get loans.</p>
					) : data?.length === 0 ? (
						<p className="fallback-text">
							You don't have any loans, Click{' '}
							<Link href="/borrow" className="underline">
								here
							</Link>{' '}
							to borrow {chainSymbol}.
						</p>
					) : (
						<>
							<div className="flex min-h-[80px] items-center p-4 pl-10 text-xl font-semibold shadow">
								<div>Repay</div>
							</div>
							<ul className="flex flex-col bg-[#EFF6FF] shadow">
								<div className="flex min-h-[90px]  flex-row justify-between  pl-1 font-medium shadow">
									<div className="flex w-1/4 flex-col items-center justify-center border-r">
										<h1 className="min-h-[1.5rem]">Token ID</h1>
									</div>
									<div className="flex w-1/4 flex-col items-center justify-center border-r">
										<h1 className="min-h-[1.5rem]">Pool</h1>
									</div>

									<div className={'flex w-1/4 flex-col items-center justify-center'}>
										<div className={'flex min-h-[45px] w-full flex-row  items-center  justify-center'}>To Pay</div>
										<div
											className={
												'flex grid  min-h-[45px] flex-row gap-6 text-[13px]  xl:grid-cols-[100px_90px_110px_repeat(2,_100px)]'
											}
										>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Initial Borrowed</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">APR</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Interest Accrued</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Late Fees</h1>
											</div>
											<div className="flex flex-col justify-center">
												<h1 className="min-h-[1.5rem]">Total</h1>
											</div>
										</div>
									</div>
									<div className=" flex w-1/4 flex-col justify-center border-l text-center">
										<h1 className="ml-0.5 min-h-[1.5rem] ">Deadline</h1>
									</div>
								</div>
							</ul>
							{isLoading ? (
								<>
									{new Array(5).fill('x').map((_, index) => (
										<li
											key={'pl' + index}
											style={{ borderBottom: '1px solid #ddd' }}
											className="grid min-h-[60px] grid-cols-8 justify-between p-4 font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[120px_160px_repeat(5,_100px)_150px]"
										>
											<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
											<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
											<div className={' placeholder-box flex flex-row items-center gap-1'}></div>
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
									{data.map((loan: any, key: any) => (
										<li
											key={key}
											style={{ borderBottom: '1px solid #ddd' }}
											className="flex min-h-[60px] flex-col items-center justify-between gap-2  p-2 pl-3 text-[14px] font-normal text-[#1E293B] "
										>
											<div className={' flex flex-row items-center gap-2 '}>
												<div className="relative aspect-square h-10 rounded bg-[#f0f0f0]">
													{loan.imgUrl !== '' && (
														<Image src={loan.imgUrl} fill alt="" className="aspect-square rounded" />
													)}
												</div>
												<a
													target="_blank"
													rel="noreferrer noopener"
													href={`${config.blockExplorer.url}/token/${loan.pool.address}?a=${loan.loanId}`}
													className="text-[#262626]"
												>
													{loan.id.slice(0, 4) + '...' + loan.id.slice(-4)}
												</a>
											</div>
											<div className="flex flex-row items-center gap-1">
												<a
													target="_blank"
													rel="noreferrer noopener"
													href={`${config.blockExplorer.url}/address/${loan.pool.address}`}
													className="text-[#000000] underline"
												>
													{loan.pool.name}
												</a>
												<span className={' text-[#262626]'}>{` by `}</span>
												<a
													target="_blank"
													rel="noreferrer noopener"
													href={`${config.blockExplorer.url}/address/${loan.pool.owner}`}
													className="text-[#262626] underline"
												>
													{loan.pool.owner.slice(0, 4) + '...' + loan.pool.owner.slice(-4)}
												</a>
											</div>
											<div className="flex flex-row items-center  gap-0.5">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.initialBorrowed / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>
											<div className="flex flex-row items-center text-sm">
												<Image
													style={{ cursor: 'pointer', width: '18px', height: '18px' }}
													src={ImgFire}
													alt="ImgFire"
												/>
												<div>{(loan.toPay.apr * 100).toFixed(2) + ' %'}</div>
											</div>
											<div className="flex flex-row items-center gap-0.5 text-sm">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.interestAccrued / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>

											<div className="flex flex-row items-center gap-0.5 text-sm">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.lateFees / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>
											<div className="flex flex-row items-center gap-0.5 text-sm">
												<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
												<div>{(loan.toPay.total / 1e18).toFixed(4) + ' ' + chainSymbol}</div>
											</div>
											{/*<div className="flex flex-row items-center text-sm">*/}
											{/*	<Tooltip content={new Date(loan.deadline).toUTCString()}>*/}
											{/*		<span className="w-full text-center">{formatLoanDeadline(loan.deadline)}</span>*/}
											{/*	</Tooltip>*/}
											{/*</div>*/}

											<div className="whitespace-nowrap">
												{itemsInCart?.includes(loan.id) ? (
													<button
														style={{
															background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
															borderRadius: '12px',
															padding: '10px 35px'
														}}
														className="flex h-4  items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white"
														onClick={() => addToCart({ contractAddress: 'repay', tokenId: loan.id })}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-4 w-4"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															strokeWidth={2}
														>
															<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
														</svg>
														<span>Added to cart</span>
													</button>
												) : (
													<button
														style={{
															background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
															borderRadius: '12px',
															padding: '20px 30px'
														}}
														className="flex h-4  items-center justify-center gap-1 rounded-lg  bg-[#3B82F6] p-4 text-sm text-white disabled:cursor-not-allowed disabled:text-opacity-50"
														onClick={() => addToCart({ contractAddress: 'repay', tokenId: loan.id })}
														disabled={!isConnected || address?.toLowerCase() !== userAddress?.toLowerCase()}
													>
														Add to cart
													</button>
												)}
											</div>
										</li>
									))}
								</>
							)}
							<ul className="">
								<li className="whitespace-nowrap px-4 py-6 text-right font-medium">
									Total: {payableAmout && new BigNumber(payableAmout).div(1e18).toFixed(4)} {chainSymbol}
								</li>
							</ul>
						</>
					)}
				</div>

				<RepayCart chainId={chainId} userAddress={userAddress} isLoading={isLoading} />
				{/*</div>*/}
			</Layout>
		</>
	)
}
