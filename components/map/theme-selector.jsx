export default function ThemeSelector({ themes, onChange, selectedTheme }) {
	return (
		<div className="min-w-52 absolute top-2 right-2 p-4 rounded-lg bg-gray-900/50">
			<select
				className="py-1 p-1.5 bg-gray-900 capitalize"
				name="styles"
				value={selectedTheme}
				defaultValue={selectedTheme}
				onChange={(event) => onChange(event.target.value)}
			>
				{Object.entries(themes).map((theme) => (
					<option className="capitalize" key={theme[0]} value={theme[1]}>
						{theme[0]}
					</option>
				))}
			</select>
		</div>
	)
}
