import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'FlowFoundry - AI Transformation & Business Automation Solutions',
    template: '%s | FlowFoundry'
  },
  description: 'Transform your business with AI-powered solutions. Expert consultancy in multi-agent systems, operational optimization, and custom AI development. 340% average ROI proven results.',
  keywords: [
    'AI consulting',
    'business transformation',
    'automation solutions',
    'multi-agent systems',
    'AI optimization',
    'business automation',
    'AI transformation',
    'operational optimization'
  ],
  authors: [{ name: 'FlowFoundry Team' }],
  creator: 'FlowFoundry',
  publisher: 'FlowFoundry',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowfoundry.ai',
    siteName: 'FlowFoundry',
    title: 'FlowFoundry - AI Transformation & Business Automation Solutions',
    description: 'Transform your business with AI-powered solutions. Expert consultancy in multi-agent systems, operational optimization, and custom AI development. 340% average ROI proven results.',
    images: [
      {
        url: '/og-image-default.png',
        width: 1200,
        height: 630,
        alt: 'FlowFoundry - AI Transformation Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowFoundry - AI Transformation & Business Automation Solutions',
    description: 'Transform your business with AI-powered solutions. Expert consultancy in multi-agent systems, operational optimization, and custom AI development.',
    images: ['/og-image-default.png'],
    creator: '@flowfoundry',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
