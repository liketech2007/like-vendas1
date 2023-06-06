"use client"
import Footer from "@/components/footer";
import { HeaderSecond } from "@/components/headerSecond";
import { Button, Input, Spinner, Typography,Alert } from "@material-tailwind/react";
import z from "zod"
import { useForm,SubmitHandler } from "react-hook-form";
import { useState } from "react";

const schema = z.object({
  code: z.string()
})
type IFormInput = z.infer<typeof schema>;

export default function Cadastro() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);
    const code = data.code;
    setLoading(true);
  }
  return (
    <>
      <HeaderSecond />
      <main className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 min-h-[80vh] flex justify-center flex-col gap-6 items-center">
      <Typography variant="h1" className=" text-center my-8 mb-12">
        <span className="my-16 text-center">
        Confirmação de Email
        </span>
      </Typography>
      <Typography variant="p" className="text-center py-2">
        Enviamos um email com o codígo de confirmação para o seu email
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4">
        <div className="">
          <Input label="Codígo de Confirmação" {...register("code", { required: true })}/>
        </div>
        <div>
        <Button type="submit" className="flex gap-5 justify-center items-center">
            Continuar
            { loading && <Spinner />}
          </Button>
        </div>
      </form>
      { 
      errors.code && (
        <Alert color="red" variant="gradient">
          {errors.code.message || error}
        </Alert>
      )}
      </main>
      <Footer />
    </>
  )
}