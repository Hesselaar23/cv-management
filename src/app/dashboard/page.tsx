"use server"

import { getEntries } from "@/lib/databaseUtils"
import { DataTable } from "./dataTable"

export default async function Page(){
  const data = await getEntries()
  return <DataTable data={data}></DataTable>
}

