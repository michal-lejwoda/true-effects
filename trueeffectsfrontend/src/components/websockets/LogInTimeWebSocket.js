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
        console.log("connect")
        if (this.isConnected) {
            console.log("isConnected")
            this.reset();
        }
        console.log("return before promise")
        return new Promise((resolve, reject) => {
            const WS_URL = process.env.REACT_WS_URL
            const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
            this.url = `${protocol}://${WS_URL}/ws/login-time/?token=${token}&language=${language}`;
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log("[WebSocket] Connected with:", this.url);
                this.isConnected = true;
                this.shouldReconnect = true;
                this.startHeartbeat();
                resolve();
            };

            this.socket.onerror = (error) => {
                console.error("[WebSocket] Connection Error:", error);
                this.isConnected = false;
                if (this.shouldReconnect) {
                    this.reconnect(token, language);
                }
                reject(error);
            };

            this.socket.onclose = () => {
                console.log("socket on close")
                this.isConnected = false;
                this.stopHeartbeat();
                if (this.shouldReconnect) {
                    this.reconnect(token, language);
                }
            };

            this.socket.onmessage = (event) => {

                const data = JSON.parse(event.data);
                this.onMessageCallbacks.forEach(callback => {
                    callback(data);
                });
            };
        });
    }

    reconnect(token, language) {
        if (this.shouldReconnect && !this.isConnected) {
            setTimeout(() => {
                this.connect(token, language);
            }, this.reconnectInterval);
        }
    }

    reset() {
        console.log("reset")
        this.shouldReconnect = false;
        this.close();
        this.removeAllCallbacks();
        this.url = '';
        this.isConnected = false;
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
            this.shouldReconnect = false;
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
        this.removeAllCallbacks();
        this.onMessageCallbacks.push(callback);
    }


    removeAllCallbacks() {
        this.onMessageCallbacks = [];
    }
}

const webSocketClient = new WebSocketClient();
export default webSocketClient;
