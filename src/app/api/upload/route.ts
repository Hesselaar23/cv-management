import { saveEntry } from "@/lib/databaseUtils";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import {v4 as uuidv4} from 'uuid';

export async function POST(request:NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const name: string | null = data.get('name') as unknown as string
    const email: string | null = data.get('email') as unknown as string
    const phone: string | null = data.get('phone') as unknown as string

    if (!file || !name || !email || !phone) {
        return NextResponse.json({ succes: false})
    }

    let fileuuid = uuidv4();

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const currentDirectory = process.cwd();
    const extension = file.name.split('.').at(-1)
    const fileName = fileuuid + '.' +extension

    const path = join(currentDirectory, 'cv-files', fileName);

    await writeFile(path, buffer)
    await saveEntry({name, email, phone, file:fileName})
    console.log('open ${path} to see the upload file')
    return NextResponse.json({succes: true})
}