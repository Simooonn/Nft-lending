import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '~/components/Layout'
import Image from 'next/image'
import Home1 from '~/public/assets/img/homm1.jpg'
import Home2 from '~/public/assets/img/home2.png'
import Home3 from '~/public/assets/img/home3.png'
import HomeIcon1 from '~/public/assets/img/home-icon1.png'
import HomeIcon2 from '~/public/assets/img/home-icon2.png'
import HomeIcon3 from '~/public/assets/img/home-icon3.png'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import 'animate.css'

export default function Home() {
	useEffect(() => {}, [])

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Layout>
				{/* <div className="home_background"></div> */}
				<div className="Desktop xsm:p-2 sm:p-2 md:p-0">
					<div className={'home_background1 pt-[100px]'}>
						<div className={'introduce mx-auto sm:w-full md:w-4/5'}>
							<div className={'introduce-desc home_background1_title1'}>
								<div className="text-center font-bold xsm:text-3xl xsm:leading-snug sm:text-3xl sm:leading-snug md:text-5xl md:leading-snug">
									<div>《元宇宙+历史人物交互场景解决方案》</div>
									{/*<div>Trading Platform for NFTs!</div>*/}
								</div>
								{/*<div className="my-8 text-center text-[#D7EAFF;]">*/}
								{/*	<div>With our platform, you can purchase a larger amount of NFTs</div>*/}
								{/*	<div>than you could ever imagine.</div>*/}
								{/*</div>*/}
								<Image className="mx-auto mt-[50px] w-3/5 " src={Home1} alt="IconTwitter" />
							</div>
						</div>
					</div>

					{/*<div className={'home_background2'}>*/}
					{/*	<div className={'introduce mx-auto sm:w-full md:w-4/5'}>*/}
					{/*		<div className="leverage mt-20">*/}
					{/*			<div className="mb-5 text-center">*/}
					{/*				<span className="inline-block rounded-lg border border-blue-300 bg-blue-100	px-5 py-1 text-blue-800">*/}
					{/*					Leverage Trading*/}
					{/*				</span>*/}
					{/*			</div>*/}
					{/*			<div className="text-center text-3xl font-bold text-[#283082]">Leverage Trading Platform</div>*/}
					{/*			<div className="my-8 text-center">*/}
					{/*				<div>Our leverage trading platform enables you to amplify your profits</div>*/}
					{/*				<div>and diversify your portfolio across different NFT collections.</div>*/}
					{/*			</div>*/}

					{/*			<div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-4">*/}
					{/*				<div className="rounded-3xl px-5 py-8 shadow-xl">*/}
					{/*					<div className="title mb-3 font-bold text-purple-700">*/}
					{/*						Amplify Your Profits with NFT Leverage Trading*/}
					{/*					</div>*/}
					{/*					<div className="text-sm">*/}
					{/*						Diversify your portfolio and maximize your returns with our leverage trading platform for NFT*/}
					{/*						collections.*/}
					{/*					</div>*/}
					{/*				</div>*/}

					{/*				<div className="rounded-3xl px-5 py-8 shadow-xl">*/}
					{/*					<div className="title mb-3 font-bold text-purple-700">Gain More Exposure to the NFT Market</div>*/}
					{/*					<div className="text-sm">*/}
					{/*						Our leverage trading platform is designed to give you the edge you need in the competitive NFT*/}
					{/*						market, allowing you to capitalize on market trends.*/}
					{/*					</div>*/}
					{/*				</div>*/}

					{/*				<div className="rounded-3xl px-5 py-8 shadow-xl">*/}
					{/*					<div className="title mb-3 font-bold text-purple-700">*/}
					{/*						Magnify Your Returns with Up to 5x Leverage*/}
					{/*					</div>*/}
					{/*					<div className="text-sm">*/}
					{/*						Our NFT leverage trading platform enables you to magnify your returns by up to 5x, increasing your*/}
					{/*						investment potential and helping you achieve your financial goals.*/}
					{/*					</div>*/}
					{/*				</div>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*</div>*/}

					{/*<div className={'adaptable home_background3'}>*/}
					{/*	<div className="mx-auto xsm:w-full sm:w-full md:flex md:w-4/5 md:justify-between">*/}
					{/*		<div className="xsm:w-full xsm:py-10 sm:w-full sm:py-10 md:w-1/2 md:py-40">*/}
					{/*			<div className="mb-5 xsm:text-left sm:text-left">*/}
					{/*				<span*/}
					{/*					style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '16px' }}*/}
					{/*					className="inline-block rounded-lg border border-blue-300 bg-blue-100	px-5 py-1 text-blue-800"*/}
					{/*				>*/}
					{/*					Adaptable NFT Trading*/}
					{/*				</span>*/}
					{/*			</div>*/}
					{/*			<div className="mb-10 text-3xl font-bold text-[#283082] xsm:text-left sm:text-left">*/}
					{/*				Customizable Trading Platform*/}
					{/*			</div>*/}
					{/*			<div>*/}
					{/*				Our platform is easy to use and fully customizable to suit your specific needs. You can choose the*/}
					{/*				amount of leverage you wish to use and manage your portfolio with ease.*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*		<div className="relative xsm:flex xsm:w-full xsm:justify-center xsm:pb-10 sm:flex sm:w-full sm:justify-center sm:pb-10 md:w-1/3">*/}
					{/*			<Image*/}
					{/*				className="md:w-200 xsm:w-4/5 sm:w-4/5  md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2"*/}
					{/*				src={Home2}*/}
					{/*				alt="IconTwitter"*/}
					{/*			/>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*</div>*/}

					{/*<div className={'expert home_background4 mx-auto w-4/5  pt-[87px]'}>*/}
					{/*	<div className="mb-5 text-center">*/}
					{/*		<span*/}
					{/*			style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '16px' }}*/}
					{/*			className="inline-block rounded-lg border border-blue-300 bg-blue-100	px-5 py-1 text-blue-800"*/}
					{/*		>*/}
					{/*			Leverage Trading*/}
					{/*		</span>*/}
					{/*	</div>*/}
					{/*	<div className="flex flex-col gap-3 text-center text-3xl font-bold text-[#283082]">*/}
					{/*		<div>Expert Support for Your NFT</div>*/}
					{/*		<div>Leverage Trading</div>*/}
					{/*	</div>*/}
					{/*	<div className="my-8 text-center">*/}
					{/*		<div>Our team of experts is always available to provide you with</div>*/}
					{/*		<div>support and advice, ensuring that you have the best possible</div>*/}
					{/*		<div>experience when using our leverage trading platform for NFTs.</div>*/}
					{/*	</div>*/}
					{/*	<Image className="mx-auto md:w-3/5" src={Home3} alt="IconTwitter" />*/}

					{/*	<div className={'connect mx-auto mt-10 mt-[76px] xsm:w-full sm:w-full md:w-4/5'}>*/}
					{/*		<div className="home_background4_bg mx-auto rounded-3xl border border-blue-300 bg-[#ffffff] px-12 py-10 text-center shadow-xl xsm:w-full sm:w-full md:w-3/5">*/}
					{/*			<div className="mb-5 text-2xl font-bold text-[#283082]">Log In With Your Crypto Wallet</div>*/}
					{/*			<div>*/}
					{/*				<div>Log in with your crypto wallet for our leverage trading platform</div>*/}
					{/*				<div>today and take your NFT investment game to the next level!</div>*/}
					{/*			</div>*/}
					{/*			<div className="mt-5 flex justify-center">*/}
					{/*				/!*<ConnectButton />*!/*/}
					{/*				<div className={'home_background4_btn'}>Connect Wallet</div>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</div>

				{/*<div className=" Mobile xsm:p-2 sm:p-2 md:p-0">*/}
				{/*	<div className={' pt-[100px]'}>*/}
				{/*		<div className={'introduce mx-auto sm:w-full md:w-4/5'}>*/}
				{/*			<div className={'introduce-desc '}>*/}
				{/*				<div className="text-center font-bold text-[#000D70] xsm:text-3xl xsm:leading-snug sm:text-3xl sm:leading-snug md:text-5xl md:leading-snug">*/}
				{/*					<div>Introducing Our Cutting-Edge Leverage</div>*/}
				{/*					<div>Trading Platform for NFTs!</div>*/}
				{/*				</div>*/}
				{/*				<div className="my-8 text-center font-medium">*/}
				{/*					<div>With our platform, you can purchase </div>*/}
				{/*					<div>a larger amount of NFTs than you</div>*/}
				{/*					<div> could ever imagine.</div>*/}
				{/*				</div>*/}
				{/*				<Image className="px-1 " src={Home1} alt="IconTwitter" />*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}

				{/*	<div className={''}>*/}
				{/*		<div className={'introduce mx-auto sm:w-full md:w-4/5'}>*/}
				{/*			<div className="leverage mt-20">*/}
				{/*				<div className="mb-5 text-center">*/}
				{/*					<span className="inline-block rounded-lg border border-blue-300 bg-blue-100 px-10	px-5 py-1 text-blue-800">*/}
				{/*						Leverage Trading*/}
				{/*					</span>*/}
				{/*				</div>*/}
				{/*				<div className="text-center text-2xl font-bold text-[#283082]">Leverage Trading Platform</div>*/}
				{/*				<div className="my-8 text-center">*/}
				{/*					<div>Our leverage trading platform enables you to</div>*/}
				{/*					<div>amplify your profits and diversify your portfolio</div>*/}
				{/*					<div> across different NFT collections.</div>*/}
				{/*				</div>*/}

				{/*				<div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-4">*/}
				{/*					<div className="rounded-3xl px-5 py-8 shadow-xl">*/}
				{/*						<Image width={48} height={48} className="" src={HomeIcon1} alt="IconTwitter" />*/}

				{/*						<div className="title font-bold text-purple-700">Amplify Your Profits with NFT</div>*/}
				{/*						<div className="title mb-3 font-bold text-purple-700">Leverage Trading</div>*/}
				{/*						<div className="text-sm">Diversify your portfolio and maximize your</div>*/}
				{/*						<div className="text-sm">returns with our leverage trading platform</div>*/}
				{/*						<div className="text-sm">for NFT collections.</div>*/}
				{/*					</div>*/}

				{/*					<div className="rounded-3xl px-5 py-8 shadow-xl">*/}
				{/*						<Image width={48} height={48} className="pt-2" src={HomeIcon2} alt="IconTwitter" />*/}

				{/*						<div className="title font-bold text-purple-700">Gain More Exposure to the</div>*/}
				{/*						<div className="title mb-3 font-bold text-purple-700">NFT Market</div>*/}
				{/*						<div className="text-sm">Our leverage trading platform is designed</div>*/}
				{/*						<div className="text-sm">to give you the edge you need in the</div>*/}
				{/*						<div className="text-sm">competitive NFT market, allowing you to</div>*/}
				{/*						<div className="text-sm">capitalize on market trends.</div>*/}
				{/*					</div>*/}

				{/*					<div className="rounded-3xl px-5 py-8 shadow-xl">*/}
				{/*						<Image width={48} height={48} className="pt-2" src={HomeIcon3} alt="IconTwitter" />*/}

				{/*						<div className="title font-bold text-purple-700">Magnify Your Returns with</div>*/}
				{/*						<div className="title mb-3 font-bold text-purple-700">Up to 5x Leverage</div>*/}
				{/*						<div className="text-sm">*/}
				{/*							Our NFT leverage trading platform enables you to magnify your returns by up to 5x, increasing your*/}
				{/*							investment potential and helping you achieve your financial goals.*/}
				{/*						</div>*/}
				{/*					</div>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}

				{/*	<div className={'adaptable '}>*/}
				{/*		<div className="mx-auto xsm:w-full sm:w-full md:flex md:w-4/5 md:justify-between">*/}
				{/*			<div className="xsm:w-full xsm:py-10 sm:w-full sm:py-10 md:w-1/2 md:py-40">*/}
				{/*				<div className="mb-5 xsm:text-left sm:text-left">*/}
				{/*					<span*/}
				{/*						style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '16px' }}*/}
				{/*						className="inline-block rounded-lg border border-blue-300 bg-blue-100	px-5 py-1 text-blue-800"*/}
				{/*					>*/}
				{/*						Adaptable NFT Trading*/}
				{/*					</span>*/}
				{/*				</div>*/}
				{/*				<div className="mb-10 text-3xl font-bold text-[#283082] xsm:text-left sm:text-left">*/}
				{/*					Customizable Trading Platform*/}
				{/*				</div>*/}
				{/*				<div>*/}
				{/*					Our platform is easy to use and fully customizable to suit your specific needs. You can choose the*/}
				{/*					amount of leverage you wish to use and manage your portfolio with ease.*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<div className="relative xsm:flex xsm:w-full xsm:justify-center xsm:pb-10 sm:flex sm:w-full sm:justify-center sm:pb-10 md:w-1/3">*/}
				{/*				<Image*/}
				{/*					className="md:w-200 xsm:w-4/5 sm:w-4/5  md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2"*/}
				{/*					src={Home2}*/}
				{/*					alt="IconTwitter"*/}
				{/*				/>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}

				{/*	<div className={'expert mx-auto  pt-[60px]'}>*/}
				{/*		<div className="mb-5 text-center">*/}
				{/*			<span*/}
				{/*				style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '16px' }}*/}
				{/*				className="inline-block rounded-lg border border-blue-300 bg-blue-100	px-5 py-1 text-blue-800"*/}
				{/*			>*/}
				{/*				Leverage Trading*/}
				{/*			</span>*/}
				{/*		</div>*/}
				{/*		<div className="flex flex-col gap-1 text-center text-3xl font-bold text-[#283082]">*/}
				{/*			<div>Expert Support for Your </div>*/}
				{/*			<div>NFT Leverage Trading</div>*/}
				{/*		</div>*/}
				{/*		<div className="my-8 text-center">*/}
				{/*			<div>Our team of experts is always available to </div>*/}
				{/*			<div>provide you with support and advice, </div>*/}
				{/*			<div>ensuring that you have the best possible </div>*/}
				{/*			<div>experience when using our leverage trading .</div>*/}
				{/*			<div>platform for NFTs.</div>*/}
				{/*		</div>*/}
				{/*		<Image className="mx-auto md:w-3/5" src={Home3} alt="IconTwitter" />*/}

				{/*		<div className={'connect mx-auto mt-10 mt-[76px] px-1 xsm:w-full sm:w-full md:w-4/5'}>*/}
				{/*			<div className="home_background4_bg mx-auto rounded-3xl border border-blue-300 bg-[#ffffff] px-12 py-10 text-center shadow-xl xsm:w-full sm:w-full md:w-3/5">*/}
				{/*				<div className=" text-2xl font-bold text-[#283082]">Log In With Your </div>*/}
				{/*				<div className="mb-5 text-2xl font-bold text-[#283082]">Crypto Wallet</div>*/}
				{/*				<div>*/}
				{/*					<div>Log in with your crypto wallet for our leverage trading platform</div>*/}
				{/*					<div>today and take your NFT investment game to the next level!</div>*/}
				{/*				</div>*/}
				{/*				<div className="mt-5 flex justify-center">*/}
				{/*					/!*<ConnectButton />*!/*/}
				{/*					<div className={'home_background4_btn'}>Connect Wallet</div>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</Layout>
		</>
	)
}
