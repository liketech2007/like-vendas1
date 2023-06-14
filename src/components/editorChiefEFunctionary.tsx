"use client"
import { Alert, Button, Input, Spinner } from "@material-tailwind/react"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form";
import z from "zod"

const schema = z.object({
  name: z.string(),
})
type IFormInput = z.infer<typeof schema>;

export function EditorChiefEFunctionary({ type,value }:any) {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name } = data

    if(type == "chief") {

    }else {

    }
    setLoading(false)
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="">
        <Input label="Nome" type="text" defaultValue={value} {...register("name", )}/>
      </div>
      
      <Button type="submit" className="flex justify-center items-center">
        Salvar alteração
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