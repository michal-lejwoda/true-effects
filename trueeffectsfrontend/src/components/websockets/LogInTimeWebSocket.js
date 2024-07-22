export const connectLogInTimeWebSocket = (token, language) => {
        const socket = new WebSocket(`ws://0.0.0.0:8000/ws/login-time/?token=${token}&language=${language}`);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("data.message")
            console.log(data.message)
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };