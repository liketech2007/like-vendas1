"use client"
import { Alert, Button, Input, Spinner } from "@material-tailwind/react"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js"
import z from "zod"
import { useUserLocalStorage } from "@/hooks/useUserLocalStorage";
import { actionChiefCreate } from "@/app/endpoints/chief/create/action";
import { actionFunctionaryCreate } from "@/app/endpoints/functionary/create/action";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
})
type IFormInput = z.infer<typeof schema>;

export function FormSecond({ type }:any) {
  const user = useUserLocalStorage()
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { email, password, name } = data
    const newPassword = CryptoJS.AES.encrypt(password, `${process.env.NEXT_PUBLIC_ENCRIPTO_KEY}`).toString()
      const id_auth = user !== undefined ? user.id_auth : ""
      const id_store = user !== undefined ? user.id : 0
      const res = type === "chief" ? await actionChiefCreate({name,email,password:newPassword,id_auth,id_store}) : await actionFunctionaryCreate({name,email,password:newPassword,id_auth,id_store})
      if(typeof res !== "string") {
        if(res[0].id) {
          type === "chief" ?  window.location.reload() : router.push(`/users/store/${id_auth}/functionary/${res[0].id}`)
        } else {
          setError("Error Tente novamente")
          setLoading(false)
        }
      }else {
        setError("Error Tente novamente")
        setLoading(false)
      }
    setLoading(false)
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="">
        <Input label="Nome" type="text" {...register("name", { required: true })}/>
      </div>
      <div className="">
        <Input label="Email" type="email" {...register("email", { required: true, pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i })}/>
      </div>
      <div className="">
        <Input label="Password" type="password" {...register("password", { required: true, pattern: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/i})}/>
      </div>
      <Button type="submit" className="flex justify-center gap-2 items-center">
        Criar
        {
          loading && <Spinner />
        }
        </Button>
        {
            errors.email || errors.name || errors.password || error ? <div className="">
              <Alert color="red" variant="gradient">
              <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
            </Alert>
            </div> : null
          }
    </form>
  </div>
  )
}