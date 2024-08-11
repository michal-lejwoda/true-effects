class WebSocketClient {
    constructor() {
        this.socket = null;
        this.url = '';
        this.onMessageCallbacks = [];
        this.reconnectInterval = 5000;
        this.pingInterval = 30000;
        this.pingTimeout = null;
        this.isConnected = false;
        this.shouldReconnect = true;
    }

    connect(token, language) {
        if (this.isConnected) {
            console.log('Already connected. Resetting connection.');
            this.reset();
        }

        return new Promise((resolve, reject) => {
            this.url = `ws://0.0.0.0:80/ws/login-time/?token=${token}&language=${language}`;
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log('WebSocket connection established');
                this.isConnected = true;
                this.shouldReconnect = true;
                this.startHeartbeat();
                resolve();
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.isConnected = false;
                if (this.shouldReconnect) {
                    this.reconnect(token, language);
                }
                reject(error);
            };

            this.socket.onclose = () => {
                console.log('WebSocket connection closed');
                this.isConnected = false;
                this.stopHeartbeat();
                if (this.shouldReconnect) {
                    this.reconnect(token, language);
                }
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);
                this.onMessageCallbacks.forEach(callback => {
                    console.log('Calling callback with data:', data);
                    callback(data);
                });
            };
        });
    }

    reconnect(token, language) {
        if (this.shouldReconnect && !this.isConnected) {
            console.log('Attempting to reconnect...');
            setTimeout(() => {
                this.connect(token, language);
            }, this.reconnectInterval);
        }
    }

    reset() {
        console.log('Resetting WebSocket connection');
        this.shouldReconnect = false;
        this.close();
        this.removeAllCallbacks();
        this.url = '';
        this.isConnected = false;
    }

    startHeartbeat() {
        this.pingTimeout = setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                console.log('Sending heartbeat ping');
                this.socket.send(JSON.stringify({ type: 'ping' }));
            }
        }, this.pingInterval);
    }

    stopHeartbeat() {
        console.log('Stopping heartbeat ping');
        clearInterval(this.pingTimeout);
    }

    close() {
        if (this.socket) {
            console.log('Closing WebSocket connection');
            this.stopHeartbeat();
            this.shouldReconnect = false;
            this.socket.close();
            this.isConnected = false;
        }
    }

    logout() {
        console.log('Logging out');
        this.reset();
    }

    send(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log('Sending message:', message);
            this.socket.send(message);
        }
    }

    addOnMessageCallback(callback) {
        console.log('Adding callback:', callback);
        this.removeAllCallbacks();
        this.onMessageCallbacks.push(callback);
    }

    removeOnMessageCallback(callback) {
        this.onMessageCallbacks = this.onMessageCallbacks.filter(cb => cb !== callback);
    }

    removeAllCallbacks() {
        console.log('Removing all callbacks');
        this.onMessageCallbacks = [];
    }
}

const webSocketClient = new WebSocketClient();
export default webSocketClient;
