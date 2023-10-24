import {useEffect,useState} from 'react'

export default function Form() {
const [file, setFile] = useState(false)

useEffect(() => {

if (!file) {
    return
}

console.log(file)

}, [file])

const handleFileUp=(e)=>{
    
    console.log(e)
    const file=e.target.files[0]
setFile(file)
}


  return (
    <form  class="w-1/2 h-1/2 bg-red-400 flex flex-col items-center justify-normal">
    <div>
        <label htmlFor="rutaVideo">Selecciona un video</label>
        <input type="file" name="rutaVideo" id="rutaVideo" onChange={handleFileUp}/>

        
    </div>
</form>
  )
}
