import Header from "@/components/header"
import { actionStoreCreate } from "./endpoints/store/create/action"
import Footer from "@/components/footer"
/*import CryptoJS from "crypto-js"
 const dateInit = new Date()
  const dateEnd = new Date()
  dateEnd.setDate(dateEnd.getDate() + 1)
  const loja = {
    email: "exemple@gmai.com",
    password: CryptoJS.AES.encrypt("cangongo2007", `${process.env.NEXT_PUBLIC_ENCRIPTO_KEY}`).toString(),
    name: "loja",
    address: "enderesso",
    number: "999 999 999",
    logo: "mslkjmn,jewgg",
    service_start_date: `${dateInit}`,
    end_service_date: `${dateEnd}`,
  }
  const res = await actionStoreCreate(loja)
  console.log(res)*/
export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>Home</h1>
      </main>
      <Footer />
    </>
  )
}
