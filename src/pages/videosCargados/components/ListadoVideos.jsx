import {useEffect,useState} from 'react'

export default function ListadoVideos() {
const [listadoVideos, setListadoVideos] = useState(null)
const [loading, setLoading] = useState(false)
    useEffect(() => {
setLoading(true)
        const fetching=async()=>{
try {
    const res =await fetch("/api/listarvideos")
    const data=await res.json()
    console.log(data)
    setListadoVideos(data)
   setLoading(false)
} catch (error) {
    console.log(error)
}
        }
        fetching()
    }, [])
    console.log(listadoVideos)
  return (
    <div>

   {
   listadoVideos?.map((video,i)=>(
        <div key={i}>
            <h2>{video.titleVideo}</h2>
        </div>
   ))
   }
</div>
  )
}


