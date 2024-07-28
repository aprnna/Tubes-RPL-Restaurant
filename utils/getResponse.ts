import { NextResponse } from "next/server"

export default async function getResponse(data:any, message:string, status:number=200) {
  return NextResponse.json({ data, message, status })
}
