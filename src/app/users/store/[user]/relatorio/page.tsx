import { HeaderDashboard } from "@/components/headerDashbord";
import { MainRelatorio } from "@/components/mainRelatorio";

export default function Relatorio({ searchParams }:any) {
  const type = searchParams.type;
  return (
    <>
      <HeaderDashboard />
      <MainRelatorio type={type}/>
    </>
  )
}