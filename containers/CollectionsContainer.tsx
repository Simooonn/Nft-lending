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
		<div className="rounded-xl bg-[#ffffff]">
			<div className="flex min-h-[80px] items-center p-4 text-xl font-semibold shadow">
				<div>NFT collections</div>
			</div>
			<ul className="flex flex-col overflow-x-auto bg-[#EFF6FF] shadow">
				<li className="grid min-h-[60px] grid-cols-3 justify-between gap-4 p-4 text-lg font-medium shadow md:grid-cols-[280px_repeat(5,_120px)] xl:grid-cols-[360px_repeat(5,_120px)]">
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
						<h1 className="min-h-[1.5rem]">Currency</h1>
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
	)
	// const isListView = view === 'list'
	//
	// if (isListView) {
	// 	return (
	// 		<ul className="mb-9 flex flex-col overflow-x-auto rounded-xl bg-[#191919]">
	// 			{data?.map((item) => (
	// 				<BorrowCollectionItemList key={item.address} data={item} chainId={chainId} chainName={chainName} />
	// 			))}
	// 		</ul>
	// 	)
	// }
	//
	// return (
	// 	<ul className="mx-0 mb-9 grid grid-cols-[repeat(auto-fit,minmax(240px,260px))] place-content-around gap-8 2xl:place-content-between">
	// 		{data?.map((item) => (
	// 			<BorrowCollectionItemCard key={item.address} data={item} chainName={chainName} />
	// 		))}
	// 	</ul>
	// )
}

// const ViewTypeSwitch = () => {
// 	const router = useRouter()
//
// 	const { view } = router.query
//
// 	const isListView = view === 'list'
//
// 	const handleClick = () =>
// 		router.push(
// 			{ pathname: router.pathname, query: { ...router.query, view: isListView ? 'card' : 'list' } },
// 			undefined,
// 			{ shallow: true }
// 		)
//
// 	return (
// 		<div className="mt-8 flex items-center justify-end">
// 			<div className="inline-flex pb-2" role="group">
// 				<button
// 					className={`rounded-l border-2 border-white px-2 py-1 text-xs font-medium ${
// 						!isListView && 'bg-white text-black'
// 					}`}
// 					onClick={handleClick}
// 				>
// 					Grid
// 				</button>
// 				<button
// 					className={`rounded-r border-2 border-white px-2 py-1 text-xs font-medium ${
// 						isListView && 'bg-white text-black'
// 					}`}
// 					onClick={handleClick}
// 				>
// 					List
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

const CollectionsContainer = ({ chainId, chainName }: ICollectionContainerProps) => {
	const { data: collections } = useGetAllCollections({ chainId })
	console.log('collections-console', collections)

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
