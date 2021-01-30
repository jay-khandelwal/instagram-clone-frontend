import { SOCKET_URL } from "./Settings";

class WebSocketService {
    
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(roomName, token) {
    this.disconnect2()
    const path = `${SOCKET_URL}/ws/chat/${this.roomName}/?token=${this.token}`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
        this.fetchMessages(1)
     //   console.log("WebSocket open. Connection established.");
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
    };
    this.socketRef.onclose = (code) => {
      if ((code.code===3500) || (code.code===1000)) {
        //  console.log('websocket closed. work completed.')
      }
      else {
     // console.log("WebSocket closed let's reopen");
      this.connect();
      }
    };
  }
  
  get_key_and_token(roomName, token, username){
      this.roomName = roomName
      this.token = token
      this.username = username
  }

  disconnect() {
      if (this.socketRef != null){
          this.leaveChatRoom()
          this.socketRef.close(3500);
          this.socketRef = null ;
      }
  }
  
  disconnect2() {
      if (this.socketRef != null){
          this.socketRef.close(3500);
          this.socketRef = null ;
      }
  }
  

  socketNewMessage = (data) => {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
        this.callbacks['loadingF']()
        if (parsedData.messages.data && parsedData.messages.data.length > 0){
          this.callbacks[command](parsedData.messages.data);
        }
        else{
           this.callbacks[command]([]); 
        }
    }
    if (command === "old_messages") {
        this.callbacks['setNexLoader'](false)
      this.callbacks[command](parsedData.messages.data);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  }    

  fetchMessages(page) {
      if (page===1){
         this.callbacks['loadingT']()
      }
      else{
          this.callbacks['setNexLoader'](true)
      }
    this.sendMessage({
      command: "fetch_messages",
      username: this.username,
      roomName: this.roomName,
      pagination:page,
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      sender: message.from,
      message: message.content,
      roomName: message.roomName
    });
  }
  
  leaveChatRoom() {
    this.sendMessage({
      command: "leave",
      username: this.username,
      roomName: this.roomName
    });
  }
  

  addCallbacks(newMessageCallback, messagesCallback, old_messages, loadingT, loadingF, setNexLoader) {
    this.callbacks["new_message"] = newMessageCallback;
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["old_messages"] = old_messages;
    this.callbacks["loadingT"] = loadingT;
    this.callbacks["loadingF"] = loadingF;
    this.callbacks["setNexLoader"] = setNexLoader;
  }
  


  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
    }
  }

  state() {
      if (this.socketRef !== null){
          return this.socketRef.readyState;
      }
  }
}

const WebSocketInstance = WebSocketService.getInstance();


export default WebSocketInstance;
