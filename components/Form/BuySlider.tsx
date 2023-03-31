import { useState } from 'react'
import * as RadixSlider from '@radix-ui/react-slider'

export const BuySlider = ({
	range,
	label,
	symbol,
	decimals,
	disabled,
	onValueCommit
}: {
	range: Array<number>
	label: string
	symbol: string
	decimals: number
	disabled: boolean
	onValueCommit: (value: Array<number>) => void
}) => {
	const [min, max] = range
	const [value, setValue] = useState([0])

	const step = Number(
		((max - min) / 5).toLocaleString('en-US', {
			maximumFractionDigits: decimals
		})
	)

	const isValidRange = min !== max && !Number.isNaN(min) && !Number.isNaN(max)

	return (
		<label className="flex flex-col gap-2">
			<span className="-mb-1 flex w-full justify-between text-xs text-[#3E424E]">
				<span>{min}</span>
				{isValidRange && <span>{max}</span>}
			</span>
			<RadixSlider.Root
				className="relative flex h-[20px] w-full touch-none select-none items-center"
				min={min}
				max={max}
				step={step}
				minStepsBetweenThumbs={step}
				disabled={false}
				value={value}
				onValueChange={(newValue) => setValue(newValue)}
				onValueCommit={onValueCommit}
			>
				<RadixSlider.Track className="relative h-2 w-full rounded-[30px] bg-[#C3DAFF]">
					<RadixSlider.Range className="absolute h-full rounded-full bg-[#627EEA]" />
				</RadixSlider.Track>
				<RadixSlider.Thumb className="relative block h-3 w-3 rounded-full border-2 border-white bg-[#627EEA]">
					<span className="absolute -top-6 -left-1 whitespace-nowrap bg-primary px-[2px] text-xs text-white">{`${value[0]} ${symbol}`}</span>
				</RadixSlider.Thumb>
			</RadixSlider.Root>
			<span className="text-sm text-[#D4D4D8]">{label}</span>
		</label>
	)
}
