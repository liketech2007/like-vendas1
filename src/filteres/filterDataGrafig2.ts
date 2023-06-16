import { formDate } from "@/utils/formDate";

export function filterDataGrafig2(data:any,date:any) {
    const newDate = new Date(date);
    const dateForm = formDate(`${newDate}`)
    const res =  {
            label: `${dateForm}`,
            value: data.reduce((acc:any,v:any) => {
                return acc + v.value
            },0)
        }
    return res
}