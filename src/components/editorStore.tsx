"use client"

import { actionStoreUpdate } from "@/app/endpoints/store/update/action";
import { Alert, Button, Input, Spinner } from "@material-tailwind/react"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form";
import z from "zod"

const schema = z.object({
  name: z.string(),
  number: z.string(),
  file: z.string(),
  address: z.string(),
  time_open: z.string(),
  time_close: z.string(),
})
type IFormInput = z.infer<typeof schema>;

export function EditorStore({ type,value,id,nameFile }:any) {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")
  const [file, setFile] = useState<Blob | undefined>();
  const [fileName,setFileName] = useState(`${nameFile}`)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name,number,address,time_close,time_open} = data

    await actionStoreUpdate({id,number,name,address,time_close,time_open,logo:fileName})
    window.location.reload()
    setLoading(false)
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 my-4">
            <Input label="Nome da Loja" className="w-full" {...register("name", )} defaultValue={value.name}/>
            <Input  label="Telefone" type="tel" className="w-full" {...register("number", )} defaultValue={value.number} />
            <Input  label="logotipo" type="file" className="w-full" {...register("file", )} onChange={(e:any) => {
              const file = e.target.files[0]
              setFileName(file.name)
              const reader = new FileReader();
              reader.onload = function(evt:any) {
                const blob = new Blob([evt.target.result], { type: file.type })
                setFile(blob)
              };
              reader.readAsText(file);
            }}/>
            <Input  label="Endereço" className="w-full" {...register("address", )} defaultValue={value.address}/>
            <Input  label="Hora de Abrir" type="time" className="w-full" {...register("time_open", )} defaultValue={value.time_open}/>
            <Input  label="Hora de Fechar" type="time" className="w-full" {...register("time_close", )} defaultValue={value.time_close}/>
            
      <Button type="submit" className="flex justify-center items-center">
        Salvar alterações
        {
          loading && <Spinner />
        }
        </Button>
        {
            error || file === undefined ? <div className="">
              <Alert color="red" variant="gradient">
              <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
            </Alert>
            </div> : null
          }
    </form>
  </div>
  )
}