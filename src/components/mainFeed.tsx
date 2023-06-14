"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { CardPost } from "./cardPost";

export function MainFeed() {
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1">
        Feed
      </Typography>
      <div className="w-[80%] my-4 flex flex-wrap gap-6">
        <CardPost link="#" namefunctionary="Oscar" product="arroz" price="250" date="23-03-2023" />
      </div>
    </div>
   </main>
  )
}