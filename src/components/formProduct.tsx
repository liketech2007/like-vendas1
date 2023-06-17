"use client"
import { Alert, Button, Input, Spinner, Textarea } from "@material-tailwind/react"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js"
import z from "zod"
import { actionProductCreate } from "@/app/endpoints/product/create/action";
import { useUserLocalStorage } from "@/hooks/useUserLocalStorage";
import { useIdAuth } from "@/hooks/useIdAuth";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  quantity: z.number(),
  minimum_stock_level: z.number(),
  description: z.string(),
})
type IFormInput = z.infer<typeof schema>;

export function FormProduct() {
  const id_auth = useIdAuth()
  const router = useRouter()
  const user = useUserLocalStorage()
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name,price,category,quantity,minimum_stock_level,description } = data
    const id_store = user !== undefined ? user.id : 0
    const res = await actionProductCreate({name,price,category,quantity,minimum_stock_level,description,id_store})
    if(typeof res !== "string") {
      if(res[0].id) {
        router.push(`/users/store/${id_auth}/product/${res[0].id}`)
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
        <Input label="Preço" type="number" {...register("price", { required: true })}/>
      </div>
      <div className="">
        <Input label="Quantidade" type="number" {...register("quantity", { required: true })}/>
      </div>
      <div className="">
        <Input label="Categoria" type="text" {...register("category", { required: true })}/>
      </div>
      <div className="">
        <Input label="Nivel minímo de stock" type="number" {...register("minimum_stock_level", { required: true })}/>
      </div>
      <div className="">
      <Textarea label="Descrição" {...register("description")}/>
    </div>
     
      <Button type="submit" className="flex justify-center gap-2 items-center">
        Criar
        {
          loading && <Spinner />
        }
        </Button>
        {
            errors.name || errors.price || errors.category || errors.description || errors.minimum_stock_level || errors.quantity || error ? <div className="">
              <Alert color="red" variant="gradient">
              <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
            </Alert>
            </div> : null
          }
    </form>
  </div>
  )
}