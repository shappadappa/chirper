import { Lato } from 'next/font/google'
import './globals.css'

import Navbar from './components/Navbar'
import { AuthContextProvider } from './context/AuthContext'

const lato = Lato({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"] })

export const metadata = {
  title: 'Chirper',
  description: 'Chirper, the X (formerly known as Twitter) clone.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} grid grid-cols-4 min-h-screen`}>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
