const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#send");

connection.onopen = (event) => {
    console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
    console.log("Message received from the server:", event.data);

    // append received message from the server to the DOM element 
    const chat = document.querySelector("#chat");
    chat.innerHTML += event.data.toString();
};

button.addEventListener("click", () => {
    const name = document.querySelector("#name");
    const message = document.querySelector("#message");

    const data = {
        type: "login",
        name: name.value,
        message: message.value
    };

    // Send composed message to the server
    connection.send(JSON.stringify(data));

    // clear input fields
    name.value = "";
    message.value = "";
});