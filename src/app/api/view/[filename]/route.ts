import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import mime from 'mime'

const cvFilesDirectory = path.join(process.cwd(), 'cv-files')

export async function GET(req: NextApiRequest, { params: { filename } }: { params: { filename: string } }) {

  if (filename && typeof filename === 'string') {
    const filePath = path.join(cvFilesDirectory, filename)

    try {
      const stream = fs.readFileSync(filePath)
      const mime_type = mime.getType(filePath)
      return new NextResponse(stream, {
        headers: {
            'Content-Type': mime_type,
            'Cache-Control': 'immutable',
        },
    });
    } catch(r){return new NextResponse("CV not found", { status: 404 })}
  } else {
    return new NextResponse("BAD Request", { status: 400 })
  }
}
