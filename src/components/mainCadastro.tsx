"use client"
import { actionStoreCreate } from "@/app/endpoints/store/create/action";
import { uploadFile } from "@/app/upload/file";
import { Alert, Button, Input, Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js"
import z from "zod"
import { authCreate } from "@/app/auth/create/auth";
import { authSign } from "@/app/auth/sign/auth";

const schema = z.object({
  email: z.string(),
  password: z.string(),
  nameStore: z.string(),
  tel: z.string(),
  address: z.string(),
  time_open: z.string(),
  time_close: z.string(),
})
type IFormInput = z.infer<typeof schema>;


export function MainCadastro() {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<Blob | undefined>();
  const [fileName,setFileName] = useState("")
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password,nameStore:name,tel:number,address,time_close,time_open} = data
    const dateStart = new Date()
    const dateEnd = new Date()
    dateEnd.setDate(dateEnd.getDate() + 15)
    setLoading(true)
    const res = await uploadFile(file,fileName)
    await actionStoreCreate({ email,password: CryptoJS.AES.encrypt(password, `${process.env.NEXT_PUBLIC_ENCRIPTO_KEY}`).toString(),name,number,logo:`${res}`,address,time_close,time_open, service_start_date:dateStart, end_service_date:dateEnd })
    await authCreate({ email, password: CryptoJS.AES.encrypt(password, `${process.env.NEXT_PUBLIC_ENCRIPTO_KEY}`).toString()})
    setLoading(false)
  }
  return (
    <main className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 min-h-[80vh]">
      <Typography variant="h2" classname="my-8 mb-12">
        <div className="my-16 text-center">
        Cadastra-se já
        </div>
      </Typography>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex-row">
        <div>
          <img src="https://media.graphassets.com/Ad3UMdXLQkuZqMdgIrLw"  alt="login" className="w-full h-full"/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-8 flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-4">
            <Input  label="Email" className="w-full" {...register("email", { required: true, pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i })}/>
            <div>
            <Input type="password" label="Password" className="w-full" {...register("password", { required: true, pattern: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/i})}/>
            <p className="text-xs font-thin">
              8 Digítos, 1 Letra minúscula, 1 Maiúscula e 1 Número
            </p>
            </div>
            <Input label="Nome da Loja" className="w-full" {...register("nameStore", { required: true })}/>
            <Input  label="Telefone" type="tel" className="w-full" {...register("tel", { required: true })}/>
            <Input  label="logotipo" type="file" className="w-full" onChange={(e:any) => {
              const file = e.target.files[0]
              setFileName(file.name)
              const reader = new FileReader();
              reader.onload = function(evt:any) {
                const blob = new Blob([evt.target.result], { type: file.type })
                setFile(blob)
              };
              reader.readAsText(file);
            }}/>
            </div>
            <div className="flex flex-col gap-4">
            <Input  label="Endereço" className="w-full" {...register("address", { required: true })}/>
            <Input  label="Hora de Abrir" type="time" className="w-full" {...register("time_open", { required: true })}/>
            <Input  label="Hora de Fechar" type="time" className="w-full" {...register("time_close", { required: true })}/>
            </div>
          </div>
          <Button type="submit" className="flex gap-5 justify-center items-center">
            Criar
            { loading && <Spinner />}
          </Button>
          {
            errors && fileName.length == 0 ? <div className="">
              <Alert color="red" variant="gradient">
              <span>Preencha correctamento os campos acima para continuar.</span>
            </Alert>
            </div> : null
          }
        </form>
      </div>
    </main>

  )
}