import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
export const ConnectButtonNew = () => {
	// useEffect(() => {
	// 	console.log('connected', typeof connected === 'undefined')
	// 	if (typeof connected === 'undefined') {
	// 	}
	// 	if (connected === true) {
	// 		console.log('aa-connected')
	// 	}
	// }, [connected])
	return (
		<ConnectButton.Custom>
			{({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== 'loading'
				const connected =
					ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none'
							}
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button onClick={openConnectModal} type="button">
										Connect Wallet
									</button>
								)
							}
							if (chain.unsupported) {
								return (
									<button onClick={openChainModal} type="button">
										Wrong network
									</button>
								)
							}
							return (
								<div style={{ display: 'flex', gap: 12 }}>
									<button
										onClick={openChainModal}
										style={{
											display: 'flex',
											alignItems: 'center',
											background: '#EFF6FF',
											padding: '5px',
											borderRadius: '12px'
										}}
										type="button"
									>
										{chain.hasIcon && (
											<div
												style={{
													// background: chain.iconBackground,
													width: 40,
													height: 40,
													borderRadius: 999,
													overflow: 'hidden',
													// padding:'5px',
													marginRight: 4
												}}
											>
												{chain.iconUrl && (
													<img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 40, height: 40 }} />
												)}
											</div>
										)}
										{chain.name}
									</button>
									<button onClick={openAccountModal} type="button">
										{account.displayName}
										{account.displayBalance ? ` (${account.displayBalance})` : ''}
									</button>
								</div>
							)
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}

// export default ConnectButtonNew;
