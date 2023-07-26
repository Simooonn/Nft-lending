import * as React from 'react'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { cx } from 'cva'
import { DashboardLinks } from './DashboardLinks'
import Menu from './Menu'
import { CartLink } from './CartLink'
import Notifications from './Notifications'
import useAutoConnect from '~/hooks/useAutoConnect'
import styles from '~/styles/layout.module.css'
import Image from 'next/image'
import ImgLogo1 from '~/public/assets/pro-logo1.png'
import IconDiscord from '~/public/assets/img/icon-discord.png'
import IconEmail from '~/public/assets/img/icon-email.png'
import IconGithub from '~/public/assets/img/icon-github.png'
import IconTwitter from '~/public/assets/img/icon-twitter.png'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ConnectButtonNew } from '~/components/Layout/ConnectButtonNew'

interface ILayoutProps {
	children?: React.ReactNode
	style?: React.CSSProperties
	className?: string
}

function AppFooterLink({ name, path }: { name: string; path: string }) {
	const { pathname } = useRouter()

	const isActive =
		pathname === path ||
		// (pathname.startsWith('/') && path === '/') ||
		// (pathname.startsWith('/borrow') && path === '/borrow') ||
		// (pathname.startsWith('/repay') && path === '/repay') ||
		(pathname.startsWith('/collection') && path === '/')

	return (
		<Link href={path} className={isActive ? 'font-semibold' : ''}>
			{name}
		</Link>
	)
}

