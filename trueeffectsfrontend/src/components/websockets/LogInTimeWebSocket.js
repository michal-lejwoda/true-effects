class WebSocketClient {
    constructor() {
        this.socket = null;
        this.url = '';
    }

    connect(token, language) {
        return new Promise((resolve, reject) => {
            this.url = `ws://0.0.0.0:8000/ws/login-time/?token=${token}&language=${language}`;
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log('WebSocket connection established');
                resolve();
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };

            this.socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        });
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }

    send(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }
}

const webSocketClient = new WebSocketClient();
export default webSocketClient;
