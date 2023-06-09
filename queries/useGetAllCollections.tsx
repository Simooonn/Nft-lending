import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'ethers/lib/utils'
import BigNumber from 'bignumber.js'
import { getAllPoolsNameAndDeposits } from './useGetAllPools'
import verifiedCollections, { tokenListToCollection } from '~/lib/collections'
import type { ICollection } from '~/types'
import { getNftTokenList } from './useGetNftTokenList'
import { NFT_LIST_URL_PREFIX } from '~/lib/constants'

export async function getAllCollections({ chainId }: { chainId?: number | null }) {
	console.log('chainId',chainId);
	const pools = await getAllPoolsNameAndDeposits({ chainId })
	console.log('aa');

	const collections: Array<{ address: string; name: string; totalDeposited: string }> = []

	pools.forEach((pool) => {
		const index = collections.findIndex((col) => col.address.toLowerCase() === pool.nftContract.toLowerCase())

		if (index >= 0) {
			collections[index] = {
				...collections[index],
				totalDeposited: new BigNumber(collections[index].totalDeposited).plus(pool.totalDeposited).toFixed(0, 1)
			}
		} else {
			collections.push({
				address: getAddress(pool.nftContract),
				name: pool.collectionName,
				totalDeposited: pool.totalDeposited
			})
		}
	})

	const nftTokenListCollections = tokenListToCollection(await getNftTokenList())

	const verified: Array<ICollection> = []

	const notVerified: Array<ICollection> = []

	Array.from(collections).forEach(({ address, totalDeposited, name: collectionName }) => {
		const verifiedCollectionIndex = verifiedCollections[chainId || 1].findIndex(
			(collectionAddress) => collectionAddress.toLowerCase() == address.toLowerCase()
		)
		const nftTokenListCollection =
			nftTokenListCollections &&
			nftTokenListCollections[chainId || 1].find((x) => x.address.toLowerCase() === address.toLowerCase())
		const name = nftTokenListCollection?.name ?? collectionName
		const imgUrl = nftTokenListCollection?.imgUrl ?? `${NFT_LIST_URL_PREFIX}/${address.toLowerCase()}`

		if (verifiedCollectionIndex + 1) {
			verified.push({
				address,
				name,
				imgUrl,
				sortIndex: verifiedCollectionIndex + 1,
				totalDeposited
			})
		} else {
			notVerified.push({
				address,
				name,
				totalDeposited,
				imgUrl,
				sortIndex: -1
			})
		}
	})

	return [...verified.sort((a, b) => a.sortIndex - b.sortIndex), ...notVerified].sort(
		(a, b) => Number(b.totalDeposited) - Number(a.totalDeposited)
	)
}

export function useGetAllCollections({ chainId }: { chainId?: number | null }) {
	return useQuery(
		['allCollections', chainId],
		() =>
			getAllCollections({
				chainId
			}),
		{
			refetchInterval: 30_000
		}
	)
}
