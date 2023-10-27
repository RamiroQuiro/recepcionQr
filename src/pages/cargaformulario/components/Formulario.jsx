import { FormEvent, useState } from "react";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">
        Nombre
        <input type="text" id="name" name="name" required />
      </label>
      <label htmlFor="video">
      video
        <input type="file" id="image" name="image" required />
      </label>
      <label htmlFor="message">
        Mensaje
        <textarea id="message" name="message" required />
      </label>
      <button>Enviar</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}