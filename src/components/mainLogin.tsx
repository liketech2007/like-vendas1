
"use client"
import { Alert, Button, Input, Spinner, Typography,Radio } from "@material-tailwind/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js"
import z from "zod";
import { signup } from "@/app/auth/signup";
import Link from "next/link";

const schema = z.object({
  email: z.string(),
  password: z.string(),
  
});
type IFormInput = z.infer<typeof schema>;

export function MainLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState<string>("")
  const [typeSign, setTypeSign] = useState("store")


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
   setLoading(true);
    const { email, password } = data;
    const type = typeSign
    const newPassword = CryptoJS.AES.encrypt(password, `${process.env.NEXT_PUBLIC_ENCRIPTO_KEY}`).toString()
    const res = await signup(email,newPassword,type)
    if(res === "Nenhum usuário com estás informações" || res === "Usuário não está autenticado") {
      setError(true)
      setErrorText(res)
      setLoading(false)
    }else {
      setError(false)
      localStorage.setItem("user",JSON.stringify({
        exp: `${date}`,
        data: res
      }))
      window.location.href = "/"
    }
    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 min-h-[80vh]">
      <Typography variant="h2" className="my-8 mb-12">
        <div className="my-16 text-center">Entrar já</div>
      </Typography>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex-row">
        <div>
          <img
            src="https://media.graphassets.com/Ad3UMdXLQkuZqMdgIrLw"
            alt="login"
            className="w-full h-full"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-8 flex-col justify-center">
            <div className="flex gap-4">
              <Radio id="html" name="type" label="loja" onChange={() => setTypeSign("store")}/>
              <Radio id="html" name="type" label="chefe" onChange={() => setTypeSign("chief")}/>
              <Radio id="react" name="type" label="funcionário" onChange={() => setTypeSign("functionary")}/>
              </div>
              <hr />
              <Input
                label="Email"
                className="w-full"
                {...register("email", {
                  required: true,
                  pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i,
                })}
              />
              
              <div>
                <Input
                  type="password"
                  label="Password"
                  className="w-full"
                  {...register("password", {
                    required: true,
                    pattern: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/i,
                  })}
                />
                <p className="text-xs font-thin">
                  8 Digítos, 1 Letra minúscula, 1 Maiúscula e 1 Número
                </p>
                {
                  typeSign === "store" ? ( <Link href="/esqueceu-password" className="hover:text-black text-blue-500 transition-all text-xs flex justify-end mt-4">Esqueceu a senha</Link>) : null 
                }
              </div>
          <Button
            type="submit"
            className="flex gap-5 justify-center items-center"
          >
            Entrar
            {loading && <Spinner />}
          </Button>
          { 
          errors.email ||
          errors.password  || error == true ?  (
            <Alert color="red" variant="gradient">
              {errorText  || "Preencha o compa em cima para continuar"}
            </Alert>
          ) : null}
        </form>
      </div>
    </main>
  );
}
