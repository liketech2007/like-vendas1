"use client"
import { Alert, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Dialog, Input, Spinner, Textarea, Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { useUserLocalStorage } from "@/hooks/useUserLocalStorage";
import { formDate } from "@/utils/formDate";
import { Link, PencilSimple } from "@phosphor-icons/react";
import { useState } from "react"
import { FormSecond } from "./formSecond";
import { EditorStore } from "./editorStore";
import { useIdAuth } from "@/hooks/useIdAuth";
import CryptoJS from "crypto-js"
import { useRouter } from "next/navigation";
import z from "zod"
import { useForm,SubmitHandler } from "react-hook-form";
import { actionFeedbackCreate } from "@/app/endpoints/feedbacks/create/action";
import { useFunctionary } from "@/hooks/useFunctionary";

const schema = z.object({
  content: z.string(),
})
type IFormInput = z.infer<typeof schema>;


export function MainStore({ data }: any) {
  const [error, setError] = useState("")
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)
  const encryptedPassword = data.length  > 0 && data[0].password; 
  const encryptionKey = process.env.NEXT_PUBLIC_ENCRIPTO_KEY; 
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, `${encryptionKey}`);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  
  const user  = useUserLocalStorage()
  const id_auth = useIdAuth()
  const router = useRouter()
    const service_start_date = user !== undefined && formDate(`${user.service_start_date}`)
    const end_service_date = user !== undefined && formDate(`${user.end_service_date}`)
    const [openFormChief,setOpenFormChief] = useState(false)
    const [openEditor, setOpenEditor] = useState<boolean>(false)
    const [openFeedback, setOpenFeedback] = useState<boolean>(false)
    const functLocal = useFunctionary()
    const handleOpen = () => {
      setOpenFeedback((cur) => !cur);
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      setLoading(true)
      const id_store = user !== undefined ? user.id : 0
      const res = await actionFeedbackCreate({ content: data.content, id_store: functLocal === undefined ? Number(id_store) : functLocal.id_store,})
      if(typeof res !== "string") {
          setOpenFeedback(false)
        } else {
          setError("Error Tente novamente")
          setLoading(false)
        }
      setLoading(false)
  }  

  
  return (
    <main className="min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
      {
        user !== undefined && (
          <>
          <div className="min-w-full flex justify-end mb-6">
        <PencilSimple size={32} className="hover:text-blue-500 transition-all" onClick={() => setOpenEditor(!openEditor)}/>
    </div>
    <div>
    {
          openEditor && (
            <>
                <EditorStore id={user.id} nameFile={user.logo}  value={{
                  name: user.name,
                  number: user.number,
                  address: user.address,
                  time_open: user.time_open,
                  time_close: user.time_close,
                }} />
            </>
          )
        }
    </div>
          <div className="rounded-full border border-blue-500 max-w-[100px] max-h-[100px]">
              <Avatar src={user.logo} size="xl" alt="user" />
            </div>
            <Typography variant="h4" className="my-4 bg-blue-500 text-white p-3 rounded-lg max-w-[200px] text-center">
                {user.name}
            </Typography>
            <Typography className="my-2 mb-4 min-w-full border border-blue-500 border-b border-t-0  p-3 hover:text-white hover:bg-blue-500 shadow-lg rounded-lg">
                {user.email}
            </Typography>
            <div className="min-w-full flex flex-col lg:lflex-row gap-4">
            <div className="min-w-full flex flex-col justify-start items-start gap-4">
              <div className="min-w-full border border-blue-500 border-b border-t-0  p-3 hover:text-white hover:bg-blue-500 shadow-lg rounded-lg">
                  <span className="font-bold">Telefone:</span> {user.number}
                </div>
                <div className="min-w-full border border-blue-500 border-b border-t-0  p-3 hover:text-white hover:bg-blue-500 shadow-lg rounded-lg">
                  <span className="font-bold">Endereço:</span> {user.address}
                </div>
              </div>
              <div className="min-w-full flex">
              <div className="min-w-full flex flex-col gap-4">
                <div className="min-w-full border border-blue-500 border-b border-t-0  p-3 hover:text-white hover:bg-blue-500 shadow-lg rounded-lg">
                  <span className="font-bold">Início do serviço:</span> {service_start_date}
                </div>
                <div className="min-w-full border border-blue-500 border-b border-t-0  p-3 hover:text-white hover:bg-blue-500 shadow-lg rounded-lg">
                  <span className="font-bold">Termino do serviço:</span> {end_service_date}
                </div>
                <div className="min-w-full border border-blue-500 border-b border-t-0  p-3 hover:text-white hover:bg-blue-500 shadow-lg rounded-lg">
                  <span className="font-bold">Hora de abrir:</span> {user.time_open}
                </div>
                <div className="min-w-full border border-blue-500 border-b border-t-0  p-3 hover:text-white hover:bg-blue-500 shadow-lg rounded-lg">
                  <span className="font-bold">Hora de fechar:</span> {user.time_close}
                </div>
              </div>
            </div>
            </div>
          </>
        )
      }
      { 
          openFormChief && (
            <div className="max-w-[300px]">
              <FormSecond type="chief"/>
            </div>
          )
      }

      <div className="fixed bottom-5 right-5">
        <Button onClick={() => setOpenFeedback(true)}>Enviar Feedback</Button>
      </div>

      <div>
      <Dialog
          size="xs"
          open={openFeedback}
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
                Enviar Feedback
              </Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-4">
              <Textarea label="O que achou da plataforma e críticas" {...register("content", { required: true })}/>
              
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
    </div>  
    </main>  
  )
}

