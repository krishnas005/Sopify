
import './globals.css';
import GlobalState from '@/context';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Sopify',
  description: '@krishnas005',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalState>
          <Navbar/>
        <main className="flex min-h-screen flex-col mt-[84px]">
          {children}
        </main>
        </GlobalState>
      </body>
    </html>
  )
}
