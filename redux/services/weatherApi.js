import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const weatherApi = createApi({
	reducerPath: 'weatherApi',
	refetchOnFocus: true,
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.open-meteo.com/v1/forecast/',
	}),
	endpoints: (builder) => ({
		getWeather: builder.query({
			query: ({ latitude, longitude }) =>
				`?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,soil_temperature_0cm,soil_temperature_18cm&forecast_days=1`,
			transformResponse: ({ hourly }) => {
				const {
					time,
					temperature_2m,
					soil_temperature_0cm,
					soil_temperature_18cm,
				} = hourly
				const mixedArray = []

				const temperature_2m_array = time.reduce(
					(acc, cur) => {
						acc.data.push({ x: cur, y: temperature_2m[acc.data.length] })
						return acc
					},
					{ id: 'temperature_2m', data: [] }
				)
				const soil_temperature_0cm_array = time.reduce(
					(acc, cur) => {
						acc.data.push({ x: cur, y: soil_temperature_0cm[acc.data.length] })
						return acc
					},
					{ id: 'soil_temperature_0cm', data: [] }
				)
				const soil_temperature_18cm_array = time.reduce(
					(acc, cur) => {
						acc.data.push({ x: cur, y: soil_temperature_18cm[acc.data.length] })
						return acc
					},
					{ id: 'soil_temperature_18cm', data: [] }
				)

				mixedArray.push(temperature_2m_array)
				mixedArray.push(soil_temperature_0cm_array)
				mixedArray.push(soil_temperature_18cm_array)

				return mixedArray
			},
		}),
	}),
})

export const { useGetWeatherQuery } = weatherApi
