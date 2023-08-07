'use client'
import { createContext } from 'react'
import mapboxGlDraw from '@mapbox/mapbox-gl-draw'
import useDraw from '@/hooks/useDraw'

import AddControl from '../add-control'

const DrawContext = createContext()
export { DrawContext }

export default function Draw({ children }) {
	const [polygons, onUpdate, onDelete] = useDraw()
	return (
		<DrawContext.Provider value={Object.values(polygons)}>
			<AddControl
				name="draw"
				control={(props) => new mapboxGlDraw(props)}
				position="top-left"
				displayControlsDefault={false}
				controls={{
					polygon: true,
					trash: true,
				}}
				defaultMode="draw_polygon"
				onCreate={onUpdate}
				onUpdate={onUpdate}
				onDelete={onDelete}
			/>
			{children}
		</DrawContext.Provider>
	)
}
