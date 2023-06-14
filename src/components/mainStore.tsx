"use client"
import { Avatar, Button, Input, Spinner, Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { useUserLocalStorage } from "@/hooks/useUserLocalStorage";
import { formDate } from "@/utils/formDate";
import { PencilSimple } from "@phosphor-icons/react";
import { useState } from "react"
import { FormSecond } from "./formSecond";
import { EditorStore } from "./editorStore";


export function MainStore() {
  const user  = useUserLocalStorage()
    const service_start_date = user !== undefined && formDate(`${user.service_start_date}`)
    const end_service_date = user !== undefined && formDate(`${user.end_service_date}`)
    const [openFormChief,setOpenFormChief] = useState(false)
    const [openEditor, setOpenEditor] = useState<boolean>(false)
  
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
      {
        user !== undefined && (
          <>
          <div className="min-w-full flex justify-end mb-6">
        <PencilSimple size={32} className="hover:text-blue-500 transition-all" onClick={() => setOpenEditor(true)}/>
    </div>
    <div>
    {
          openEditor && (
            <>
                <EditorStore value={{
                  name: user.name,
                  number: user.number,
                  address: user.address,
                  time_open: user.time_open,
                  time_close: user.time_close,
                }} />
                  <div className="w-full flex justify-center items-center mt-4">
                  <Button  className="bg-transparent text-black mt-4" onClick={() => setOpenEditor(false)}>
                      fechar
                  </Button>
                  </div>
            </>
          )
        }
    </div>
          <div className="rounded-full border border-blue-500 max-w-[100px] max-h-[100px]">
              <Avatar src={user.logo} size="xl" alt="user" />
            </div>
            <Typography variant="h2" className="my-4">
                {user.name}
            </Typography>
            <Typography className="my-2">
                {user.email}
            </Typography>
            <div className="flex flex-col lg:lflex-row gap-4">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="border-b border-r-0 border-t-0 border-l-0 border-blue-500 lg:py-4 lg:my-2 flex gap-1 py-3">
                  <span className="font-bold">Telefone:</span> {user.number}
                </div>
                <div className="border-b border-r-0 border-t-0 border-l-0 border-blue-500 lg:py-4 lg:my-2 flex gap-1 py-3">
                  <span className="font-bold">Endereço:</span> {user.address}
                </div>
              </div>
              <div className="w-full flex md:justify-end">
              <div className="flex flex-col gap-4">
                <div>
                  <span className="font-bold">Início do serviço:</span> {service_start_date}
                </div>
                <div>
                  <span className="font-bold">Termino do serviço:</span> {end_service_date}
                </div>
                <div>
                  <span className="font-bold">Hora de abrir:</span> {user.time_open}
                </div>
                <div>
                  <span className="font-bold">Hora de fechar:</span> {user.time_close}
                </div>
              </div>
            </div>
            </div>

              <div className="w-full">
              <div className="my-8 mx-4 max-w-[250px]">
                <Button onClick={() => setOpenFormChief(!openFormChief)}>{
                  !openFormChief? "Adicionar Chief" : "Fechar"
                }</Button>
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
    </div>  
    </main>  
  )
}

