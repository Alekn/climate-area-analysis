import Providers from '@/redux/provider'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Climate and area analysis app',
	description:
		'A climate and area analysis application for irrigation systems. Application developed for educational purposes. Uses open source libraries to populate the Grafana dashboard with climate and area.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