export default function Layout({ children, className, ...props }: ILayoutProps) {
	useAutoConnect()

	return (
		<>
			<Head>
				<title>元宇宙+历史人物交互场景解决方案</title>
				<meta name="description" content="NFT-collateralized loans for long tail markets." />
			</Head>

			<header className={'mx-auto flex w-full flex-row flex-wrap items-center justify-between gap-4 bg-[#ffffff] p-4 '}>
				<DashboardLinks />

				<ConnectButton />
				{/*<ConnectButtonNew  />*/}

				<span className="max-[445px]:ml-auto flex items-center justify-end gap-3">
					{/*<Notifications />*/}
					{/*<CartLink />*/}
					{/*<Menu />*/}
				</span>
			</header>

			<React.Suspense fallback={null}>
				<main
					// style={{background:'url(/assets/background.png) no-repeat',backgroundSize:'100% 100%'}}
					className={cx('mx-auto flex min-h-full w-full flex-1 flex-col pt-3', className)}
					{...props}
				>
					{children}
				</main>
			</React.Suspense>
			{/*<div className="Desktop mx-auto xsm:mt-20 xsm:w-full xsm:p-2 sm:mt-20 sm:w-full sm:p-2 md:mt-40 md:w-4/5 ">*/}
			{/*	<div className={'md:flex md:justify-between'}>*/}
			{/*		<div className={'md:flex md:w-1/3 md:flex-col md:gap-3'}>*/}
			{/*			<Image height={100} width={217} src={ImgLogo1} alt="ImgCopy" className="xsm:mx-auto  sm:mx-auto" />*/}
			{/*			<div className={'xsm:mt-5 xsm:text-center sm:mb-5 sm:text-center md:flex md:flex-col md:gap-0.5'}>*/}
			{/*				<div>With our platform, you can purchase a larger</div>*/}
			{/*				<div> amount of NFTs than you could ever imagine. </div>*/}
			{/*			</div>*/}
			{/*		</div>*/}

			{/*		<div className={'md:flex md:w-1/3 md:flex-col md:gap-3'}>*/}
			{/*			<div className={'foot_some_text flex h-[57px] items-center justify-center font-semibold'}>Some Text</div>*/}
			{/*			<div className={'xsm:mt-5 xsm:text-center sm:mb-5 sm:text-center md:flex md:flex-col md:gap-0.5'}>*/}
			{/*				<div>Our leverage trading platform enables you to</div>*/}
			{/*				<div>amplify your profits and diversify your portfolio </div>*/}
			{/*				<div>across different NFT collections. </div>*/}
			{/*			</div>*/}
			{/*		</div>*/}

			{/*		<div className={'md:flex md:w-1/3 md:flex-col md:gap-3'}>*/}
			{/*			<div className={'flex flex-col gap-1 pl-10'}>*/}
			{/*				<div className={'text-[#2D7AF9] xsm:mb-1 sm:mb-1'}>Join the community</div>*/}
			{/*				<div className={'text-2xl font-semibold text-[#5865F2]'}>Follow our channels</div>*/}
			{/*			</div>*/}
			{/*			<div*/}
			{/*				className={*/}
			{/*					'flex flex-row gap-10  text-sm text-[#000A77] xsm:mt-5 xsm:justify-around sm:mt-5 sm:justify-around'*/}
			{/*				}*/}
			{/*			>*/}
			{/*				<div className={'flex flex-col gap-8'}>*/}
			{/*					<div*/}
			{/*						className={'cursor_pointer flex flex-row items-center gap-3'}*/}
			{/*						onClick={() => (window.location.href = 'https://discord.com/invite/protradex')}*/}
			{/*					>*/}
			{/*						<Image height={32} width={32} src={IconDiscord} alt="IconDiscord" />*/}
			{/*						<div>Discord</div>*/}
			{/*					</div>*/}
			{/*					<div*/}
			{/*						onClick={() => (window.location.href = 'https://github.com/Protradex')}*/}
			{/*						className={'cursor_pointer flex flex-row items-center gap-3'}*/}
			{/*					>*/}
			{/*						<Image height={32} width={32} src={IconGithub} alt="IconGithub" />*/}
			{/*						<div>Github</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*				<div className={'flex flex-col gap-8'}>*/}
			{/*					<div*/}
			{/*						onClick={() => (window.location.href = 'https://twitter.com/Pro_Tradex')}*/}
			{/*						className={'cursor_pointer flex flex-row items-center gap-3'}*/}
			{/*					>*/}
			{/*						<Image height={32} width={32} src={IconTwitter} alt="IconTwitter" />*/}
			{/*						<div>Twitter</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}

			{/*<div className="Mobile xsm:mt-20 xsm:w-full xsm:p-2 sm:mt-20 sm:w-full sm:p-2 md:mt-40 md:w-4/5 ">*/}
			{/*	<div className={'md:flex md:justify-between'}>*/}
			{/*		<div className={'md:flex md:w-1/3 md:flex-col md:gap-3'}>*/}
			{/*			<Image height={100} width={217} src={ImgLogo1} alt="ImgCopy" className="xsm:mx-auto  sm:mx-auto" />*/}
			{/*			<div className={'xsm:mt-5 xsm:text-center sm:mb-5 sm:text-center md:flex md:flex-col md:gap-0.5'}>*/}
			{/*				<div>With our platform, you can purchase a larger</div>*/}
			{/*				<div> amount of NFTs than you could ever imagine. </div>*/}
			{/*			</div>*/}
			{/*		</div>*/}

			{/*		<div className={'md:flex md:w-1/3 md:flex-col md:gap-3'}>*/}
			{/*			<div className={'foot_some_text flex h-[57px] items-center justify-center font-semibold'}>Some Text</div>*/}
			{/*			<div className={'xsm:mt-5 xsm:text-center sm:mb-5 sm:text-center md:flex md:flex-col md:gap-0.5'}>*/}
			{/*				<div>Our leverage trading platform enables you to</div>*/}
			{/*				<div>amplify your profits and diversify your portfolio </div>*/}
			{/*				<div>across different NFT collections. </div>*/}
			{/*			</div>*/}
			{/*		</div>*/}

			{/*		<div className={'py-16 md:flex md:w-1/3 md:flex-col md:gap-3'}>*/}
			{/*			<div className={'flex flex-col items-center gap-1 pl-10'}>*/}
			{/*				<div className={'text-[#2D7AF9] xsm:mb-1 sm:mb-1'}>Join the community</div>*/}
			{/*				<div className={'text-2xl font-semibold text-[#5865F2]'}>Follow our channels</div>*/}
			{/*			</div>*/}
			{/*			<div*/}
			{/*				className={*/}
			{/*					'flex flex-row gap-10  text-sm text-[#000A77] xsm:mt-5 xsm:justify-around sm:mt-5 sm:justify-around'*/}
			{/*				}*/}
			{/*			>*/}
			{/*				<div className={'flex flex-col gap-8'}>*/}
			{/*					<div*/}
			{/*						className={'cursor_pointer flex flex-row items-center gap-3'}*/}
			{/*						onClick={() => (window.location.href = 'https://discord.com/invite/protradex')}*/}
			{/*					>*/}
			{/*						<Image height={32} width={32} src={IconDiscord} alt="IconDiscord" />*/}
			{/*						<div>Discord</div>*/}
			{/*					</div>*/}
			{/*					<div*/}
			{/*						onClick={() => (window.location.href = 'https://github.com/Protradex')}*/}
			{/*						className={'cursor_pointer flex flex-row items-center gap-3'}*/}
			{/*					>*/}
			{/*						<Image height={32} width={32} src={IconGithub} alt="IconGithub" />*/}
			{/*						<div>Github</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*				<div className={'flex flex-col gap-8'}>*/}
			{/*					<div*/}
			{/*						onClick={() => (window.location.href = 'https://twitter.com/Pro_Tradex')}*/}
			{/*						className={'cursor_pointer flex flex-row items-center gap-3'}*/}
			{/*					>*/}
			{/*						<Image height={32} width={32} src={IconTwitter} alt="IconTwitter" />*/}
			{/*						<div>Twitter</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</>
	)
}
