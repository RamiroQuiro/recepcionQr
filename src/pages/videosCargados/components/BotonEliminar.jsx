import React, { useState } from "react";
import {modalMensaje} from '../../modal'
import ModalAdvertencia from "./ModalAdvertencia"; // Import the ModalAdvertencia component

export default function BotonEliminar({ idVideo, uidEvento }) {
  const [showModal, setShowModal] = useState(false); // Add state for showing the modal

  const handleClick = async () => {
    modalMensaje(idVideo ? '¿Estás seguro que desea eliminar el video?' : '¿Estás seguro que desea eliminar el evento?', uidEvento, idVideo);
  };


  return (
    <>{showModal && ( // Render the modal if showModal is true
    <ModalAdvertencia
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  )}
      <button
        onClick={handleClick}
        className="font-black text-xl hover:scale-125 duration-150 z-30 rotate-45   bg-white rounded-full w-8 h-8 "
      >
        +
      </button>
      
    </>
  );
}

