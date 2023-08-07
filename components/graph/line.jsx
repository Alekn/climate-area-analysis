'use client'
import { ResponsiveLine } from '@nivo/line'

export default function Line({ data }) {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{
				format: '%Y-%m-%dT%H:%M',
				type: 'time',
				precision: 'hour',
				useUTC: false,
			}}
			xFormat={'time:%Y-%m-%dT%H:%M'}
			yScale={{
				type: 'linear',
				min: 'auto',
				max: 'auto',
			}}
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				format: '%H:%M',
				tickValues: 'every hour',
				legend: 'time',
				legendOffset: 36,
				legendPosition: 'middle',
			}}
			axisLeft={{
				legend: 'temperature',
				legendOffset: -40,
				legendPosition: 'middle',
			}}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={0}
			useMesh={true}
			legends={[
				{
					anchor: 'top-right',
					direction: 'column',
					justify: false,
					translateX: 0,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: 'left-to-right',
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: 'circle',
					symbolBorderColor: 'rgba(0, 0, 0, .5)',
					effects: [
						{
							on: 'hover',
							style: {
								itemBackground: 'rgba(0, 0, 0, .03)',
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	)
}
