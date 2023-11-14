import React from "react";
import { showToast } from "../../toast";

export default function BotonEliminar({ idVideo, uidEvento }) {
  const handleClick = async () => {
    const res = await fetch("/api/eliminarvideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: !idVideo
        ? JSON.stringify({ uidEvento: uidEvento })
        : JSON.stringify({
            uidEvento:uidEvento,
            idVideo:idVideo,
          }),
    });

    showToast('Elemento Eliminado',25000)
    setTimeout(()=>{
window.location.reload()
    },1200)
  };
  return (
    <button
      onClick={handleClick}
      className="font-black text-xl hover:scale-125 duration-150 z-30 rotate-45   bg-white rounded-full w-8 h-8 "
    >
      +
    </button>
  );
}
