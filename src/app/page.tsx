"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Main } from "@/components/main"
import { Seo } from "@/components/seo"

export default async function Home() {
  return (
    <>
      <Seo />
      <Header />
      <Main />
      <Footer />
    </>
  )
}
