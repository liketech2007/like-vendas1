"use client"
import { updateService } from "@/app/endpoints/store/updateService/action"
import { searchStore } from "@/filteres/searchStore"
import { formDate } from "@/utils/formDate"
import { Alert, Button, Card, CardBody, Input, Typography } from "@material-tailwind/react"
import { useState } from "react"

export function MainAdim({ isStores, data}: any) {
    const stores = data[0].stores
    const feedbacks = data[0].feedbacks
    const [dataSearch, setDataSearch] = useState<any>()
    const [isAcess, setIsAces] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    stores.sort((a:any, b:any) => b.name - a.name);
    return (
        <>
            <main className="min-w-full flex flex-col justify-center items-center p-4">
                {
                    isAcess === false ? (
                        <div className="min-w-full min-h-[70vh] flex justify-center items-center flex-col gap-4">
                            <div className="max-w-[300px]  flex flex-col  justify-center items-center gap-4 my-4">
                                <Input type="password" label="Senha" onChange={(e) => {
                                    setPassword(`${e.target.value}`)
                                }} />
                                <Button onClick={() => {
                                    const certPassword = `${process.env.NEXT_PUBLIC_ENCRIPTO_KEY}`
                                    certPassword === password && setIsAces(true)
                                    certPassword!== password && setError("Palavra passe incorreta")
                                }}>Entrar</Button>
                            </div>
                            {
                            error.length > 0  ? <div className="">
                            <Alert color="red" variant="gradient">
                            <span>{error}</span>
                            </Alert>
                            </div> : null
                        }
                        </div>
                    ) : (
                    <div className="min-w-full flex justify-center items-center flex-col">
                    {
                    isStores === true ? (
                        <div className="min-w-full flex justify-center items-center flex-col">
                            <div className="min-w-full lg:max-w-[70%] lg:min-w-[70%] flex justify-center items-center gap-2 my-6">
                                <Input type="search" label="Nome, Email ou ID da loja" onChange={(e) => {
                                    const res = searchStore(stores,`${e.target.value}`)
                                    setDataSearch(res)
                                }} />
                                <Button>Pesquisar</Button>
                            </div>
                            {
                                dataSearch && (
                                    <div className="min-w-full lg:max-w-[70%] lg:min-w-[70%] my-8">
                                        <Card className="overflow-scroll lg:overflow-none min-w-full flex jusify-center">
                                <table className="text-center">
                                    <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Nome</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Email</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Telefone</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Endereço</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">D.I.S</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">D.T.S</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Actualizar serviço</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {dataSearch.map((store:any) => {
                                            return (
                                                <tr key={store.id}>
                                                    <td  className="px-2 py-4 text-xs">{store.item.name}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.item.email}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.item.number}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.item.address}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.item.service_start_date}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.item.end_service_date}</td>
                                                    <td  className="px-2 py-4 text-xs">
                                                        <Button
                                                            size="sm"
                                                            onClick={async () => {
                                                                const dataEnd = new Date()
                                                                const dataStart = new Date()
                                                                dataEnd.setDate(dataEnd.getDate() + 30)
                                                                await updateService(dataStart,dataEnd,store.item.id)
                                                                window.location.reload()
                                                            }}
                                                        >
                                                            Atualizar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                </Card>
                                    </div>
                                )
                            }

                            <div className="min-w-full lg:max-w-[70%] lg:min-w-[70%] my-8">
                            <Card className="overflow-scroll lg:overflow-none min-w-full flex jusify-center">
                                <table className="text-center">
                                    <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Nome</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Email</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Telefone</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Endereço</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">D.I.S</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">D.T.S</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">Actualizar serviço</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {stores.map((store:any) => {
                                            return (
                                                <tr key={store.id}>
                                                    <td  className="px-2 py-4 text-xs">{store.name}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.email}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.number}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.address}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.service_start_date}</td>
                                                    <td  className="px-2 py-4 text-xs">{store.end_service_date}</td>
                                                    <td  className="px-2 py-4 text-xs">
                                                        <Button
                                                            size="sm"
                                                            onClick={async () => {
                                                                const dataEnd = new Date()
                                                                const dataStart = new Date()
                                                                dataEnd.setDate(dataEnd.getDate() + 30)
                                                                await updateService(dataStart,dataEnd,store.id)
                                                                window.location.reload() 
                                                            }}
                                                        >
                                                            Atualizar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-wrap">
                            {
                                feedbacks.map((feedback:any) => {
                                    const date = formDate(feedback.created_at)
                                    return (
                                        <Card key={feedback.id} className="mt-6 w-96">
                                        <CardBody>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                             loja com ID {feedback.id_store}
                                            </Typography>
                                            <Typography>
                                                {feedback.content}
                                            </Typography>
                                            <Typography>
                                            Data: {date}
                                            </Typography>
                                        </CardBody>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    )
                }
                        </div>
                    )
                }
            </main> 
        </>
    )
}