import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Like Vendas',
  description: 'A Like Vendas é um site dedicado à gestão de estoque, especialmente desenvolvido para atender às necessidades de pequenas lojas. Com recursos intuitivos e eficientes, permite que os comerciantes controlem seus produtos, acompanhem o estoque disponível e realizem vendas de forma simples e organizada. Com a <span className="text-blue-500 font-bold">Like Vendas</span>, os proprietários de pequenas lojas têm acesso a uma plataforma prática e eficaz para gerenciar o estoque de seus produtos, otimizando assim suas operações e melhorando o atendimento aos clientes',
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_URL}`,
    title: 'Like Vendas',
    description: `A Like Vendas é um site dedicado à gestão de estoque, especialmente desenvolvido para atender às necessidades de pequenas lojas. Com recursos intuitivos e eficientes, permite que os comerciantes controlem seus produtos, acompanhem o estoque disponível e realizem vendas de forma simples e organizada. Com a <span className="text-blue-500 font-bold">Like Vendas</span>, os proprietários de pequenas lojas têm acesso a uma plataforma prática e eficaz para gerenciar o estoque de seus produtos, otimizando assim suas operações e melhorando o atendimento aos clientes`,
    images: [
      {
        url: 'https://media.graphassets.com/F4RsIolwQcu5SyuL0Up8',
        width: 800,
        height: 600,
        alt: 'Like Vendas',
        type: 'image/jpeg',
      }
    ],
    siteName: 'Like Vendas',
  },
  twitter: {
    handle: '@likevendas',
    site: `${process.env.NEXT_PUBLIC_URL}`,
    cardType: 'https://media.graphassets.com/F4RsIolwQcu5SyuL0Up8',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="pt">
      <head>
      <script dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N85SJMW');`}}></script>
       <link rel="icon" type="image/x-icon" href="https://media.graphassets.com/l4HnQgAESXOPgh5zXdJz"/>

      </head>
      <body className={`${inter.className} `}>
      <noscript dangerouslySetInnerHTML={{
       __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N85SJMW"
       height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
        {children}
      </body>
    </html>
    </>
  )
}
