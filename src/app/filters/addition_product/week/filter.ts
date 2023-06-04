export async function filterAdditionWeek(additions:any,days:number) {
  const newdate = new Date()
  newdate.setDate(newdate.getDate() - days)
  const data = additions.filter((addition:any) => {
    const dateAddition = new Date(addition.created_at)
    return dateAddition >= newdate
  })

  return data
}