'use client'
import area from '@turf/area'
import { coordAll } from '@turf/meta'
import { useContext, useState } from 'react'
import { DrawContext } from './draw'
import { useGetWeatherQuery } from '@/redux/services/weatherApi'
import useEffectOnUpdate from '@/hooks/useEffectOnUpdate'
import { weatherDoc } from '@/app/page'
import { setDoc } from 'firebase/firestore'

function getInitialCoord(coords) {
	const [longitude, latitude] = coordAll(coords)[0]
	return { longitude, latitude }
}

export default function Control() {
	const [coords, setCoords] = useState(null)
	const { data } = useGetWeatherQuery(coords, { skip: !coords })
	const polygons = useContext(DrawContext)
	let polygonArea = 0

	for (const polygon of polygons) {
		polygonArea += area(polygon)
	}

	useEffectOnUpdate(() => {
		if (polygonArea > 0) {
			setCoords(getInitialCoord(polygons[0]))
		}
	}, [polygonArea])

	useEffectOnUpdate(() => {
		if (Boolean(data)) {
			setDoc(weatherDoc, { ...data })
		}
	}, [data])

	if (polygonArea <= 0) return null

	return (
		<div className="min-h-20 w-40 absolute bottom-8 left-2.5 bg-gray-200/90 p-2 text-center">
			<div className="text-lg text-gray-900 font-semibold leading-6">
				Area seleccionada:
			</div>
			<p className="bg-gray-900">
				{Math.round(polygonArea * 100) / 100}{' '}
				<b>
					m<sup>2</sup>
				</b>
			</p>
			<p className="text-gray-900 font-semibold">
				Lon: {coords?.longitude.toFixed(3)} Lat: {coords?.latitude.toFixed(3)}
			</p>
		</div>
	)
}
