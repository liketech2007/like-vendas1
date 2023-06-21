import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Like Vendas - Confirmação de email',
  description: 'A Like Vendas é um site dedicado à gestão de estoque, especialmente desenvolvido para atender às necessidades de pequenas lojas. Com recursos intuitivos e eficientes, permite que os comerciantes controlem seus produtos, acompanhem o estoque disponível e realizem vendas de forma simples e organizada. Com a <span className="text-blue-500 font-bold">Like Vendas</span>, os proprietários de pequenas lojas têm acesso a uma plataforma prática e eficaz para gerenciar o estoque de seus produtos, otimizando assim suas operações e melhorando o atendimento aos clientes',
}

export default function ConfirmeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
