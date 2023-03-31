import { useState, Suspense } from 'react'
import Head from 'next/head'
// import BigNumber from 'bignumber.js'
import Layout from '~/components/Layout'
import { Dialog, DialogHeading, useDialogState } from 'ariakit/dialog'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BuySlider } from '~/components/Form/BuySlider'

export default function BuyContainer() {
	const router = useRouter()
	const { cart, ...queries } = router.query

	const data = [
		{ id: 1, lender: '0PX3208883d10191', available: '28 / 80 ETH', interest: '1%' },
		{ id: 2, lender: '0PX3208883d10079', available: '58 / 80 ETH', interest: '44%' },
		{ id: 3, lender: '0PX3208883d17968', available: '6 / 80 ETH', interest: '61%' },
		{ id: 4, lender: '0PX3208883d10766', available: '15 / 80 ETH', interest: '36%' }
	]
	if (data.length === 0) {
		for (let i = 0; i < 10; i++) {
			data.push({
				id: i,
				lender: '0PX3208883d' + Math.floor(Math.random() * 9000 + 10000),
				available: Math.floor(Math.random() * 80) + 1 + ' / 80 ETH',
				interest: Math.floor(Math.random() * 100) + 1 + '%'
			})
		}
	}

	let isLoading = false
	const isOpen = typeof cart === 'string' && cart === 'true'

	let poolsInterestRange = [0, 5]
	const [interestRange, setInterestRange] = useState<Array<number> | null>(null)
	const onInterestRateChange = (value: Array<number>) => {
		setInterestRange(value)
	}

	const dialog = useDialogState({
		open: isOpen,
		setOpen: (open) => {
			if (!open) {
				router.push(
					{
						pathname: router.pathname,
						query: { ...queries }
					},
					undefined,
					{ shallow: true }
				)
			}
		}
	})

	return (
		<>
			<Head>
				<title>Buy - ProTradex</title>
			</Head>

			<Layout>
				<div className="relative mx-auto mt-8 mb-auto w-full overflow-x-auto rounded-xl sm:my-9">
					<table className="mx-auto w-full table-auto border-collapse rounded-xl bg-[#FFFFFF] text-base">
						<thead className="bg-[#EFF6FF]">
							<tr>
								<th className="rounded-tl-xl p-4 font-normal text-[#475569]" rowSpan={3}>
									Lender
								</th>
								<th className="p-4 font-normal text-[#475569]" rowSpan={3}>
									Available
								</th>
								<th className="p-4 py-1 text-center font-normal text-[#475569]" rowSpan={3}>
									Interest %
								</th>
								<th className="p-4 font-normal text-[#475569]" rowSpan={1}>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<>
									{new Array(5).fill('x').map((_, index) => (
										<tr key={'pl' + index}>
											<td className="px-4 py-2">
												<div className="placeholder-box h-5 w-[90px]"></div>
											</td>
											<td className="px-4 py-2">
												<div className="placeholder-box h-5 w-[90px]"></div>
											</td>
											<td className="px-4 py-2">
												<div className="placeholder-box h-5 w-[90px]"></div>
											</td>
											<td className="px-4 py-2">
												<div className="ml-auto h-[34px] w-[10rem] rounded-lg border border-[#243b55] bg-[#243b55]"></div>
											</td>
										</tr>
									))}
								</>
							) : (
								<>
									{data.map((buy) => (
										<tr key={buy.id} style={{ borderBottom: '1px solid #ddd' }}>
											<td className="whitespace-nowrap px-4 py-2" style={{ textAlign: 'center' }}>
												{buy.lender}
											</td>
											<td
												className="border-bottm whitespace-nowrap border-[#252525] px-4 py-2"
												style={{ textAlign: 'center' }}
											>
												{buy.available}
											</td>
											<td className="whitespace-nowrap px-4 py-2" style={{ textAlign: 'center' }}>
												{buy.interest}
											</td>
											<td className="whitespace-nowrap px-4 py-2">
												<button
													style={{ margin: '0 auto' }}
													className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg border border-[#243b55] bg-[#29337D] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
													onClick={() => {
														router.push(
															{ pathname: router.pathname, query: { ...router.query, cart: true } },
															undefined,
															{
																shallow: true
															}
														)
													}}
												>
													Borrow
												</button>
											</td>
										</tr>
									))}
								</>
							)}
							{/* <tr className="border border-[#252525]">
								<td colSpan={8} className="whitespace-nowrap px-4 py-2 text-right">
									Total: 111
								</td>
							</tr> */}
						</tbody>
					</table>
				</div>
				<Dialog
					state={dialog}
					portal={typeof window !== 'undefined'}
					className="dialog min-h-[300px] w-full max-w-[520px] overflow-auto !border-none bg-[#FFFFFF] !p-0"
				>
					<Link href={router.asPath.split('?cart=true')[0]} className="buttonDismiss absolute top-2 right-2">
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
					</Link>
					<div className="p-8 text-black">
						<div>NFT Address</div>
						<div>select</div>
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
							<div>0 ETH</div>
						</div>
						<div className="flex justify-between border-b py-3">
							<div>Required Collateral:</div>
							<div>0 ETH</div>
						</div>
						<div className="flex justify-between border-b py-3">
							<div>Marketing Price:</div>
							<div className="text-lg">0 ETH</div>
						</div>

						<button
							style={{ margin: '20px auto 0' }}
							className="cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg border border-[#243b55] bg-[#29337D] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
							onClick={() => {
								router.push({ pathname: router.pathname, query: { ...router.query, cart: true } }, undefined, {
									shallow: true
								})
							}}
						>
							Confirm
						</button>
					</div>
				</Dialog>
			</Layout>
		</>
	)
}
