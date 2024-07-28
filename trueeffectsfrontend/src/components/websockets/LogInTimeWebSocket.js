class WebSocketClient {
    constructor() {
        this.socket = null;
        this.url = '';
        this.onMessageCallbacks = [];
        this.reconnectInterval = 5000; // 5 seconds
        this.pingInterval = 30000; // 30 seconds
        this.pingTimeout = null;
        this.isConnected = false;
    }

    connect(token, language) {
        if (this.isConnected) return Promise.resolve(); // Prevent multiple connections

        return new Promise((resolve, reject) => {
            this.url = `ws://0.0.0.0:8000/ws/login-time/?token=${token}&language=${language}`;
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log('WebSocket connection established');
                this.isConnected = true;
                this.startHeartbeat();
                resolve();
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.isConnected = false;
                this.reconnect(token, language);
                reject(error);
            };

            this.socket.onclose = () => {
                console.log('WebSocket connection closed');
                this.isConnected = false;
                this.stopHeartbeat();
                this.reconnect(token, language);
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);
                this.onMessageCallbacks.forEach(callback => callback(data));
            };
        });
    }

    reconnect(token, language) {
        setTimeout(() => {
            console.log('Reconnecting...');
            this.connect(token, language);
        }, this.reconnectInterval);
    }

    startHeartbeat() {
        this.pingTimeout = setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({ type: 'ping' }));
            }
        }, this.pingInterval);
    }

    stopHeartbeat() {
        clearInterval(this.pingTimeout);
    }

    close() {
        if (this.socket) {
            this.stopHeartbeat();
            this.socket.close();
            this.isConnected = false;
        }
    }

    send(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }

    addOnMessageCallback(callback) {
        if (!this.onMessageCallbacks.includes(callback)) {
            this.onMessageCallbacks.push(callback);
        }
    }

    removeOnMessageCallback(callback) {
        this.onMessageCallbacks = this.onMessageCallbacks.filter(cb => cb !== callback);
    }

    removeAllCallbacks() {
        this.onMessageCallbacks = [];
    }
}

const webSocketClient = new WebSocketClient();
export default webSocketClient;
