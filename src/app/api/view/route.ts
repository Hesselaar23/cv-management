// pages/api/view/[fileName].ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const cvFilesDirectory = path.join(process.cwd(), 'api', 'view');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileName } = req.query;

  if (fileName && typeof fileName === 'string') {
    const filePath = path.join(cvFilesDirectory, fileName);

    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        console.error(err);
        res.status(404).end('CV not found');
      } else {
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      }
    });
  } else {
    res.status(400).end('Bad Request');
  }
}
