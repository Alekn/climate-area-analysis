import { useControl } from 'react-map-gl'

export default function AddControl({ name, control, ...other }) {
	useControl(
		() => control(other),
		({ map }) => {
			map.on(`${name}.create`, other.onCreate)
			map.on(`${name}.update`, other.onUpdate)
			map.on(`${name}.delete`, other.onDelete)
		},
		({ map }) => {
			map.off(`${name}.create`, other.onCreate)
			map.off(`${name}.update`, other.onUpdate)
			map.off(`${name}.delete`, other.onDelete)
		},
		{ position: other.position },
		{ styles: other.styles }
	)

	return null
}

AddControl.defaultProps = {
	name: '_',
	onCreate: () => {},
	onUpdate: () => {},
	onDelete: () => {},
}
