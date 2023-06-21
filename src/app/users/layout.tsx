import { CheckLocalStorage } from '@/components/checkLocalStorage'
import { Inter } from 'next/font/google'
import { CheckPay } from '@/components/checkPay'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Like Vendas',
  description: 'A Like Vendas é um site dedicado à gestão de estoque, especialmente desenvolvido para atender às necessidades de pequenas lojas. Com recursos intuitivos e eficientes, permite que os comerciantes controlem seus produtos, acompanhem o estoque disponível e realizem vendas de forma simples e organizada. Com a <span className="text-blue-500 font-bold">Like Vendas</span>, os proprietários de pequenas lojas têm acesso a uma plataforma prática e eficaz para gerenciar o estoque de seus produtos, otimizando assim suas operações e melhorando o atendimento aos clientes',
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={`${inter.className} flex flex-col justify-center items-center`}>
          <CheckLocalStorage />
          <CheckPay />
        {children}
      </body>
    </html>
  )
}
