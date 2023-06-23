"use client"
import { actionAdditionDelete } from "@/app/endpoints/addition_product/delete/action";
import { actionFunctionayDelete } from "@/app/endpoints/functionary/delete/action";
import { actionNoteDelete } from "@/app/endpoints/note/delete/action";
import { actionProductDelete } from "@/app/endpoints/product/delete/action";
import { updateQuatProduct } from "@/app/endpoints/product/updateQuat/action";
import { actionSaleDelete } from "@/app/endpoints/sale_product/delete/action";
import { useIdAuth } from "@/hooks/useIdAuth";
import { Spinner } from "@material-tailwind/react";
import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Delete({ id, type, quat}: any) {
    const [loanding, setLoading] = useState(false);
    const router = useRouter()
    const id_auth = useIdAuth()

    const deleteItem = async () => {
        setLoading(true);
        if (type === "functionary") {
            await actionFunctionayDelete(Number(id));
            router.push(`/users/store/${id_auth}/functionarys`)
          } else if (type === "product") {
            await actionProductDelete(Number(id));
            router.push(`/users/store/${id_auth}/products`)
          } else if (type === "sale") {
            await actionSaleDelete(Number(id));
            await updateQuatProduct(id,quat)
            window.location.reload();
          } else if (type === "note") {
            await actionNoteDelete(Number(id))
            window.location.reload();
          } else {
            await actionAdditionDelete(Number(id));
            await updateQuatProduct(id,quat)
            window.location.reload();
          }          
       setLoading(false);
    }
    return (
        <div className="p-1 text-red-500 hover:text-black flex justify-center items-center gap-2" onClick={deleteItem}>
            
            {
                loanding === true ? <Spinner className="text-blue-500" /> : <Trash size={32} />
            }
        </div>
    )
}