export async function filterAdditionToday(additions:any,date:any) {
  const newdate = new Date(date)
  const data = additions.filter((addition:any) => {
    const dateAddition = new Date(addition.created_at)
    return dateAddition.getDate() === newdate.getDate() 
  })

  return data
}