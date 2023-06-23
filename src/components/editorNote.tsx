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
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [openEditor, setOpenEditor] = useState(false)
    const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
    const handleOpen = () => {
        setOpenDialog((cur) => !cur);
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true)
        const { content,title } = data

       const res = await actionNoteUpdate({ id,title,content})
        if(typeof res !== "string") {
            setOpenDialog(false)
            window.location.reload()
          } else {
            setError("Error Tente novamente")
            setLoading(false)
          }
        setLoading(false)
    } 
    return (
        <div>
      <Dialog
          size="xs"
          open={openDialog}
          handler={handleOpen}
          className="bg-transparent shadow-none min-w-full lg:min-w-[24rem] flex justify-center items-center"
        >
          <Card className="min-w-[80%] lg:min-w-[24rem] max-w-[80%] lg:max-w-[24rem]">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white" className="text-center">
                Adicionar Nota
              </Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-4">
               <Input type="text" label="Titulo"{...register("title", )} defaultValue={value.title} /> 
              <Textarea label="O que achou da plataforma e críticas" {...register("content", )} defaultValue={value.content} />
              
            </div>
            <div className="pt-0 flex gap-3 justify-center items-start p-4">
            <Button onClick={handleOpen} className="bg-transparent text-black" >
                Cancelar
              </Button>
              <Button type="submit" variant="gradient" className="flex gap-3" >
                Adicionar
                {
                  loading && <Spinner />
                }
              </Button>
            </div>
            <div className="my-3 p-4">
                    {
                  errors.content  ||  error ? <div className="">
                    <Alert color="red" variant="gradient">
                    <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
                  </Alert>
                  </div> : null
                }
              </div>
            </form>
          </Card>
        </Dialog>
      </div>
    )
}