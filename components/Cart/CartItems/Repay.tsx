import * as React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import Image from 'next/image'
import { useChainModal } from '@rainbow-me/rainbowkit'
import BeatLoader from '~/components/BeatLoader'
import ItemsPlaceholder from './Placeholder'
import { useGetCartItems, useSaveItemToCart } from '~/queries/useCart'
import { useRepay } from '~/queries/useRepay'
import { useGetLoans } from '~/queries/useLoans'
import { chainConfig } from '~/lib/constants'
import { getLoansPayableAmount } from '~/utils'
import type { IRepayItemProps } from '../types'
import type { ILoan } from '~/types'
import { formatErrorMsg } from './utils'
import BigNumber from 'bignumber.js'

export function RepayItems({ chainId, userAddress }: IRepayItemProps) {
	const { chain } = useNetwork()

	const config = chainConfig(chainId)

	const { openChainModal } = useChainModal()

	// check if user is on same network or else show switch network button and disable all write methods
	const isUserOnDifferentChain = chainId !== chain?.id

	const { address } = useAccount()

	// query to get cart items from local storage
	const {
		data: cartTokenIds,
		isLoading: fetchingCartItems,
		isError: errorLoadingCartItems
	} = useGetCartItems({ contractAddress: 'repay', chainId })

	const {
		data: loans,
		isLoading: fetchingLoans,
		isError: errorFetchingLoans
	} = useGetLoans({
		chainId,
		userAddress: address
	})

	const poolAddresses = new Set<string>()

	const cartItems =
		(cartTokenIds
			?.map((id) => {
				const loan = loans?.find((loan) => loan.id === id)

				if (!loan) return null

				poolAddresses.add(loan.pool.address)

				return loan
			})
			.filter((item) => !!item) as Array<ILoan>) ?? []

	// query to save/remove item to cart/localstorage
	const { mutate: saveItemToCart } = useSaveItemToCart({ chainId })

	const loansToRepay = Array.from(poolAddresses).map((pool) => ({
		pool,
		loans: cartItems
			.filter((item) => item.pool.address === pool)
			.map((item) => ({
				nft: item.nftId,
				interest: item.interest,
				startTime: item.startTime,
				borrowed: item.borrowed
			}))
	}))

	const totalAmout = new BigNumber(cartItems.reduce((acc, curr) => (acc += curr.toPay.total), 0)).div(1e18).toFixed(4)

	const payableAmout = getLoansPayableAmount(cartItems.reduce((acc, curr) => (acc += curr.toPay.total), 0))

	//query to repay loans
	const {
		write: repayLoans,
		isLoading: userConfirmingRepay,
		error: errorConfirmingRepay,
		waitForTransaction: { data: repayTxOnChain, isLoading: checkingForRepayTxOnChain, error: txRepayErrorOnChain }
	} = useRepay({
		payableAmout,
		loansToRepay,
		enabled: loansToRepay.length > 0,
		chainId
	})

	// construct error messages
	// Failed queries, but user can't retry with data of these queries
	const errorMsgOfQueries = errorLoadingCartItems
		? "Couldn't fetch items in your cart"
		: errorFetchingLoans
		? "Couldn't fetch items in your cart"
		: null

	// Failed queries, but user can retry
	const errorMsgOfEthersQueries: string | null = errorConfirmingRepay
		? formatErrorMsg(errorConfirmingRepay.message)
		: repayTxOnChain?.status === 0
		? 'Transaction failed, please try again'
		: txRepayErrorOnChain
		? txRepayErrorOnChain.message
		: null

	// check all loading states to show beat loader
	const isLoading = fetchingCartItems || fetchingLoans || userConfirmingRepay || checkingForRepayTxOnChain

	const chainSymbol = config.nativeCurrency?.symbol ?? 'ETH'

	const isCartEmpty = (cartTokenIds && cartTokenIds.length <= 0) || address !== userAddress

	return (
		<>
			{errorMsgOfQueries ? (
				<p className="mt-5 mb-9 p-6 text-center text-sm text-[#ff9393] xl:mt-[60%]">{errorMsgOfQueries}</p>
			) : isCartEmpty ? (
				<p className="mt-8 mb-9 p-6 text-center xl:mt-[60%]">Your cart is empty.</p>
			) : (
				<>
					{/* Show placeholder when fetching items in cart */}
					{fetchingCartItems || fetchingLoans ? (
						<ItemsPlaceholder />
					) : (
						<ul className="flex flex-col gap-4">
							{cartItems?.map(({ id, imgUrl, toPay, pool }) => (
								<li key={id} className="relative isolate flex items-center gap-1.5 rounded-xl text-sm font-medium">
									<button
										className="absolute -top-2 -left-1.5 z-10 h-5 w-5 rounded-xl bg-white p-1 text-black transition-[1.125s_ease]"
										onClick={() => saveItemToCart({ tokenId: id, contractAddress: 'repay' })}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
										<span className="sr-only">Remove Item from cart</span>
									</button>

									<div className="relative aspect-square h-10 w-10 rounded bg-[#f0f0f0]">
										{imgUrl !== '' && <Image src={imgUrl} fill alt="" className="aspect-square rounded" />}
									</div>

									<span className="flex flex-col flex-wrap justify-between gap-1">
										<span>{`${id.slice(0, 4) + '...' + id.slice(-3)}`}</span>
										<span className="font-base text-[0.8rem] text-[#000000]">{pool.name}</span>
									</span>

									<span className="ml-auto flex gap-1.5">
										<Image
											src="/assets/ethereum.png"
											height={16}
											width={16}
											className="object-contain"
											alt="ethereum"
										/>
										<span>{(toPay.total / 1e18).toFixed(4)}</span>
									</span>
								</li>
							))}
						</ul>
					)}

					<hr className="border-[rgba(255,255,255,0.08)]" />

					<h2 className="flex items-center">
						<span className="font-base text-[#000000]">Total</span>
						<span className="ml-auto flex gap-1.5">
							<Image src="/assets/ethereum.png" height={16} width={16} className="object-contain" alt="ethereum" />
							{/* Show placeholder when fetching quotation */}
							{fetchingCartItems || fetchingLoans ? (
								<span className="placeholder-box h-4 w-[4ch]" style={{ width: '4ch', height: '16px' }}></span>
							) : (
								<span>
									{totalAmout} {chainSymbol}
								</span>
							)}
						</span>
					</h2>

					<h2 className="flex items-center">
						<span className="font-base text-[#000000]">Buffer (5%)</span>
						<span className="ml-auto flex gap-1.5">
							<Image src="/assets/ethereum.png" height={16} width={16} className="object-contain" alt="ethereum" />
							{/* Show placeholder when fetching quotation */}
							{fetchingCartItems || fetchingLoans ? (
								<span className="placeholder-box h-4 w-[4ch]" style={{ width: '4ch', height: '16px' }}></span>
							) : (
								<span>
									{new BigNumber(totalAmout).times(0.05).toFixed(4)} {chainSymbol}
								</span>
							)}
						</span>
					</h2>
					<small className="-mt-3 font-extralight">
						We add a small buffer to account for the interest accrued from the time when transaction is sent to when it
						is included on-chain (eg: if tx stays for 1 hour in the mempool it will need to pay interest for 1 extra
						hour). All excess ETH is returned automatically in the repayment tx.
					</small>

					<h2 className="flex items-center">
						<span className="font-base text-[#000000]">Total Payable</span>
						<span className="ml-auto flex gap-1.5">
							<Image src="/assets/ethereum.png" height={16} width={16} className="object-contain" alt="ethereum" />
							{/* Show placeholder when fetching quotation */}
							{fetchingCartItems || fetchingLoans ? (
								<span className="placeholder-box h-4 w-[4ch]" style={{ width: '4ch', height: '16px' }}></span>
							) : (
								<span>
									{new BigNumber(payableAmout).div(1e18).toFixed(4)} {chainSymbol}
								</span>
							)}
						</span>
					</h2>

					{/* Show error message of txs/queries initiated with wallet */}
					{errorMsgOfEthersQueries && !errorMsgOfEthersQueries.startsWith('user rejected transaction') && (
						<p className="mt-5 text-center text-sm text-[#ff9393]">
							{errorMsgOfEthersQueries.slice(0, 150)}
							{errorMsgOfEthersQueries.length > 150 ? '...' : ''}
						</p>
					)}

					{isLoading ? (
						<button
							className="mt-5 rounded-lg bg-blue-500 p-2 shadow disabled:cursor-not-allowed disabled:text-opacity-50"
							disabled
						>
							<BeatLoader />
						</button>
					) : isUserOnDifferentChain ? (
						<button
							className="mt-5 rounded-lg bg-blue-500 p-2 shadow disabled:cursor-not-allowed disabled:text-opacity-50"
							onClick={openChainModal}
						>
							Switch Network
						</button>
					) : (
						<button
							className="mt-5 rounded-lg bg-blue-500 text-[#ffffff] p-2 shadow disabled:cursor-not-allowed disabled:text-[#f0f0f0]"
							disabled={!repayLoans}
							onClick={() => repayLoans?.()}
						>
							Confirm Repay
						</button>
					)}
				</>
			)}
		</>
	)
}
