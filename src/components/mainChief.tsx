"use client"
import { Button, Card, Input, Radio, Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { useState } from "react";
import { PencilSimple } from "@phosphor-icons/react";
import { EditorChiefEFunctionary } from "./editorChiefEFunctionary";
import CryptoJS from "crypto-js"


export function MainChief({ dataChief }:any) {
  const encryptedPassword = dataChief.length  > 0 && dataChief[0].password; 
  const encryptionKey = process.env.NEXT_PUBLIC_ENCRIPTO_KEY; 
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, `${encryptionKey}`);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

  const [openEditor, setOpenEditor] = useState<boolean>(false)

  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <div className="min-w-full flex justify-end mb-6">
        <PencilSimple size={32} className="hover:text-blue-500 transition-all" onClick={() => setOpenEditor(true)}/>
    </div>
    <div>
    {
          openEditor && (
            <>
                <EditorChiefEFunctionary type="chief" value={dataChief[0].name} />
                  <div className="w-full flex justify-center items-center mt-4">
                  <Button  className="bg-transparent text-black mt-4" onClick={() => setOpenEditor(false)}>
                      fechar
                  </Button>
                  </div>
            </>
          )
        }
    </div>
    <div className="flex gap-2 justify-between flex-wrap">
    <div className="flex flex-col gap-6">
    <Typography variant="h1">
        {dataChief[0].name}
      </Typography>
      <div><span className="">Email:</span> {dataChief[0].email}</div>
      <div><span className="">Senha:</span> {decryptedPassword}</div>
    </div>
  
    </div>  
    </div>
    </main>  
  )
}