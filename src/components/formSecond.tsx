"use client"
import { Alert, Button, Input, Spinner } from "@material-tailwind/react"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js"
import z from "zod"

const schema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
})
type IFormInput = z.infer<typeof schema>;

export function FormSecond({ type }:any) {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { email, password, name } = data
    const newPassword = CryptoJS.AES.encrypt(password, `${process.env.NEXT_PUBLIC_ENCRIPTO_KEY}`).toString()
    if(type == "chief") {

    }else {

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
      <Button type="submit" className="flex justify-center items-center">
        Criar
        {
          loading && <Spinner />
        }
        </Button>
        {
            errors.email || errors.name || errors.password ? <div className="">
              <Alert color="red" variant="gradient">
              <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
            </Alert>
            </div> : null
          }
    </form>
  </div>
  )
}