import { useEffect, useState } from 'react'

export default function Formulario() {
  const [file, setFile] = useState(false)
  const [fomulario, setFomulario] = useState({})

  useEffect(() => {

    if (!file) {
      return
    }

    console.log(file)

  }, [file])

  const handleFileUp = (e) => {

    console.log(e)
    const file = e.target.files[0]
    setFile(file)
  }
  const handleChange = (e) => {
    setFomulario((state) => ({
      ...state, [e.target.name]: e.target.value
    }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/upload",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: fomulario.titleVideo,
            descripcion: fomulario.descripcionVideo,
            file:file
          }),
        })
      const data = await response.json()
      console.log(data)


    } catch (error) {
      console.log(error)
    }


  }

  return (
    <form class="w-1/2 h-1/2 bg-red-400 flex flex-col items-center justify-normal">
      <div>
        <label htmlFor="rutaVideo">Selecciona un video</label>
        <input type="file" name="rutaVideo" id="rutaVideo" onChange={handleFileUp} />
      </div>
      <div>
        <label htmlFor="titleVideo">Selecciona un video</label>
        <input type="text" name="titleVideo" id="titleVideo" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="descripcionVideo">Selecciona un video</label>
        <input type="text" name="descripcionVideo" id="descripcionVideo" onChange={handleChange} />
      </div>

      <button onClick={handleClick}>enviar</button>
    </form>
  )
}
