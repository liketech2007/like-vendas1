"use client"
import { useState } from "react"
import { Alert, Button, Card, CardBody, CardHeader, Dialog, Input, Spinner, Textarea, Typography } from "@material-tailwind/react";
import z from "zod"
import { useForm,SubmitHandler } from "react-hook-form";
import { actionNoteUpdate } from "@/app/endpoints/note/update/action";

const schema = z.object({
    content: z.string(),
    title: z.string(),
  })
type IFormInput = z.infer<typeof schema>;

export function EditorNote({ value,id}:any) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true)
      const { content,title } = data
       const res = await actionNoteUpdate({ id,title,content})
        if(typeof res !== "string") {
            window.location.reload()
          } else {
            setError("Error Tente novamente")
            setLoading(false)
          }
        setLoading(false)
    } 
    return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3 flex flex-col gap-4 my-4">
            <Input label="Titulo" className="w-full" {...register("title", )} defaultValue={value.title}/>
            <Textarea label="Escreve aqui o teu apontamento" {...register("content")} defaultValue={value.content} />
            <Button type="submit" className="flex justify-center items-center">
              Salvar alterações
              {
                loading && <Spinner />
              }
              </Button>
              {
                  errors.content  ||  error ? <div className="">
                    <Alert color="red" variant="gradient">
                    <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
                  </Alert>
                  </div> : null
                }
    </form>
      </div>
    )
}