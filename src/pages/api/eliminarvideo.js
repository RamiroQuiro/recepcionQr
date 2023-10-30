import path from 'path'
import fs from 'fs'

export async function POST({request}) {
    const {id} = await request.json();
    const directoryPath = path.join(process.cwd(), 'public', 'upload');
    const filePathData = path.join(process.cwd(), 'public', 'base', 'base.json');
    
    try {
        const files = fs.readdirSync(directoryPath);
        const data = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
        // Find the index of the video with the given id
        const index = data.data.findIndex(video => video.id === id);
        
        if (index !== -1) {
            // Remove the video from the data array
            data.data.splice(index, 1);
            
            // Save the updated data to the JSON file
            fs.writeFileSync(filePathData, JSON.stringify(data));
            
            // Delete the video file from the upload directory
            const videoFileName = files.find(file => file.startsWith(id));
            if (videoFileName) {
                fs.unlinkSync(path.join(directoryPath, videoFileName));
            }
            
            return new Response(JSON.stringify({
                message: 'Video eliminado',
                status: 200
            }));
        } else {
            return new Response(JSON.stringify({
                message: 'Video no encontrado',
                status: 404
            }));
        }
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'Error al eliminar el video',
            status: 500
        }));
    }
}
