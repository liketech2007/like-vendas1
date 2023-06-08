"use client"
import Footer from "@/components/footer";
import { HeaderSecond } from "@/components/headerSecond";
import { Button, Input, Spinner, Typography,Alert } from "@material-tailwind/react";
import z from "zod"
import { useForm,SubmitHandler } from "react-hook-form";
import { useState } from "react";
import CryptoJS from "crypto-js"
import { resetPassword } from "../auth/password";

const schema = z.object({
  email: z.string()
})
type IFormInput = z.infer<typeof schema>;

export default function ResetPassword() {
  const [error, setError] = useState<string | boolean>(false)
  const [errorText, setErrorText] = useState<string>("")
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("")
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const email = data.email;
    const res = await resetPassword(email);
    if(res !== "Nenhum usuário com estás informações") {
      const encryptedPassword = res; 
      const encryptionKey = process.env.NEXT_PUBLIC_ENCRIPTO_KEY; 
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, `${encryptionKey}`);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      setError(false)
      setPassword(decryptedPassword);
    }else {
      setError(true)
      setErrorText(res)
      setLoading(false)
    }
    setLoading(false);
  }
  return (
    <>
      <HeaderSecond />
      <main className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 min-h-[80vh] flex justify-center flex-col gap-6 items-center">
      <Typography variant="h1" className=" text-center my-8 mb-12">
        <span className="my-16 text-center">
        Recuparação de senha
        </span>
      </Typography>
      <Typography variant="paragraph" className="text-center">
        Digíte o teu email para recuperar a tua senha
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4">
        <div className="">
          <Input label="Email" {...register("email", { required: true , pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i})}/>
        </div>
        <div>
        <Button type="submit" className="flex gap-5 justify-center items-center">
            Recuperar
            { loading && <Spinner />}
          </Button>
        </div>
      </form>
      { 
      errors.email || error == true ?  (
        <Alert color="red" variant="gradient">
          {errorText  || "Preencha o compa em cima para continuar"}
        </Alert>
      ) : null}

      <div className="text m-6">Senha: {password}</div>
      </main>
      <Footer />
    </>
  )
}