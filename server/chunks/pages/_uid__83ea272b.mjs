import path from 'path';
import fs from 'fs/promises';

const GET=async({request})=>{
    const uid = request.url.split("/")[4];
    const filePathData = path.join(process.cwd(), 'client', 'base', 'base.json');
    console.log(filePathData);
    console.log( path.join(process.cwd(),  'base', 'base.json'));
    try {
        const data = JSON.parse(await fs.readFile(filePathData, 'utf8'));
        const objectEvento=data.data.find(event=>event.uid==uid);
        
        return new Response(
          JSON.stringify({
            message: "¡Éxito!",
            files: objectEvento,
          }),
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
      }
    return new Response(JSON.stringify({
        msg:"hola"
    }))
};

export { GET };
