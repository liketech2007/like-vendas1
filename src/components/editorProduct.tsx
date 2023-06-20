"use client"
import { actionProductUpdate } from "@/app/endpoints/product/update/action";
import { Alert, Button, Input, Spinner, Textarea } from "@material-tailwind/react"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form";
import z from "zod"

const schema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  quantity: z.number(),
  minimum_stock_level: z.number(),
  description: z.string(),
})
type IFormInput = z.infer<typeof schema>;

export function EditorProduct({ value }:any) {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name,price,category,quantity,minimum_stock_level,description } = data
    await actionProductUpdate({ name,price,category,quantity,minimum_stock_level,description,id:value.id })
    window.location.reload()
    setLoading(false)
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 my-4">
    <div className="">
        <Input label="Nome" type="text" {...register("name", )} defaultValue={value.name}/>
      </div>
      <div className="">
        <Input label="Preço" type="number" {...register("price", )} defaultValue={value.price}/>
      </div>
      <div className="">
        <Input label="Quantidade" type="number" {...register("quantity", )} defaultValue={value.quantity}/>
      </div>
      <div className="">
        <Input label="Categoria" type="text" {...register("category", )} defaultValue={value.category}/>
      </div>
      <div className="">
        <Input label="Nivel minímo de stock" type="number" {...register("minimum_stock_level", )} defaultValue={value.minimum_stock_level}/>
      </div>
      <div className="">
      <Textarea label="Descrição" {...register("description")} defaultValue={value.description}/>
    </div>
      
      <Button type="submit" className="flex justify-center items-center">
        Salvar alterações
        {
          loading && <Spinner />
        }
        </Button>
        {
            error ? <div className="">
              <Alert color="red" variant="gradient">
              <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
            </Alert>
            </div> : null
          }
    </form>
  </div>
  )
}