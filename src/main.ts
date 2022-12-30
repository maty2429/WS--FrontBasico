import "./style.css";
import { connectToServer } from "./socker-client";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Websocker - Client</h1>
   <input id="jwtToken" placeholder="Json Web Token"/>
   <button id="btn-connect">Connect</button>

   <br/>

   <span id="server-status">offline</span>
   <ul id="clients-ul"></ul>
   <form id="message-form">
   <input placeholder="message" id="message-inout" />
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul"></ul>
  </div>
`;

const jwtToken = document.querySelector<HTMLInputElement>("#jwtToken")!;
const btnConnect = document.querySelector<HTMLInputElement>("#btn-connect")!;

btnConnect.addEventListener("click", () => {
  if (jwtToken.value.trim().length <= 0) return alert("Enter a valid JWT");
  connectToServer(jwtToken.value.trim()); //estoy llamando el socket
});
