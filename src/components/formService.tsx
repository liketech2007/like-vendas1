"use client"
import { Alert, Button, Input, Spinner, Textarea } from "@material-tailwind/react"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js"
import z from "zod"

const schema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
})
type IFormInput = z.infer<typeof schema>;

export function FormService() {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name,price,category,description } = data
    
    
    setLoading(false)
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="">
        <Input label="Nome" type="text" {...register("name", { required: true })}/>
      </div>
      <div className="">
        <Input label="Preço" type="number" {...register("price", { required: true })}/>
      </div>
      <div className="">
        <Input label="Categoria" type="text" {...register("category", { required: true })}/>
      </div>

      <div className="">
      <Textarea label="Descrição" {...register("description")}/>
    </div>
     
      <Button type="submit" className="flex justify-center items-center">
        Criar
        {
          loading && <Spinner />
        }
        </Button>
        {
            errors.name || errors.price || errors.category || errors.description  ? <div className="">
              <Alert color="red" variant="gradient">
              <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
            </Alert>
            </div> : null
          }
    </form>
  </div>
  )
}