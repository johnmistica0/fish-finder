import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from "@/components/navbar/NavBar"
import LoadApiWrapper from "@/components/LoadApiWrapper"
import { MapContextWrapper } from "@/components/context/MapContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fish Finder',
  description: 'Geo fish finding web application'
}

export default function RootLayout({ children }: any) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="overscroll-none">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadApiWrapper>
              <MapContextWrapper>
                <header className="bg-white dark:bg-gray-800 sticky top-0 z-50">
                  <NavBar />
                </header>
                {children}
              </MapContextWrapper>
            </LoadApiWrapper>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
