import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';
import AccessibilityProvider from '@/components/providers/AccessibilityProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccessibilityPanel from '@/components/layout/AccessibilityPanel';
import A11yFilters from '@/components/layout/A11yFilters';

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
        {/* Prevent FOUC: apply saved theme + dark mode before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var t=localStorage.getItem('aes-theme-config');
if(t){var c=JSON.parse(t).colors;if(c){var r=document.documentElement.style;
var n={primary:'--color-primary',primaryDark:'--color-primary-dark',
primaryLight:'--color-primary-light',secondary:'--color-secondary',
secondaryDark:'--color-secondary-dark',secondaryLight:'--color-secondary-light',
accent:'--color-accent',accentDark:'--color-accent-dark',
accentLight:'--color-accent-light',success:'--color-success',
warning:'--color-warning',error:'--color-error',info:'--color-info',
foreground:'--color-foreground',foregroundMuted:'--color-foreground-muted',
background:'--color-background',surface:'--color-surface',
border:'--color-border',darkForeground:'--color-dark-foreground',
darkBackground:'--color-dark-background',darkSurface:'--color-dark-surface',
darkBorder:'--color-dark-border'};
for(var k in n){if(c[k]&&/^#[0-9a-fA-F]{3,8}$/.test(c[k]))r.setProperty(n[k],c[k])}}}
var a=localStorage.getItem('aes-accessibility');
if(a){var s=JSON.parse(a);if(s.darkMode)document.documentElement.classList.add('dark')}
}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium">
          Pular para o conteúdo principal
        </a>
        <AccessibilityProvider>
          <ThemeProvider>
            <A11yFilters />
            <Header />
            <main id="main-content" className="min-h-screen">{children}</main>
            <Footer />
            <AccessibilityPanel />
          </ThemeProvider>
        </AccessibilityProvider>
{/* VLibras injected by AccessibilityProvider */}
      </body>
    </html>
  );
}
