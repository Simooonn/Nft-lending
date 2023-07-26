import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import type { IBorrowPool } from '~/types'
import { checkIfPoolDisabled, formatCurrentAnnualInterest, formatDailyInterest } from '~/utils'
import pools from '~/lib/pools'
import { chainConfig } from '~/lib/constants'
import Tooltip from '../Tooltip'
import styles from '~/styles/poolInfo.module.css'

// @ts-ignore
dayjs.extend(relativeTime)

interface IBorrowPoolItemProps {
	data: IBorrowPool
	chainId?: number | null
	setSelectedPool: React.Dispatch<React.SetStateAction<string | null>>
}

export function BorrowPoolItem({ data, setSelectedPool, chainId }: IBorrowPoolItemProps) {
	const poolDeployer = pools[chainId || 1]?.find(
		(pool) => pool.poolAddress.toLowerCase() === data.address.toLowerCase()
	)?.ownerName

	const config = chainConfig(chainId)

	const router = useRouter()

	const poolBalance = (Number(data.poolBalance) / 1e18).toFixed(2)
	const totalDeposited = (Number(data.totalDeposited) / 1e18).toFixed(2)

	const isPoolDisabled = checkIfPoolDisabled(data)
	const bg11 = isPoolDisabled ? ' bg-[#F4F4F4]' : ' bg-[#ffffff]'

	return (
		<div className={'flex flex-wrap  justify-between gap-6 p-5 md:gap-8 2xl:gap-12' + bg11}>
			<div className="flex min-w-[45%] flex-shrink-0 gap-2 sm:min-w-[8.25rem]">
				<Image
					src="/assets/ethereum.png"
					height={40}
					width={40}
					className="h-10 w-10 flex-shrink-0 rounded-full object-contain"
					alt="ethereum"
				/>
				<div>
					<p className="min-h-[1.5rem] font-semibold">{data?.pricePerNft ?? ''}</p>
					<p className="whitespace-nowrap text-sm font-normal text-[#D4D4D8]">Loan Amount</p>
				</div>
			</div>
			<div className="min-w-[45%] flex-shrink-0 sm:min-w-[5.625rem]">
				<p className="min-h-[1.5rem] font-semibold">
					{/* @ts-ignore */}
					{dayjs(new Date(new Date().getTime() + data.maxLoanLength * 1000)).toNow(true)}
				</p>
				<p className="whitespace-nowrap text-sm font-normal text-[#D4D4D8]">Max Duration</p>
			</div>
			<div className="min-w-[45%] flex-shrink-0 sm:min-w-[5.5rem]">
				<Tooltip content={`Yearly Interest: ${formatCurrentAnnualInterest(data.currentAnnualInterest)}%`}>
					<p className={'min-h-[1.5rem] w-24 font-semibold ' + styles.textOverflow}>{`${formatDailyInterest(
						data.currentAnnualInterest
					)}%`}</p>
				</Tooltip>
				<p className="whitespace-nowrap text-sm font-normal text-[#D4D4D8]">Daily Interest</p>
			</div>

			<div className="lg:max-[1300px]:min-w-[45%] max-[948px]:min-w-[45%] flex-shrink-0">
				<a
					target="_blank"
					rel="noreferrer noopener"
					href={`${config.blockExplorer.url}/address/${data.address}`}
					className="min-h-[1.5rem] font-semibold text-[#3070FB]"
				>
					{data.name + (poolDeployer ? ` by ${poolDeployer}` : '')}
				</a>

				<p className="text-sm font-normal text-[#D4D4D8]">Pool Info</p>
			</div>
			{isPoolDisabled ? (
				<button className="max-sm:w-full ml-auto rounded-md bg-[#5E5E5E] px-4 py-[0.625rem] font-semibold text-[#FFFFFF]">
					<Tooltip content={isPoolDisabled}>Pool Disabled</Tooltip>
				</button>
			) : (
				// #3046FB
				<button
					className="max-sm:w-full ml-auto rounded-md bg-[#3B82F6] px-4 py-[0.625rem] font-semibold text-[#FFFFFF]"
					onClick={() => {
						setSelectedPool(data.address)
						router.push({ pathname: router.pathname, query: { ...router.query, cart: true } }, undefined, {
							shallow: true
						})
					}}
				>
					Select Loan
				</button>
			)}
		</div>
	)
}

export function PlaceholderBorrowPoolItem() {
	return (
		<div className="flex flex-wrap justify-between gap-6 rounded-xl bg-[#22242A] p-5 md:gap-8 2xl:gap-12">
			<div className="flex min-w-[45%] flex-shrink-0 gap-2 sm:min-w-[8.25rem]">
				<Image
					src="/assets/ethereum.png"
					height={40}
					width={40}
					className="h-10 w-10 flex-shrink-0 rounded-full object-contain"
					alt="ethereum"
				/>
				<div>
					<p className="placeholder-box-2 h-[1.5rem] w-20 font-semibold"></p>
					<p className="text-sm font-normal text-[#D4D4D8]">Loan Amount</p>
				</div>
			</div>

			<div className="min-w-[45%] flex-shrink-0 sm:min-w-[5.625rem]">
				<p className="placeholder-box-2 h-[1.5rem] w-20 font-semibold"></p>
				<p className="text-sm font-normal text-[#D4D4D8]">Max Duration</p>
			</div>
			<div className="min-w-[45%] flex-shrink-0 sm:min-w-[5.5rem]">
				<p className="placeholder-box-2 h-[1.5rem] w-20 font-semibold"></p>
				<p className="text-sm font-normal text-[#D4D4D8]">Daily Interest</p>
			</div>
			<div className="min-w-[45%] flex-shrink-0 sm:min-w-[7rem]">
				<p className="placeholder-box-2 h-[1.5rem] w-20 font-semibold"></p>
				<p className="text-sm font-normal text-[#D4D4D8]">Borrowable Now</p>
			</div>
			<div className="lg:max-[1300px]:min-w-[45%] max-[948px]:min-w-[45%] flex-shrink-0">
				<p className="placeholder-box-2 h-[1.5rem] w-16 font-semibold text-[#3070FB]"></p>
				<p className="text-sm font-normal text-[#D4D4D8]">Pool Info</p>
			</div>

			<button className="max-sm:w-full ml-auto rounded-md bg-[#3046FB] px-4 py-[0.625rem] font-semibold" disabled>
				Select Loan
			</button>
		</div>
	)
}
