import { SOCKET_URL } from "./Settings";

class WebSocketService {
    
  constructor() {
    this.socketRef = null;
  } 
  
  callbacks = {};
  
  get_key_and_token(token){
      this.token = token
  }
  
  connect() {
    const path = `${SOCKET_URL}/notification/?token=${this.token}`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      //  console.log("WebSocket open. Connection established.");
        this.getInitialNotification()
    };
    this.socketRef.onmessage = e => {
        this.newNotification(e.data)
    };
    this.socketRef.onerror = e => {
     // console.log('an error occur jk');
    };      
    this.socketRef.onclose = (code) => {
    //  console.log("WebSocket closed let's reopen");
      this.connect();
    };
  }
  
  newNotification = (data) => {
      const parsedData = JSON.parse(data);
      const command = parsedData.command;
      console.log('parsed data :-', parsedData.command)
      
      
      if (Object.keys(this.callbacks).length === 0) {
          return;
      }   
      if (command === "initial_notification") {
          this.callbacks[command](parsedData.notifications);
      }
      if (command === "maincount") {
          this.callbacks[command](parsedData.count);
      }
      if (command === "directcount") {
          this.callbacks[command](parsedData.count);
      }
      if (command==='userdata'){
          this.callbacks[command](parsedData.userdata);
          console.log('getted data userdata :-',parsedData)
      }
  }
 
  
  state() {
      if (this.socketRef !== null){
          return this.socketRef.readyState;
      }
  }
  
  disconnect() {
      if (this.socketRef != null){
          this.socketRef.close(3500);
          this.socketRef = null ;
      }
  }
  
  addCallbacks(addNotificationCount, maincount, directcount, addDirect) {
    this.callbacks["initial_notification"] = addNotificationCount;
    this.callbacks["maincount"] = maincount;
    this.callbacks["directcount"] = directcount;
    this.callbacks["userdata"] = addDirect;
  }  
  
  getInitialNotification(username, chatId) {
    this.sendMessage({
      command: "initial_notification",
      token: this.token,
    });
  }
 
  
  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }  
    
}

const WebSocketInstance = new WebSocketService();

export default WebSocketInstance;
