import Link from 'next/link'
import { chainConfig } from '~/lib/constants'
import { useGetAllPools } from '~/queries/useGetAllPools'
import { formatDailyInterest } from '~/utils'
import Image from 'next/image'
import ImgETH from '~/public/assets/img/ETH9.png'
import ImgFire from '~/public/assets/img/fire.png'
import ImgMoney from '~/public/assets/img/money.png'
import React from 'react'

interface IBorrowCollectionItemProps {
	data: { name: string; address: string; imgUrl: string }
	chainName: string
	chainId?: number
}

export function BorrowCollectionItemList({ data, chainName, chainId }: IBorrowCollectionItemProps) {
	// const { data: pools } = useGetAllPools({ chainId, collectionAddress: data.address })
	let { data: pools } = useGetAllPools({ chainId, collectionAddress: data.address })
	const chainSymbol = chainConfig(chainId)?.nativeCurrency?.symbol
	const poolsWithLiquidity = pools?.filter((pool) => Number(pool.totalDeposited) / 1e18 > 0.01)
	const poolsTotalAvailableBalance =
		poolsWithLiquidity && poolsWithLiquidity?.map((pool) => Number(pool.poolBalance) / 1e18).reduce((a, b) => a + b, 0)
	const poolsMaxApr =
		poolsWithLiquidity &&
		poolsWithLiquidity.length > 0 &&
		Math.max(...poolsWithLiquidity.map((pool) => Number(pool.currentAnnualInterest) / 1e16))

	const floorPrice =
		pools && pools.length > 0 && pools[0].oraclePrice ? (Number(pools[0].oraclePrice) / 1e18).toFixed(2) : null

	//过滤掉日化利率小于2%的pool
	pools = pools?.filter((item, index) => {
		const dailyInterest = formatDailyInterest(item.currentAnnualInterest)
		return parseFloat(dailyInterest) >= 2
	})

	return (
		<li className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 pl-10 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[280px_repeat(3,_150px)_250px]">
			<div className="flex gap-4">
				<div className="flex flex-col justify-center">
					<div className="relative aspect-square min-h-[50px] w-full min-w-[50px]">
						{data.imgUrl === '' ? (
							<div className="aspect-square rounded-xl bg-[#22242A]"></div>
						) : (
							<img
								src={data.imgUrl + '?h=50&w=50'}
								height={50}
								width={50}
								alt={data.name}
								className="aspect-square rounded-xl"
							/>
						)}
					</div>
				</div>

				<div className="flex flex-col  justify-center">
					<h1 className="text-sm font-semibold ">{data.name}</h1>
					<p className="text-sm text-xs text-[#585858]">Collection</p>
				</div>
			</div>

			<div className={'flex flex-row items-center gap-2'}>
				<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgETH} alt="ImgETH" />
				<div className="flex flex-col justify-center">
					<h1 className="min-h-[1.5rem] text-sm">{floorPrice ? `${floorPrice} ${chainSymbol}` : ''}</h1>
					<p className="text-sm text-xs text-[#585858]">Floor</p>
				</div>
			</div>

			<div className={'flex flex-row items-center gap-2'}>
				<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgFire} alt="ImgFire" />
				<div className="flex flex-col justify-center">
					<h1 className="min-h-[1.5rem] text-sm">{poolsMaxApr ? `${poolsMaxApr.toFixed(2)}%` : ''}</h1>
					<p className="text-sm text-xs text-[#585858]">APR up to</p>
				</div>
			</div>

			<div className={'flex flex-row items-center gap-2'}>
				<Image style={{ cursor: 'pointer', width: '18px', height: '18px' }} src={ImgMoney} alt="ImgMoney" />
				<div className="flex flex-col justify-center">
					<h1 className="min-h-[1.5rem]">{pools?.length}</h1>
					<p className="text-sm text-[#585858]">Loans</p>
				</div>
			</div>

			<div className="col-span-2 mx-auto flex w-full flex-col justify-center md:col-span-1 md:mr-0">
				<Link
					style={{
						margin: '0 auto',
						padding: '20px 0',
						background: 'linear-gradient(90deg, #9747FF 0%, #3B82F6 100%)',
						borderRadius: '12px'
					}}
					className=" cus-button ml-auto flex h-4 min-w-[10rem] items-center justify-center gap-1 rounded-lg bg-[#3B82F6] p-4 text-sm text-white hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:text-opacity-50"
					href={`/collections/${chainName}/${data.address}`}

					// className="w-full min-w-[100px] rounded-xl bg-[#3B82F6] p-2 text-center text-sm text-[#ffffff]"
				>
					View Pools
				</Link>
			</div>
		</li>
	)
}

export function BorrowCollectionItemCard({ data, chainName }: IBorrowCollectionItemProps) {
	return (
		<li className="flex min-h-[300px] min-w-[240px] flex-col gap-4 rounded-xl bg-[#191919] p-4 shadow">
			<div className="relative -mx-4 -mt-4 aspect-square rounded-t-xl bg-[#22242A]">
				{data.imgUrl === '' ? (
					<div className="aspect-square rounded-t-xl bg-[#22242A]"></div>
				) : (
					<img
						src={data.imgUrl + '?h=260&w=260'}
						alt={data.name}
						height={260}
						width={260}
						className="aspect-square rounded-t-xl object-cover"
					/>
				)}
			</div>

			<h1>{data.name}</h1>

			<Link
				href={`/collections/${chainName}/${data.address}`}
				className="mt-auto rounded-xl bg-[#3B82F6] p-2 text-center text-sm"
			>
				View Pools
			</Link>
		</li>
	)
}
