export const connectLogInTimeWebSocket = (token) => {
        const socket = new WebSocket(`ws://0.0.0.0:8000/ws/login-time/?token=${token}`);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("data.message")
            console.log(data.message)
            // if (data.message === 'You have been logged in for 2 hours!') {
            //     // toast.info(data.message);
            //     console.log("You have been logged in for 2 hours!")
            // }
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };