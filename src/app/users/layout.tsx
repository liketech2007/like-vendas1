import { CheckLocalStorage } from '@/components/checkLocalStorage'
import { Inter } from 'next/font/google'
import { CheckPay } from '@/components/checkPay'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Like Vendas',
  description: 'Like Vendas',
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
          <CheckLocalStorage />
          <CheckPay />
        {children}
      </body>
    </html>
  )
}
