import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '~/components/Layout'

export default function Home() {
	useEffect(() => {}, [])

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Layout>
				<div className={'home_background'}></div>
			</Layout>
		</>
	)
}
