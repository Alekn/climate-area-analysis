'use client'
import Draw from '@/components/map/draw'
import Map from '@/components/map/map'
import Line from '@/components/graph/line'
import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore'
// map
import 'mapbox-gl/dist/mapbox-gl.css'
import { config } from '../config'
import { useEffect, useState } from 'react'

const firebaseApp = initializeApp(config.firebase)
const firestore = getFirestore(firebaseApp)
const weatherData = collection(firestore, 'weatherData')
export const weatherDoc = doc(weatherData, 'client-1')

export default function Home() {
	const [weatherData, setWeatherData] = useState([])
	useEffect(() => {
		const unsuscribe = onSnapshot(weatherDoc, (snapshot) => {
			const data = Object.values(snapshot.data())
			setWeatherData(data)
		})
		return () => {
			unsuscribe()
		}
	}, [])

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12">
			<div className="z-0 overflow-hidden relative rounded-lg">
				<Map>
					<Draw>
						<Draw.Control />
					</Draw>
				</Map>
			</div>
			<div className=" text-gray-100 text-2xl font-semibold">
				Weather conditions in the area
			</div>
			<div className="h-96 w-full bg-gray-100 rounded-lg text-gray-900">
				<Line data={weatherData} />
			</div>
		</main>
	)
}
