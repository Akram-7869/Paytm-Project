"use client"
import { useSession } from "next-auth/react"



export default function() {
        const session=useSession()
        let ans=session.data?.user?.name||""
        let f=ans?.charAt(0).toUpperCase()
        ans=f+ans.slice(1)
        const date=new Date()
        let greeting ="Good Morning"
        let time=date.getHours()
        if(time>=12 && time<15 )
        {
        greeting="Good Afternoon"

        }
        else if(time>=15 && time<=19)
        {
        greeting="Good Evening"


        }
        else if(time>19 && time<0)
        {
        greeting="Good Night"
        }
        else
        {
        greeting="Good Morning"
        }




    return <div>
       <div className="font-bold text-violet-700 text-2xl pt-3" >
            {greeting+"  "+ans}
            <p className="pt-5">
               Welcome to the Venamo
            </p>
        </div>           
    </div>
}