import React from "react";
import { storageModal } from "../../../../context/modalLector";
import { useStore } from "@nanostores/react";

export default function ModalLector({ uidEvento }) {
  const $modalOpen = useStore(storageModal);
  if ($modalOpen.modalOpen) {
    const handleCerrarModal = () => {
      storageModal.set({
        modalOpen: false,
      });
    };
    return (
      <div
        id="modalLector"
        class={`${
          !$modalOpen.modalOpen ? "opacity-0" : "opacity-100"
        } bg-gray-800/50 backdrop-blur-sm absolute duration-300 top-0 left-0  flex items-center justify-center z-40 w-full h-full`}
      >
        <div
          id="qrEquivocado"
          class="absolute top-1/4 invisible z-30 py-1 px-2 rounded-lg bg-red-500/80 backdrop-blur-sm text-gray-100 text-xl  font-bold duration-200"
        >
          <p id="mensajeError"></p>
        </div>
        <div class="absolute top-7 right-10">
          <button onClick={handleCerrarModal} class="rounded-full p-2 bg-white">
            ❌
          </button>
        </div>
        <div class="bg-white absolute  rounded  items-center justify-center w-52 h-52"></div>
      </div>
    );
  }
}
