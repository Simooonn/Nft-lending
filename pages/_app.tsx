import '~/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import * as React from 'react'
import { Inter } from '@next/font/google'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { DehydratedState } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
	connectorsForWallets,
	lightTheme,
	RainbowKitProvider,
	Theme,
	AvatarComponent,
	RainbowKitAuthenticationProvider,
	createAuthenticationAdapter
} from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { injectedWallet, rainbowWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { useDialogState } from 'ariakit'
import { Toaster } from 'react-hot-toast'
import TxSubmittedDialog from '~/components/TxSubmittedDialog'
import { CHAINS_CONFIGURATION } from '~/lib/constants'
import { TransactionsContext } from '~/contexts'
import { useState } from 'react'
import { login } from '~/utils/request/api'
import { clearAccount, getJWTToken, setJWTToken } from '~/utils/function'
import { ethers } from 'ethers'
// import { generateColorFromAddress } from './utils';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

const { chains, provider } = configureChains(
	[chain.mainnet, chain.goerli],
	[
		jsonRpcProvider({
			rpc: (chain) => {
				if (chain.id === 1) {
					return { http: CHAINS_CONFIGURATION[1].rpcUrl }
				} else if (chain.id === 5) {
					return { http: CHAINS_CONFIGURATION[5].rpcUrl }
				} else {
					return { http: chain.rpcUrls.default }
				}
			}
		})
	]
)

const connectors = connectorsForWallets([
	{
		groupName: 'Popular',
		wallets: [
			{
				id: 'safe',
				name: 'Gnosis Safe',
				iconUrl: '/assets/gnosis.png',
				iconBackground: '#fff',
				createConnector: () => {
					return { connector: new SafeConnector({ chains }) }
				}
			},
			injectedWallet({ chains }),
			metaMaskWallet({ chains }),
			rainbowWallet({ chains }),
			walletConnectWallet({ chains })
		]
	}
])

const wagmiClient = createClient({
	autoConnect: process.env.NEXT_PUBLIC_SAFE === 'true' ? false : true,
	connectors,
	provider
})

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = React.useState(() => new QueryClient())
	const [isMounted, setIsMounted] = React.useState(false)
	const [AUTHENTICATION_STATUS, setAUTHENTICATION_STATUS] = useState<'loading' | 'unauthenticated' | 'authenticated'>(
		'unauthenticated'
	) //loading authenticated unauthenticated

	const dialog = useDialogState()
	const txHash = React.useRef<string | null>(null)
	{
		/*const myCustomTheme: Theme = {*/
	}
	// 	blurs: {
	// 		modalOverlay: '...'
	// 	},
	// 	colors: {
	// 		accentColor: 'linear-gradient(90deg, #AB40FF 0%, #10A0FF 100%);',
	// 		accentColorForeground: 'white',
	// 		actionButtonBorder: 'small',
	// 		actionButtonBorderMobile: '...',
	// 		actionButtonSecondaryBackground: '...',
	// 		closeButton: '...',
	// 		closeButtonBackground: '...',
	// 		connectButtonBackground: '...',
	// 		connectButtonBackgroundError: '...',
	// 		connectButtonInnerBackground: '...',
	// 		connectButtonText: '...',
	// 		connectButtonTextError: '...',
	// 		connectionIndicator: '...',
	// 		downloadBottomCardBackground: '...',
	// 		downloadTopCardBackground: '...',
	// 		error: '...',
	// 		generalBorder: '...',
	// 		generalBorderDim: '...',
	// 		menuItemBackground: '...',
	// 		modalBackdrop: '...',
	// 		modalBackground: '...',
	// 		modalBorder: '...',
	// 		modalText: '...',
	// 		modalTextDim: '...',
	// 		modalTextSecondary: '...',
	// 		profileAction: '...',
	// 		profileActionHover: '...',
	// 		profileForeground: '...',
	// 		selectedOptionBorder: '...',
	// 		standby: '...'
	// 	},
	// 	fonts: {
	// 		body: '...'
	// 	},
	// 	radii: {
	// 		actionButton: '...',
	// 		connectButton: '...',
	// 		menuButton: '...',
	// 		modal: '...',
	// 		modalMobile: '...'
	// 	},
	// 	shadows: {
	// 		connectButton: '...',
	// 		dialog: '...',
	// 		profileDetailsAction: '...',
	// 		selectedOption: '...',
	// 		selectedWallet: '...',
	// 		walletLogo: '...'
	// 	}
	// }

	const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
		// const color = generateColorFromAddress(address);
		return ensImage ? (
			<img src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />
		) : (
			<div
				style={{
					backgroundColor: 'red',
					borderRadius: 999,
					height: size,
					width: size
				}}
			>
				:^)
			</div>
		)
	}

	const authenticationAdapter = createAuthenticationAdapter({
		getNonce: async () => {
			// const response = await fetch('/api/nonce');
			// return await response.text();
			return 'test123'
		},
		createMessage: ({ nonce, address, chainId }) => {
			return new SiweMessage({
				// domain: window.location.host,
				// address,
				// statement: 'Sign in with Ethereum to the app.',
				// uri: window.location.origin,
				// version: '1',
				// chainId,
				nonce
			})
		},

		getMessageBody: ({ message }) => {
			return 'test123'
		},

		verify: async ({ message, signature }) => {
			setAUTHENTICATION_STATUS('loading')

			const WindowEth = typeof window !== 'undefined' ? window?.ethereum : {}
			const provider = new ethers.providers.Web3Provider(WindowEth as any)
			const signer = provider.getSigner()
			const message1 = 'test123'
			const signature1 = await signer.signMessage(message1)
			const address = await signer.getAddress()
			const res = await login({ nonce: message1, sign: signature1, address: address })
			if (res?.status === 200) {
				setJWTToken(res?.token)
				setAUTHENTICATION_STATUS('authenticated')
				return Boolean(true)
			}
			setAUTHENTICATION_STATUS('unauthenticated')
			return Boolean(false)

			// const verifyRes = await fetch('/api/verify', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ message, signature }),
			// });
		},

		signOut: async () => {
			clearAccount()
			// await fetch('/api/logout');
		}
	})

	React.useEffect(() => {
		setIsMounted(true)
		setAUTHENTICATION_STATUS(getJWTToken() ? 'authenticated' : 'unauthenticated')
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitAuthenticationProvider adapter={authenticationAdapter} status={AUTHENTICATION_STATUS}>
						<RainbowKitProvider
							theme={lightTheme({
								accentColor: 'linear-gradient(90deg, #AB40FF 0%, #10A0FF 100%);',
								accentColorForeground: 'white',
								fontStack: 'system'
							})}
							chains={chains}
							initialChain={chain.mainnet}
							showRecentTransactions={true}
							modalSize="compact"
							avatar={CustomAvatar}
						>
							<TransactionsContext.Provider value={{ dialog: dialog, hash: txHash }}>
								<style jsx global>{`
									:root {
										--font-inter: ${inter.style.fontFamily};
									}
								`}</style>
								{isMounted && <Component {...pageProps} />}
							</TransactionsContext.Provider>

							<TxSubmittedDialog dialog={dialog} transactionHash={txHash} />
							<Toaster position="top-center" reverseOrder={true} />
						</RainbowKitProvider>
					</RainbowKitAuthenticationProvider>
				</WagmiConfig>
			</Hydrate>

			{/*<ReactQueryDevtools initialIsOpen={false} />*/}
		</QueryClientProvider>
	)
}

export default MyApp
