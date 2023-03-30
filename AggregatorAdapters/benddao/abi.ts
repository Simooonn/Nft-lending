const lendPoolAbi: any = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'bidPrice',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'nftAsset',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'nftTokenId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'onBehalfOf',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'borrower',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'loanId',
				type: 'uint256'
			}
		],
		name: 'Auction',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'nftAsset',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'nftTokenId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'onBehalfOf',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'borrowRate',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'loanId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'uint16',
				name: 'referral',
				type: 'uint16'
			}
		],
		name: 'Borrow',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'onBehalfOf',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint16',
				name: 'referral',
				type: 'uint16'
			}
		],
		name: 'Deposit',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'repayAmount',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'remainAmount',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'nftAsset',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'nftTokenId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'borrower',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'loanId',
				type: 'uint256'
			}
		],
		name: 'Liquidate',
		type: 'event'
	},
	{ anonymous: false, inputs: [], name: 'Paused', type: 'event' },
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'startTime',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'durationTime',
				type: 'uint256'
			}
		],
		name: 'PausedTimeUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'borrowAmount',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'fineAmount',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'nftAsset',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'nftTokenId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'borrower',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'loanId',
				type: 'uint256'
			}
		],
		name: 'Redeem',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'nftAsset',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'nftTokenId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'borrower',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'loanId',
				type: 'uint256'
			}
		],
		name: 'Repay',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'liquidityRate',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'variableBorrowRate',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'liquidityIndex',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'variableBorrowIndex',
				type: 'uint256'
			}
		],
		name: 'ReserveDataUpdated',
		type: 'event'
	},
	{ anonymous: false, inputs: [], name: 'Unpaused', type: 'event' },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{
				indexed: true,
				internalType: 'address',
				name: 'reserve',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{ indexed: true, internalType: 'address', name: 'to', type: 'address' }
		],
		name: 'Withdraw',
		type: 'event'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' },
			{ internalType: 'uint256', name: 'bidPrice', type: 'uint256' },
			{ internalType: 'address', name: 'onBehalfOf', type: 'address' }
		],
		name: 'auction',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address[]', name: 'assets', type: 'address[]' },
			{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
			{ internalType: 'address[]', name: 'nftAssets', type: 'address[]' },
			{ internalType: 'uint256[]', name: 'nftTokenIds', type: 'uint256[]' },
			{ internalType: 'address', name: 'onBehalfOf', type: 'address' },
			{ internalType: 'uint16', name: 'referralCode', type: 'uint16' }
		],
		name: 'batchBorrow',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address[]', name: 'nftAssets', type: 'address[]' },
			{ internalType: 'uint256[]', name: 'nftTokenIds', type: 'uint256[]' },
			{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }
		],
		name: 'batchRepay',
		outputs: [
			{ internalType: 'uint256[]', name: '', type: 'uint256[]' },
			{ internalType: 'bool[]', name: '', type: 'bool[]' }
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' },
			{ internalType: 'address', name: 'onBehalfOf', type: 'address' },
			{ internalType: 'uint16', name: 'referralCode', type: 'uint16' }
		],
		name: 'borrow',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'address', name: 'onBehalfOf', type: 'address' },
			{ internalType: 'uint16', name: 'referralCode', type: 'uint16' }
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'address', name: 'from', type: 'address' },
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'uint256', name: 'balanceFromBefore', type: 'uint256' },
			{ internalType: 'uint256', name: 'balanceToBefore', type: 'uint256' }
		],
		name: 'finalizeTransfer',
		outputs: [],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAddressesProvider',
		outputs: [
			{
				internalType: 'contract ILendPoolAddressesProvider',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getMaxNumberOfNfts',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getMaxNumberOfReserves',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' }
		],
		name: 'getNftAuctionData',
		outputs: [
			{ internalType: 'uint256', name: 'loanId', type: 'uint256' },
			{ internalType: 'address', name: 'bidderAddress', type: 'address' },
			{ internalType: 'uint256', name: 'bidPrice', type: 'uint256' },
			{ internalType: 'uint256', name: 'bidBorrowAmount', type: 'uint256' },
			{ internalType: 'uint256', name: 'bidFine', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' }
		],
		name: 'getNftAuctionEndTime',
		outputs: [
			{ internalType: 'uint256', name: 'loanId', type: 'uint256' },
			{ internalType: 'uint256', name: 'bidStartTimestamp', type: 'uint256' },
			{ internalType: 'uint256', name: 'bidEndTimestamp', type: 'uint256' },
			{ internalType: 'uint256', name: 'redeemEndTimestamp', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'address', name: 'reserveAsset', type: 'address' }
		],
		name: 'getNftCollateralData',
		outputs: [
			{
				internalType: 'uint256',
				name: 'totalCollateralInETH',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'totalCollateralInReserve',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'availableBorrowsInETH',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'availableBorrowsInReserve',
				type: 'uint256'
			},
			{ internalType: 'uint256', name: 'ltv', type: 'uint256' },
			{
				internalType: 'uint256',
				name: 'liquidationThreshold',
				type: 'uint256'
			},
			{ internalType: 'uint256', name: 'liquidationBonus', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
		name: 'getNftConfiguration',
		outputs: [
			{
				components: [{ internalType: 'uint256', name: 'data', type: 'uint256' }],
				internalType: 'struct DataTypes.NftConfigurationMap',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
		name: 'getNftData',
		outputs: [
			{
				components: [
					{
						components: [{ internalType: 'uint256', name: 'data', type: 'uint256' }],
						internalType: 'struct DataTypes.NftConfigurationMap',
						name: 'configuration',
						type: 'tuple'
					},
					{ internalType: 'address', name: 'bNftAddress', type: 'address' },
					{ internalType: 'uint8', name: 'id', type: 'uint8' },
					{ internalType: 'uint256', name: 'maxSupply', type: 'uint256' },
					{ internalType: 'uint256', name: 'maxTokenId', type: 'uint256' }
				],
				internalType: 'struct DataTypes.NftData',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' }
		],
		name: 'getNftDebtData',
		outputs: [
			{ internalType: 'uint256', name: 'loanId', type: 'uint256' },
			{ internalType: 'address', name: 'reserveAsset', type: 'address' },
			{ internalType: 'uint256', name: 'totalCollateral', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalDebt', type: 'uint256' },
			{ internalType: 'uint256', name: 'availableBorrows', type: 'uint256' },
			{ internalType: 'uint256', name: 'healthFactor', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' }
		],
		name: 'getNftLiquidatePrice',
		outputs: [
			{ internalType: 'uint256', name: 'liquidatePrice', type: 'uint256' },
			{ internalType: 'uint256', name: 'paybackAmount', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getNftsList',
		outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getPausedTime',
		outputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
		name: 'getReserveConfiguration',
		outputs: [
			{
				components: [{ internalType: 'uint256', name: 'data', type: 'uint256' }],
				internalType: 'struct DataTypes.ReserveConfigurationMap',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
		name: 'getReserveData',
		outputs: [
			{
				components: [
					{
						components: [{ internalType: 'uint256', name: 'data', type: 'uint256' }],
						internalType: 'struct DataTypes.ReserveConfigurationMap',
						name: 'configuration',
						type: 'tuple'
					},
					{ internalType: 'uint128', name: 'liquidityIndex', type: 'uint128' },
					{
						internalType: 'uint128',
						name: 'variableBorrowIndex',
						type: 'uint128'
					},
					{
						internalType: 'uint128',
						name: 'currentLiquidityRate',
						type: 'uint128'
					},
					{
						internalType: 'uint128',
						name: 'currentVariableBorrowRate',
						type: 'uint128'
					},
					{
						internalType: 'uint40',
						name: 'lastUpdateTimestamp',
						type: 'uint40'
					},
					{ internalType: 'address', name: 'bTokenAddress', type: 'address' },
					{
						internalType: 'address',
						name: 'debtTokenAddress',
						type: 'address'
					},
					{
						internalType: 'address',
						name: 'interestRateAddress',
						type: 'address'
					},
					{ internalType: 'uint8', name: 'id', type: 'uint8' }
				],
				internalType: 'struct DataTypes.ReserveData',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
		name: 'getReserveNormalizedIncome',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
		name: 'getReserveNormalizedVariableDebt',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getReservesList',
		outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'address', name: 'bNftAddress', type: 'address' }
		],
		name: 'initNft',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'address', name: 'bTokenAddress', type: 'address' },
			{ internalType: 'address', name: 'debtTokenAddress', type: 'address' },
			{ internalType: 'address', name: 'interestRateAddress', type: 'address' }
		],
		name: 'initReserve',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'contract ILendPoolAddressesProvider',
				name: 'provider',
				type: 'address'
			}
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'liquidate',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'operator', type: 'address' },
			{ internalType: 'address', name: 'from', type: 'address' },
			{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
			{ internalType: 'bytes', name: 'data', type: 'bytes' }
		],
		name: 'onERC721Received',
		outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [],
		name: 'paused',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'uint256', name: 'bidFine', type: 'uint256' }
		],
		name: 'redeem',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'nftAsset', type: 'address' },
			{ internalType: 'uint256', name: 'nftTokenId', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'repay',
		outputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'bool', name: '', type: 'bool' }
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'val', type: 'uint256' }],
		name: 'setMaxNumberOfNfts',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'val', type: 'uint256' }],
		name: 'setMaxNumberOfReserves',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'uint256', name: 'configuration', type: 'uint256' }
		],
		name: 'setNftConfiguration',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'uint256', name: 'maxSupply', type: 'uint256' },
			{ internalType: 'uint256', name: 'maxTokenId', type: 'uint256' }
		],
		name: 'setNftMaxSupplyAndTokenId',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bool', name: 'val', type: 'bool' }],
		name: 'setPause',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'durationTime', type: 'uint256' }
		],
		name: 'setPausedTime',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'uint256', name: 'configuration', type: 'uint256' }
		],
		name: 'setReserveConfiguration',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'address', name: 'rateAddress', type: 'address' }
		],
		name: 'setReserveInterestRateAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'asset', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'address', name: 'to', type: 'address' }
		],
		name: 'withdraw',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

export default lendPoolAbi
