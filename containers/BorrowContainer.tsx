import { useState, Suspense } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import Layout from '~/components/Layout'
import { BorrowPoolItem, PlaceholderBorrowPoolItem } from '~/components/Pool'
import { BorrowCart } from '~/components/Cart'
import Tooltip from '~/components/Tooltip'
import { Slider } from '~/components/Form/Slider'
import { useGetAllPools } from '~/queries/useGetAllPools'
import useGetCollectionName from '~/queries/useGetCollectionName'
import { useGetOracle } from '~/queries/useGetOracle'
import { useGetNftsList } from '~/queries/useNftsList'
import { formatDailyInterest } from '~/utils'
import { chainConfig, SECONDS_IN_A_DAY } from '~/lib/constants'

interface IPoolsContainerProps {
	chainId?: number | null
	chainName?: string | null
	collectionAddress?: string
}

type TSortKey = 'poolLiquidity' | 'loanAmount' | 'maxDuration' | 'dailyInterest'

const BorrowContainer = ({ chainId, chainName, collectionAddress }: IPoolsContainerProps) => {
	const [sortKey, setSortKey] = useState<TSortKey>('poolLiquidity')

	const [selectedPool, setSelectedPool] = useState<string | null>(null)

	const [interestRange, setInterestRange] = useState<Array<number> | null>(null)
	const [loanAmountRange, setLoanAmountRange] = useState<Array<number> | null>(null)
	const [durationRange, setDurationRange] = useState<Array<number> | null>(null)

	const { data: collectionName, isLoading: fetchingCollectionName } = useGetCollectionName({
		chainId,
		collectionAddress
	})

	const {
		data: nftsList,
		isLoading: fetchingNftsList,
		isError: nftsListError
	} = useGetNftsList({
		nftContractAddress: collectionAddress,
		chainId
	})

	const { data: oracle } = useGetOracle({ nftContractAddress: collectionAddress, chainId })

	const { data, isError, isLoading } = useGetAllPools({ chainId, collectionAddress })

	const { isConnected } = useAccount()

	const chainSymbol = chainConfig(chainId)?.nativeCurrency?.symbol

	const floorPrice = oracle?.price ? `Floor Price: ${(Number(oracle.price) / 1e18).toFixed(2)} ${chainSymbol}` : ''

	const onInterestRateChange = (value: Array<number>) => {
		setInterestRange(value)
	}

	const onLoanAmountChange = (value: Array<number>) => {
		setLoanAmountRange(value)
	}

	const onDurationChange = (value: Array<number>) => {
		setDurationRange(value)
	}

	let poolsInterestRange = [0, 1]
	let poolsLoanAmountsRange = [0, 1]
	let poolsDurationsRange = [0, 14]

	if (data && data.length > 0) {
		const sortedPoolsByInterest = data.sort(
			(a, b) => Number(a.currentAnnualInterest.toString()) - Number(b.currentAnnualInterest.toString())
		)

		const minInterest = sortedPoolsByInterest[0]?.currentAnnualInterest
		const maxInterest = sortedPoolsByInterest[sortedPoolsByInterest.length - 1]?.currentAnnualInterest
		const maxInterestNum = Number(formatDailyInterest(maxInterest).replaceAll(',', ''))

		poolsInterestRange = [
			minInterest ? Number(formatDailyInterest(minInterest)) : 0,
			maxInterest ? (maxInterestNum > 1 ? 1 : maxInterestNum) : 1
		]

		const sortedPoolsByLoanAmount = data.sort(
			(a, b) => Number(a.pricePerNft.toString()) - Number(b.pricePerNft.toString())
		)

		const minLoanAmount = sortedPoolsByLoanAmount[0]?.pricePerNft
		const maxLoanAmount = sortedPoolsByLoanAmount[sortedPoolsByLoanAmount.length - 1]?.pricePerNft

		poolsLoanAmountsRange = [
			minLoanAmount ? Number(minLoanAmount.toString()) : 0,
			maxLoanAmount ? Number(maxLoanAmount.toString()) : 1
		]

		const sortedPoolsByLoanLength = data.sort(
			(a, b) => Number(a.maxLoanLength.toString()) - Number(b.maxLoanLength.toString())
		)

		const minDuration = sortedPoolsByLoanLength[0]?.maxLoanLength
		const maxDuration = sortedPoolsByLoanLength[sortedPoolsByLoanLength.length - 1]?.maxLoanLength

		poolsDurationsRange = [
			minDuration ? minDuration / SECONDS_IN_A_DAY : 0,
			maxDuration ? maxDuration / SECONDS_IN_A_DAY : 14
		]
	}

	const sortedData =
		data
			?.filter((pool) => {
				let toFilter = true
				if (interestRange) {
					const interest = Number(formatDailyInterest(pool.currentAnnualInterest.toString()))

					toFilter = toFilter && interest >= interestRange[0] && interest <= interestRange[1]
				}

				if (loanAmountRange) {
					const loanAmount = Number(pool.pricePerNft.toString())

					toFilter = toFilter && loanAmount >= loanAmountRange[0] && loanAmount <= loanAmountRange[1]
				}

				if (durationRange) {
					const loanLength = pool.maxLoanLength / SECONDS_IN_A_DAY

					toFilter = toFilter && loanLength >= durationRange[0] && loanLength <= durationRange[1]
				}

				return toFilter
			})
			.sort((a, b) => {
				if (sortKey === 'dailyInterest') {
					return Number(b.currentAnnualInterest.toString()) - Number(a.currentAnnualInterest.toString())
				}

				if (sortKey === 'loanAmount') {
					return Number(b.pricePerNft.toString()) - Number(a.pricePerNft.toString())
				}

				if (sortKey === 'maxDuration') {
					return Number(b.maxLoanLength.toString()) - Number(a.maxLoanLength.toString())
				}

				return Number(b.poolBalance) - Number(a.poolBalance)
			}) ?? []

	return (
		<>
			<Head>
				<title>Borrow - ProTradex</title>
			</Head>

			<Layout>
				<div className="-mb-[6px] mt-12 flex flex-wrap justify-between gap-8 xl:gap-14 2xl:gap-16">
					<h1 className="flex min-h-[2.5rem] flex-row items-center text-xl font-semibold">
						<button className="font-normal">
							<Link href="/">Home</Link>
						</button>
						<div className="m-1 flex items-center">
							<Image src="/assets/right-row.png" alt="" className="m-2 block" height={6} width={6} priority />
						</div>
						<div>{collectionName ? collectionName + ' Loans' : ''}</div>
					</h1>
					<h1 className="min-h-[2.5rem] text-xl font-semibold">
						<Tooltip content="Minimum floor price over last week">{floorPrice}</Tooltip>
					</h1>
				</div>
				<hr className="my-6 border-[#29337D52]" />
				<div className="rounded-xl bg-[#ffffff]">
					{!chainId || !chainName ? (
						<p className="fallback-text text-sm font-normal">
							Network not supported. No pools on {chainName || 'this network'}.
						</p>
					) : (
						<div className="flex flex-col gap-9 lg:flex-col">
							<div className="flex w-full flex-col gap-2">
								{nftsListError ? (
									<p className="fallback-text text-sm font-normal">Something went wrong, failed to fetch your NFTs.</p>
								) : (
									<>
										{isConnected && (
											<div className="mb-1 flex flex-nowrap gap-1 overflow-x-auto">
												{fetchingNftsList ? (
													<>
														{new Array(5).fill('llama').map((_, index) => (
															<div className="placeholder-box-2 h-10 w-10 flex-shrink-0" key={'bnp' + index}></div>
														))}
													</>
												) : (
													<>
														{nftsList.map((item) => (
															<Image
																src={item.imgUrl}
																alt={`#${item.tokenId}`}
																height={40}
																width={40}
																className="aspect-square rounded"
																key={item.tokenId}
															></Image>
														))}
													</>
												)}
											</div>
										)}

										<div className="flex min-h-[60px] items-center justify-between p-4 text-xl font-semibold shadow">
											<div className="-my-1 min-h-[1.25rem] text-sm font-medium text-[#404040]">
												{!isConnected
													? `Connect wallet to view your ${collectionName || ''} NFTs`
													: fetchingNftsList || fetchingCollectionName
													? ''
													: `You have ${nftsList.length} ${collectionName || ''} NFTs to use as collateral`}
											</div>
											<label className="relative">
												<span className="absolute top-[13px] left-[8px] text-xs">Sort By : </span>
												<select
													className="min-h-[42px] w-full rounded border-none bg-[#EFF6FF] pl-[3.85rem] text-xs disabled:cursor-not-allowed"
													onChange={(e) => setSortKey(e.target.value as TSortKey)}
													disabled={!data || data.length < 2}
												>
													<option value="poolLiquidity">Pool Liquidity</option>
													<option value="loanAmount">Loan Amount</option>
													<option value="maxDuration">Max Duration</option>
													<option value="dailyInterest">Daily Interest</option>
												</select>
											</label>
										</div>
									</>
								)}
							</div>

							<div className="flex w-full justify-between">
								{isError && (
									<div className="fallback-text text-sm font-normal">
										Something went wrong, couldn't get pools on this networkk.
									</div>
								)}

								{!isError && isLoading && (
									<div className="flex flex-col gap-5">
										{new Array(4).fill(1).map((_, index) => (
											<PlaceholderBorrowPoolItem key={'plitem' + index} />
										))}
									</div>
								)}

								{!isError && !isLoading && sortedData.length === 0 && (
									<div className="fallback-text text-sm font-normal">
										{collectionAddress ? (
											<>No pools available on collection {collectionAddress}</>
										) : (
											<>
												There are no pools on {chainName || 'this'} network. Click{' '}
												<Link href="/create">
													<a className="underline">here</a>
												</Link>{' '}
												to create a new pool.
											</>
										)}
									</div>
								)}
								{!isError && !isLoading && sortedData.length !== 0 && (
									<>
										<div className="m-4 flex w-1/4 flex-col gap-9">
											<div className="text-xl font-medium">Filter</div>

											<Slider
												key={'interestRates' + poolsInterestRange.join('')}
												range={poolsInterestRange}
												label="Current Daily Interest Rate"
												symbol="%"
												decimals={2}
												disabled={isLoading || !data || data.length < 2}
												onValueCommit={onInterestRateChange}
											/>
											<Slider
												key={'loanAmounts' + poolsLoanAmountsRange.join('')}
												range={poolsLoanAmountsRange}
												label="Loan Amount (ETH)"
												symbol=""
												decimals={4}
												disabled={isLoading || !data || data.length < 2}
												onValueCommit={onLoanAmountChange}
											/>
											<Slider
												key={'duration' + poolsDurationsRange.join('')}
												range={poolsDurationsRange}
												label="Max Loan Duration"
												symbol="day"
												decimals={0}
												disabled={isLoading || !data || data.length < 2}
												onValueCommit={onDurationChange}
											/>
										</div>

										<div className="flex flex-col gap-5">
											{sortedData.map((item) => (
												<BorrowPoolItem
													key={item.address}
													data={item}
													chainId={chainId}
													setSelectedPool={setSelectedPool}
												/>
											))}
										</div>
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</Layout>

			<Suspense fallback={null}>
				<BorrowCart
					poolData={
						data
							? selectedPool
								? sortedData.find((pool) => pool.address.toLowerCase() === selectedPool.toLowerCase())
								: sortedData[0]
							: null
					}
					nftsList={nftsList}
					chainId={chainId}
					collectionAddress={collectionAddress}
					isLoading={isLoading || fetchingNftsList}
				/>
			</Suspense>
		</>
	)
}

export default BorrowContainer
