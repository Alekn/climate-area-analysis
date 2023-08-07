'use client'
import MapGL, { FullscreenControl } from 'react-map-gl'
import ThemeSelector from './theme-selector'
import { useCallback, useState } from 'react'

const baseSettings = {
	mapboxAccessToken:
		'pk.eyJ1Ijoiam9lY2hvOTkiLCJhIjoiY2xrYmR3ZWRjMGQyaTNmcXZpYmQ3NjE2dyJ9.UAsrIoxqONGGalq-gNULbg',
	minZoom: 1,
}

const THEMES = {
	streets: 'mapbox://styles/mapbox/streets-v11',
	outdoors: 'mapbox://styles/mapbox/outdoors-v11',
	light: 'mapbox://styles/mapbox/light-v10',
	dark: 'mapbox://styles/mapbox/dark-v10',
	satellite: 'mapbox://styles/mapbox/satellite-v9',
	satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
}

export default function Map({ children }) {
	const [selectedTheme, setSelectedTheme] = useState(THEMES.satelliteStreets)
	const handleChangeTheme = useCallback((value) => setSelectedTheme(value), [])

	return (
		<MapGL
			initialViewState={{
				longitude: -72.19,
				latitude: 7.83,
				zoom: 15,
				bearing: 0,
				pitch: 0,
			}}
			mapStyle={selectedTheme}
			style={{ width: 600, height: 400 }}
			{...baseSettings}
		>
			{children}
			<ThemeSelector
				themes={THEMES}
				onChange={handleChangeTheme}
				selectedTheme={selectedTheme}
			/>
			<FullscreenControl position="top-left" />
		</MapGL>
	)
}
