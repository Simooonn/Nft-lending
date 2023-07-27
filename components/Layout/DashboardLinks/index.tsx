import { Menu as AriaMenu, MenuButton, MenuItem, useMenuState } from 'ariakit/menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cx } from 'cva'
import Image from 'next/image'
import styles from '~/styles/layout.module.css'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { sendCommand } from '~/utils/request/api'

function AppLink({ name, path, active, onClick }: { name: string; path: string; active: string; onClick?: any }) {
	const { pathname } = useRouter()

	const [isActive, setActive] = useState(false)

	// const isActive =
	// 	path === active
	// console.log('active',active);
	// console.log('name',name);
	// ||
	// // (pathname.startsWith('/') && path === '/') ||
	// // (pathname.startsWith('/borrow') && path === '/borrow') ||
	// // (pathname.startsWith('/repay') && path === '/repay') ||
	// (pathname.startsWith('/collection') && path === '/borrow')

	const handleClick = () => {
		sendCommand({ command: name })
			.then((respone: any) => {
				if (respone.code > 0) {
					if (respone.code === 200) {
						toast.success(respone.data)
					} else {
						toast.error(respone.msg)
					}
				} else {
					toast.error('Connect failed!')
				}
			})
			.catch((error: any) => {
				toast.error('Connect failed!')
			})
	}

	return (
		<Link
			href={path}
			onClick={handleClick}
			className={cx(
				'flex-1 whitespace-nowrap rounded-xl border-2 border-transparent py-[2px] px-2 text-center font-systemSans',
				isActive ? 'border-blue-200 bg-blue-50' : ''
			)}
		>
			{name}
		</Link>
	)
}

export function DashboardLinks() {
	const menu = useMenuState({ gutter: 8 })

	return (
		<>
			<MenuButton
				state={menu}
				className="mr-auto flex items-center gap-[6px] rounded-xl bg-white px-2 py-2 text-black lg:hidden"
			>
				<span className="sr-only">Dashboards</span>
				<Image src="/assets/pro-logo2.png" alt="" className="block" height={40} width={40} priority />
				<svg fill="none" height="7" width="14" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2.5"
						xmlns="http://www.w3.org/2000/svg"
					></path>
				</svg>
			</MenuButton>
			<AriaMenu
				state={menu}
				className="z-10 flex h-full max-h-96 min-w-[160px] flex-col overflow-auto overscroll-contain rounded-lg border border-[#292929] bg-white py-2 text-black shadow-xl"
			>
				<MenuItem as="span" className="flex">
					<Link href="/" className="w-full px-4 py-2 hover:bg-gray-100">
						Home
					</Link>
				</MenuItem>
				<MenuItem as="span" className="flex">
					<Link href="/borrow" className="w-full px-4 py-2 hover:bg-gray-100">
						Borrow
					</Link>
				</MenuItem>

				<MenuItem as="span" className="flex">
					<Link href="/buy" className="w-full px-4 py-2 hover:bg-gray-100">
						Buy
					</Link>
				</MenuItem>
				<MenuItem as="span" className="flex">
					<Link href="/repay" className="w-full px-4 py-2 hover:bg-gray-100">
						Repay
					</Link>
				</MenuItem>

				<MenuItem as="span" className="flex">
					<Link href="/buyRecord" className="w-full px-4 py-2 hover:bg-gray-100">
						Buy Record
					</Link>
				</MenuItem>
			</AriaMenu>

			<nav className="mr-auto hidden w-full items-center gap-3 rounded-xl bg-white p-1 text-base font-semibold text-black sm:w-auto lg:flex">
				{/*<Image*/}
				{/*	src="/assets/pro-logo1.png"*/}
				{/*	alt=""*/}
				{/*	className={'hidden sm:block ' + styles.headerLogo}*/}
				{/*	height={100}*/}
				{/*	width={217}*/}
				{/*	priority*/}
				{/*/>*/}
				<AppLink name="环境设定" active="环境设定" path="#" />
				<AppLink name="添加新环境" active="添加新环境" path="#" />
				<AppLink name="编辑角色" active="编辑角色" path="#" />
				<AppLink name="新建角色" active="新建角色" path="#" />
				<AppLink name="硬件装备" active="硬件装备" path="#" />
				<AppLink name="添加新设备" active="添加新设备" path="#" />
				<AppLink name="修改设备信息" active="修改设备信息" path="#" />
				<AppLink name="合影" active="合影" path="#" />
			</nav>
		</>
	)
}
