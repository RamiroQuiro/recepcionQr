import { useState, useEffect } from "react";
import CanvasReact from "./Canvas";

export default function ContenedorImagen() {
  const [src, setSrc] = useState(false);

  const onChangle = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(file);
    setSrc(url);
  };
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <div className="h-[50vh] w-full bg-white flex flex-col items-center p-5 rounded-lg shadow-lg">
        <span>edita tu invitacion con el qr </span>
        <div>
          <input
            onChange={onChangle}
            type="file"
            name="imgCredencial"
            id="imgCredencial"
          />
        </div>
 
          <CanvasReact className="  " src={src} />
      
      </div>
    </div>
  );
}
