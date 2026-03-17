import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AES - Associação dos Empregados do SENAI',
  description: 'Proporcionando qualidade de vida aos associados, dependentes e agregados do SENAI desde 1947.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'AES - Associação dos Empregados do SENAI',
    description: 'Proporcionando qualidade de vida aos associados, dependentes e agregados do SENAI desde 1947.',
    type: 'website',
    url: 'https://aessenai.org.br',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
