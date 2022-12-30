import { Manager } from "socket.io-client";
import { Socket } from "socket.io-client/build/esm/socket";

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      hola: "mundo",
      authentication: token,
    },
  });
  const socket = manager.socket("/");
  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector("#server-status")!;
  const clientsUl = document.querySelector("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLFormElement>("#message-inout")!;
  const messagesUl = document.querySelector("#messages-ul")!;
  //TODO: client-ul

  //obtengo el conectado
  socket.on("connect", () => {
    //connect para ver si estoy conectado
    //socket.on es para escuhar lo del servidor
    serverStatusLabel.innerHTML = "connected";
  });

  //obtengo el desconectado
  socket.on("disconnect", () => {
    //disconnect para ver si estoy desconectado
    serverStatusLabel.innerHTML = "disconnect";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientsHtml = "";
    clients.forEach((clientsId) => {
      clientsHtml += `
        <li>${clientsId}</li>
        `;
    });
    clientsUl.innerHTML = clientsHtml;
  });

  //envio el mensaje a la base de datos
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      id: "yo",
      message: messageInput.value,
    });
    messageInput.value = "";
  });

  //eschulo los mensajes en la base de datos
  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
       <li>
       <strong>${payload.fullName}</strong>
       <span>${payload.message}</span>
       </li>
      `;
      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messagesUl.append(li);
    }
  );
};
