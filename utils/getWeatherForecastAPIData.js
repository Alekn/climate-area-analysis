export default async function getWeatherForecastAPIData({
	latitude,
	longitude,
}) {
	const res = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,soil_temperature_0cm,soil_moisture_0_1cm`
	)

	if (!res.ok) {
		throw new Error('Failed to fetch game data')
	}

	return res.json()
}
