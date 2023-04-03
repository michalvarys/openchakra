import fs from 'fs';
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next';

const directoryPath = path.join(__dirname, '../../../../../public/pages')
const getJSONContent = async (file): Promise<any> => {
    try {
      const data = await fs.promises.readFile(file);
      return JSON.parse(data.toString())
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { body, url, method} = req;
    const name = url.split('/').pop().replace(/\/$/, '')
    const filename = `${directoryPath}/${name}.json`
    
    switch(method){
      case 'PATCH': 
      try {
        if(!fs.existsSync(filename)){
          throw new Error('File does not exist')
        }
        await fs.promises.writeFile(filename, JSON.stringify(body))
        res.status(200).json({ message: 'JSON file updated successfully' });
        
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
      case 'GET':
        try{
          const json = await getJSONContent(filename)
        return res.status(200).json(json)
        }catch(err){
          return res.status(500).json({ message: err.message })
        }
      case 'POST': 
        try {
          if(fs.existsSync(filename)){
            throw new Error('File already exists')
          }
          
          await fs.promises.writeFile(filename, JSON.stringify(body))
          res.status(201).json({ message: 'JSON file created successfully' });
        } catch (err) {
            return res.status(400).json({ message: err.message }); 
        }
      default: 
        return res.status(405).json({ message: 'Not implemented' });
    }
}