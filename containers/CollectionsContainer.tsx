import Head from 'next/head'
import { useRouter } from 'next/router'
import { BorrowCollectionItemCard, BorrowCollectionItemList } from '~/components/Collection'
import Layout from '~/components/Layout'
import { useGetAllCollections } from '~/queries/useGetAllCollections'
import { ICollection } from '~/types'

interface ICollectionContainerProps {
	chainId: number
	chainName: string
}

interface ICollections extends ICollectionContainerProps {
	data?: ICollection[]
}

const Collections = ({ chainId, chainName, data }: ICollections) => {
	const router = useRouter()

	const { view } = router.query
	return (
		<>
			<div
				className="Desktop rounded-lg bg-[#ffffff]"
				style={{ margin: '0 10%', boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)' }}
			>
				<div className="flex min-h-[80px] items-center p-4 pl-10 text-xl font-semibold shadow">
					<div>NFT collections</div>
				</div>
				<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
					<li className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 pl-10 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[280px_repeat(3,_150px)_250px]">
						{/*<div className="flex gap-4">*/}
						{/*	<div className="hidden md:block">*/}
						{/*		<h1 className="font-semibold">Collections</h1>*/}
						{/*	</div>*/}
						{/*</div>*/}
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">Collections</h1>
						</div>
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">Currency</h1>
						</div>
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">APR Up To</h1>
						</div>
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">Total Loans</h1>
						</div>
						<div className="flex flex-col items-center justify-center">
							<h1 className="min-h-[1.5rem]">Actions</h1>
						</div>
					</li>
				</ul>

				<ul className="mb-9 flex flex-col overflow-x-auto rounded-xl">
					{data?.map((item) => (
						<BorrowCollectionItemList key={item.address} data={item} chainId={chainId} chainName={chainName} />
					))}
				</ul>
			</div>

			<div
				className=" Mobile bg-[#ffffff]"
				style={{ boxShadow: '0px 3px 8px rgba(9, 30, 66, 0.16), 0px 0px 1px rgba(9, 30, 66, 0.31)' }}
			>
				<div className="flex min-h-[80px] items-center p-4 text-xl font-semibold shadow">
					<div>NFT collections</div>
				</div>
				<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
					<li className="grid min-h-[60px] grid-cols-2 justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[240px_repeat(4,_120px)]  xl:grid-cols-[360px_repeat(3,_150px)_240px]">
						{/*<div className="flex gap-4">*/}
						{/*	<div className="hidden md:block">*/}
						{/*		<h1 className="font-semibold">Collections</h1>*/}
						{/*	</div>*/}
						{/*</div>*/}
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">Collections</h1>
						</div>
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">Currency</h1>
						</div>
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">APR Up To</h1>
						</div>
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">Total Loans</h1>
						</div>
						<div className="flex flex-col justify-center">
							<h1 className="min-h-[1.5rem]">Actions</h1>
						</div>
					</li>
				</ul>

				<ul className="mb-9 flex flex-col overflow-x-auto rounded-xl">
					{data?.map((item) => (
						<BorrowCollectionItemList key={item.address} data={item} chainId={chainId} chainName={chainName} />
					))}
				</ul>
			</div>
		</>
	)
}

const CollectionsContainer = ({ chainId, chainName }: ICollectionContainerProps) => {
	const { data: collections } = useGetAllCollections({ chainId })

	return (
		<>
			<Head>
				<title>Borrow - ProTradex</title>
			</Head>

			<Layout>
				{!chainId || !chainName ? (
					<p className="fallback-text">Network not supported. No pools on {chainName || 'this network'}.</p>
				) : collections?.length === 0 ? (
					<p className="fallback-text">There are no collections on {chainName || 'this'} network.</p>
				) : (
					<>
						{/*<ViewTypeSwitch />*/}

						<Collections chainId={chainId} chainName={chainName} data={collections} />
					</>
				)}
			</Layout>
		</>
	)
}

export default CollectionsContainer
