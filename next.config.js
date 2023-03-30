const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cloudflare-ipfs.com', 'nft.llamalend.com', 'res.cloudinary.com', 'nft-cdn.alchemy.com', 'nfts.renga.app', 'icons.llamao.fi'],
  },
	// webpack: (config) => {
	// 	// config.module.rules.push({
	// 	// 	test: /\.svg$/,
	// 	// 	use: ['@svgr/webpack'],
	// 	// });
	// 	//
	// 	// config.resolve.alias['@/assets'] = path.resolve(
	// 	// 	__dirname,
	// 	// 	'./src/public/assets'
	// 	// );
	// 	config.resolve.alias['@'] = path.resolve(__dirname, './src');
	//
	// 	return config;
	// },

	async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '\*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, content-type, Authorization',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
