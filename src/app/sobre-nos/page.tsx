import Footer from "@/components/footer";
import Header from "@/components/header";

export default function SobreNos() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 min-h-[80vh]">
      <h1 className="text-5xl font-bold my-4">Sobre Nós</h1>
        <p className="my-4">A Cover é uma agência de marketing com sede em Angola, dedicada à excelência, inovação e criatividade. Nosso objetivo é ajudar nossos clientes a alcançarem o sucesso por meio de estratégias de marketing eficazes.</p>

        <h2 className="text-3xl my-4">O que nos diferencia:</h2>
        <ul className="m-6 flex flex-col gap-3" >
          <li>Excelência: Nossa equipe é composta por profissionais experientes e qualificados, comprometidos em fornecer serviços de qualidade excepcional.</li>
          <li>Inovação: Acompanhamos as últimas tendências e tecnologias do mercado para oferecer soluções inovadoras e eficientes aos nossos clientes.</li>
          <li>Criatividade: Valorizamos a criatividade em todos os nossos projetos, buscando abordagens originais e impactantes para promover as marcas dos nossos clientes.</li>
        </ul>

        <h2 className="text-3xl my-4">Nossos Serviços:</h2>
        <ul className="m-6 flex flex-col gap-3">
          <li>Estratégias de Marketing Digital</li>
          <li>Desenvolvimento de Sites e Aplicativos</li>
          <li>Gestão de Redes Sociais</li>
          <li>Criação de Conteúdo Criativo</li>
          <li>Campanhas de Publicidade Online</li>
        </ul>
      </main>
      <Footer />
    </>
  )
}