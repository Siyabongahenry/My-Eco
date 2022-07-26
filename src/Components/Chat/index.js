import "./style.css";
import { FaCheckDouble,FaPaperPlane,FaRobot } from "react-icons/fa";
import { useState,useEffect, useRef } from "react";
const Chat = ()=>{
    const chatBodyRef = useRef(null);

    const[botTrigger,setBotTrigger] = useState(false);

    const[chats,setChats] = useState([
        {
            "id":1,
            "message":"How would you like us to help you?\n"+
            "1. Order queries\n"+
            "2. Cart queries\n"+
            "3: Favourite queries\n"+
            "4. Shoe queries",
            "time":"12:45",
            "date":"2021-06-24",
            "senderId":23,
            "receiverId":25
        }
    ]);

    const[message,setMessage] = useState("");

    //bot response after a user send a chat
    useEffect(()=>{
        setTimeout(()=>{setChats([...chats,botResponse(chats[chats.length-1].message)]) },2000);
    },[botTrigger]);
    
    useEffect(()=>{
        scrollToBottom();
    },[chats]);

    const scrollToBottom = ()=>{
        if(chatBodyRef.current === null) return;

        let chatBody = chatBodyRef.current;
        let scrollValue = chatBody.scrollHeight - chatBody.clientHeight;
        chatBody.scrollTo({ top: scrollValue, behavior: "smooth" });

    }
    const sendChat = (e)=>{
        if(message.replaceAll(" ") == "") return;

        e.preventDefault();
        let newChat = {
            "id":6,
            "userId":20,
            "message":message,
            "time":"13:00",
            "date":"2021-06-25",
            "senderId":25,
            "receiverId":23
        }

        setChats([...chats,newChat]);
        setMessage("");
        setBotTrigger(!botTrigger);
    }
    const botResponse = (option)=>{
        let newChat = {
            "id":6,
            "userId":20,
            "message":"",
            "time":"13:00",
            "date":"2021-06-25",
            "senderId":23,
            "receiverId":25
        }
        switch(option)
        {
            case '1':
                newChat.message = "We are currently retrieving your order.\nPlease wait..";
                break;
            case '2':
                newChat.message = "You can simply click the procceed button to pay.. ";
                break;
            case '3':
                newChat.message = "We are currently retrieving your order.\nPlease wait..";
                break;
            case '4':
                newChat.message = "We are currently retrieving your order.\nPlease wait..";
                break;
            default:
                newChat.message = "Please type a number..";
                break;
        }
        return newChat;
    }
    return (
        <div className="container">
            <div className="chat-screen">
                <div className="chat-nav">
                    <FaRobot className="robot-head"/>
                </div>
                <div className="chat-body" ref={chatBodyRef}>
                    {
                        chats.map((chat)=>
                        
                            <div key={chat.id} className={chat.senderId==25?"sent-chat":"received-chat"}>
                                <div className="chat">{chat.message} <sub>{chat.time}{chat.senderId ==25?<FaCheckDouble className="text-theme"/>:""}</sub></div>
                            </div>
                        )
                    }
                    <div className="text-start">
                        <div className="typing-alert"><span></span><span></span><span></span></div>
                    </div>
                </div>
                <div className="chat-sender">
                    <form onSubmit={sendChat}>
                        <textarea className="chat-input focus-outline-none" rows={1} placeholder="type here.." value={message} onChange={(e)=>setMessage(e.target.value)}/>
                        <button type="submit" className="chat-btn focus-outline-none"><FaPaperPlane/></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;