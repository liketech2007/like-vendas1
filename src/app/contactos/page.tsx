import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Contactos() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 min-h-[80vh]">
      <h1 className="text-5xl font-bold my-4">Contatos</h1>
      <p className="my-4">Entre em contato conosco se tiver alguma dúvida, solicitação ou feedback.</p>

      <h2 className="text-3xl my-4">Informações de Contato:</h2>
      <ul className="m-6 flex flex-col gap-3">
        <li>Email: <a href="mailto:agenciacover1@gmail.com">agenciacover1@gmail.com</a></li>
        <li>Número de Telefone: <a href="tel:+244958552605">958552605</a></li>
        <li>Instagram: <a href="https://www.instagram.com/agenciacover1/">agenciacover1</a></li>
      </ul>
      </main>
      <Footer />
    </>
  )
}