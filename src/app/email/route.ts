import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET(resquest: Request){
  const url = new URLSearchParams(`${resquest.url}`)
  const to = url.get("email")
  const subject = url.get("subject")
  const html = url.get("html")
  const email = {
    to: `${to}`,
    subject: `${subject}`,
    html: `${html}`,
  }
  console.log(email)
  
  const smtpOptions = {
    host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.mailtrap.io",
    port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || "2525"),
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER || "user",
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD || "password",
    },
  }
    const transporter = nodemailer.createTransport({
      ...smtpOptions,
})
    const res = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_SMTP_FROM_EMAIL,
      ...email,
    })
console.log(res,smtpOptions)
   return NextResponse.json({text: "success"}) 
}