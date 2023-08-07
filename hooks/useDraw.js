import { useCallback, useState } from 'react'

export default function useDraw() {
	const [features, setFeatures] = useState({})

	const onUpdate = useCallback((e) => {
		setFeatures((currFeatures) => {
			const newFeatures = { ...currFeatures }
			for (const f of e.features) {
				newFeatures[f.id] = f
			}
			return newFeatures
		})
	}, [])

	const onDelete = useCallback((e) => {
		setFeatures((currFeatures) => {
			const newFeatures = { ...currFeatures }
			for (const f of e.features) {
				delete newFeatures[f.id]
			}
			return newFeatures
		})
	}, [])

	return [features, onUpdate, onDelete]
}
