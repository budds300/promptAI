
import { Inter } from 'next/font/google'
import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptopia',
  description: 'Descover and share AI Propts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Provider>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
        <Nav/>
        {children}
         </main>
         </Provider>
        </body>
    </html>
  )
}
