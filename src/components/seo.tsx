import { NextSeo } from "next-seo";

export function Seo() {
    return (
    <NextSeo
      title="Like Vendas"
      description={`A Like Vendas é um site dedicado à gestão de estoque, especialmente desenvolvido para atender às necessidades de pequenas lojas. Com recursos intuitivos e eficientes, permite que os comerciantes controlem seus produtos, acompanhem o estoque disponível e realizem vendas de forma simples e organizada. Com a <span className="text-blue-500 font-bold">Like Vendas</span>, os proprietários de pequenas lojas têm acesso a uma plataforma prática e eficaz para gerenciar o estoque de seus produtos, otimizando assim suas operações e melhorando o atendimento aos clientes`}
      canonical={`${process.env.NEXT_PUBLIC_URL}`}
      openGraph={{
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
      }}
      twitter={{
        handle: '@likevendas',
        site: `${process.env.NEXT_PUBLIC_URL}`,
        cardType: 'https://media.graphassets.com/F4RsIolwQcu5SyuL0Up8',
      }}
    />
    )
}