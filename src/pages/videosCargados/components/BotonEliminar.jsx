import React, { useState } from "react";
import { showToast } from "../../toast";
import {modalMensaje} from '../../modal'
import ModalAdvertencia from "./ModalAdvertencia"; // Import the ModalAdvertencia component

export default function BotonEliminar({ idVideo, uidEvento }) {
  const [showModal, setShowModal] = useState(false); // Add state for showing the modal

  const handleClick = async () => {
    modalMensaje('hola')
    setShowModal(true); // Show the modal when the button is clicked
  };

  const handleConfirm = async () => {
    const res = await fetch("/api/eliminarvideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: !idVideo
        ? JSON.stringify({ uidEvento: uidEvento })
        : JSON.stringify({
            uidEvento: uidEvento,
            idVideo: idVideo,
          }),
    });

    showToast("Elemento Eliminado", 25000);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const handleCancel = () => {
    setShowModal(false); // Hide the modal when cancel is clicked
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

