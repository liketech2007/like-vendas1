"use client"
import { Button } from "@material-tailwind/react";
import Link from "next/link";


export function Main() {
    return (
        <main className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 min-h-[80vh]">
        <div className="flex flex-col justify-between items-center lg:flex-row my-4 gap-4 min-h-[70%] mb-12">

          <div className="flex flex-col justify-between gap-10">
            <h1 className="text-5xl font-bold leading-relaxed">Chega de gerênciar a sua loja manualmente!</h1>
            <p>15 dias grátis</p>
            <div className="max-w-[300px]">
              <Button variant="gradient" size="sm" fullWidth className="mb-2 ">
              <Link href="/cadastro">
              <span>Expermente já</span>
              </Link>
            </Button>
            </div>
            
          </div>

          <div id="radial" className="min-w-[50%] rounded-full bg-origin-content flex justify-center items-center">
          <img src="https://media.graphassets.com/CH3zVl2ZQl6FbcJrVSTy" alt="foto" />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col gap-3 my-12 min-h-[70%]">
          <p className="text-3xl text-center max-w-[400px]">
            A <span className="text-blue-500 font-bold">Like Vendas</span> é um site de gestão de stock para pequenas lojas
          </p>
          <p className="my-4 text-center max-w-[800px]">
            A <span className="text-blue-500 font-bold">Like Vendas</span> é um site dedicado à gestão de estoque, especialmente desenvolvido para atender às necessidades de pequenas lojas. Com recursos intuitivos e eficientes, permite que os comerciantes controlem seus produtos, acompanhem o estoque disponível e realizem vendas de forma simples e organizada. Com a <span className="text-blue-500 font-bold">Like Vendas</span>, os proprietários de pequenas lojas têm acesso a uma plataforma prática e eficaz para gerenciar o estoque de seus produtos, otimizando assim suas operações e melhorando o atendimento aos clientes.
          </p>
        </div>

        <div className="my-12 min-w-full mx-2 flex justify-center items-center max-h-[300px] lg:max-h-[800px] lg:h-[800px]">
        <iframe className="w-full h-full" src="https://www.youtube.com/embed/80MzFKnGpQ0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row my-12 mb-12 gap-3 min-h-[70%]">
        <div id="radial" className="min-w-[50%] rounded-full bg-origin-content flex justify-center items-center">
            <img src="https://media.graphassets.com/l9inQ4T9G0cpRlv37Dlw" alt="foto" />
          </div>
          <div>
            <h3 className="text-2xl font-blod text-blue-500 my-4">Cadastro de Produtos Descomplicado</h3>
            <p className="m-4">
            Adicionar e gerenciar seus produtos nunca foi tão fácil. Com o Like Vendas, você pode cadastrar todas as informações essenciais, como nome, descrição, preço e quantidade inicial, em poucos cliques. Tenha uma visão completa dos seus itens valiosos e saiba exatamente o que precisa ser reposto.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row my-12 mb-12 gap-3 min-h-[70%]">
        
          <div>
            <h3 className="text-2xl font-blod text-blue-500 my-4">Controle de Estoque Simplificado</h3>
            <p className="m-4">
            Nossa plataforma intuitiva e fácil de usar permite que você mantenha seu estoque sempre atualizado. Registre suas vendas e veja automaticamente as quantidades disponíveis dos produtos. Nunca perca uma venda por falta de estoque novamente!
            </p>
          </div>

          <div id="radial" className="min-w-[50%] rounded-full bg-origin-content flex justify-center items-center">
            <img src="https://media.graphassets.com/O5EVoQmSGWSZp9WJLgO5" alt="foto" />
          </div>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row my-12 mb-12 gap-3 min-h-[70%]">
        <div id="radial"  className="min-w-[50%] rounded-full bg-origin-content flex justify-center items-center">
            <img src="https://media.graphassets.com/m82RcWaARV6Hakx23X1k" alt="foto" />
          </div>
          <div>
            <h3 className="text-2xl font-blod text-blue-500 my-4">Relatórios e Análises Detalhados</h3>
            <p className="m-4">
            Tenha acesso a relatórios abrangentes e análises inteligentes sobre vendas, estoque, desempenho de produtos e muito mais. Tome decisões informadas, identifique tendências e oportunidades de crescimento. Aproveite ao máximo cada aspecto do seu negócio.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row my-12 mb-12 gap-3 min-h-[70%]">
        
        <div>
          <h3 className="text-2xl font-blod text-blue-500 my-4">Contas de Funcionários e Conta de Chefe</h3>
          <p className="m-4">
          Gerencie sua equipe com facilidade! Crie contas para seus funcionários e atribua a eles acesso restrito para registrar vendas e produtos. Mantenha-se informado sobre as atividades da sua equipe e promova uma maior colaboração. Como chefe, você terá privilégios adicionais para gerenciar todas as operações do sistema, acessar relatórios avançados e muito mais.
           </p>
        </div>

        <div id="radial"  className="min-w-[50%] rounded-full bg-origin-content flex justify-center items-center">
          <img src="https://media.graphassets.com/oDbk1sPgQcylfZoRuN9A" alt="foto" />
        </div>
      </div>

      <div className="flex justify-center items-center  my-12 mb-12">
      <div className="max-w-[400px]">
              <Button variant="gradient" size="sm" fullWidth className="mb-2 ">
              <Link href="/cadastro">
              <span>Expermente já</span>
              </Link>
            </Button>
      </div> 
      </div>
      </main>
    )
}