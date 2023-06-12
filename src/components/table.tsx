"use client"
import { Card, Typography } from "@material-tailwind/react";

interface ITable {
  tableHeard: any[]
  tableRows: any[]
}
 
export default function Table({ tableHeard, tableRows}:ITable) {
  return (
    <Card className="overflow-scroll lg:overflow-none">
      <table className="text-center">
        <thead>
          <tr>
            {tableHeard.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        <tr className="even:bg-blue-gray-50/50">
          {tableRows.map((item, index) => (
              <td key={index} className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.value}
                </Typography>
              </td>
          ))}
          </tr>
        </tbody>
      </table>
    </Card>
  );
}