import type { NextPage } from 'next'
import BuyContainer from '~/containers/BuyContainer'

const Buy: NextPage = () => {
	// by default if wallet is not connected, show loans on ethereum
	return <BuyContainer />
}

export default Buy
