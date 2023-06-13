export function formDate(date: string): string {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1)
  const day = String(newDate.getDate())
  return `${day.length == 1 ? "0"+day : day}-${month.length == 1 ? "0"+month : month}-${year}`;
}