
import React from 'react';

const ModalAdvertencia = ({ onConfirm, onCancel }) => {
  return (
    <div className="  top-0 rounded-lg p-2 z-50 left-0 w-full backdrop-blur-sm h-screen duration-500 bg-white/80 text-xs text-gray-800">
      <div className="text-center z-30 flex items-center font-bold flex-col justify-center gap-5 h-full">
        <p>¿Estás seguro de que deseas eliminar este evento?</p>
        <div className="modal-buttons flex items-center gap-3 ">
          <button onClick={onConfirm} className="px-2 py-0.5 rounded-lg bg-blue-500 text-white hover:bg-blue-400 duration-300">Confirmar</button>
          <button onClick={onCancel}  className="px-2 py-0.5 rounded-lg bg-blue-500 text-white hover:bg-blue-400 duration-300">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdvertencia;
