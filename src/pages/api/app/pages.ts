import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path'
import fs from 'fs'
const directoryPath = path.join(__dirname, '../../../../../public/pages')

export default async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const files = await fs.promises.readdir(directoryPath);
    let jsonFiles = [];
    files.forEach(function (file) {
      if (file.endsWith('.json')) {
        jsonFiles.push(file);
      }
    });

    res.status(200).json({ files: jsonFiles.map((file) => path.basename(file, '.json')) });
  } catch (err) {
    res.status(500).json({ message: 'Unable to scan directory: ' + err.message})
  }
}