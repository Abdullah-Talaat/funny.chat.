"use client"
import { useParams } from "next/navigation"
import { db } from "@/app/firebase/firebase_confage"
import { collection, onSnapshot,doc, getDoc, addDoc, query, orderBy } from "firebase/firestore"
import { useEffect, useState, useContext ,useRef} from "react"
import Link from "next/link"
import { UseUser } from "@/app/layout"

export default function Group() {
    const lastMessageRef = useRef(null)
    const {id} = useParams()
    // const [groupKey, setGroupKey] = useState("")
    const [msgData, setMsgData] = useState({
        from: "",
        from1:"",
        msgContant: "",
        msgKey: "",
        msgData: ""
    })
    // const [url, setUrl] = useState("")
    const [group , setGroup] = useState({
        groupName: "",
        groupKey: "",
        groupPhoto:""
    })
    const [allMsg, setAllMsg] = useState([])
    const {user} = useContext(UseUser)
    const [stickerMood, setStickerMood] = useState(false)
    const [stickers, setStickers] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "stickers_level_1"), (snapshot) => {
            const fetchedStickers = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setStickers(fetchedStickers)
        })
        return () => unsub()
    },[])
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "groups", id), (doc) => {
            // setGroupKey(doc.data().groupKey)
            setGroup(doc.data())
        })
        return () => unsub()    
    },[])
    // console.log(groupKey)
    useEffect(() => {
        const q = query(collection(db, "allPublicMsg"), orderBy("date"))
        const unsub = onSnapshot(q, (snapshot) => {
            const fetchedMsg = snapshot.docs/*.filter((doc) => doc.data().msgKey == groupKey)*/.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setAllMsg(fetchedMsg)
        })
        console.log(allMsg)
        return () => unsub()

    },[])
    /*const handleSend = (type ) =>{
        c
        if(msgData.msgContant.length == 0) return
        if(type == "sticker")setStickerMood(0)
            if(type=="text"){
        addDoc(collection(db, "allPublicMsg"), {
            from: user.userName,
            from1: user.userNum,
            msgContent: msgData.msgContant,
            msgKey: group.groupKey,
            type: type,
            
            date: `${new Date }`,
            
        })
        setMsgData({
            from: "",
            from1:"",
            msgContant: "",
            msgKey: "",
            msgData: ""
        })}
        else{
            addDoc(collection(db, "allPublicMsg"), {
                from: user.userName,
                from1: user.userNum,
                msgContent: msgData.msgContant,
                msgKey: group.groupKey,
                type: type,}
                )
            setMsgData({
                from: "",
                from1:"",
                msgContant: "",
                msgKey: "",
                msgData: ""
            })
        }
    }*/
   const handleSend = () => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    const date1 = date.toLocaleDateString()
    const date2 = `${time}/${date1}`
    if(msgData.msgContant.length == 0) return
    addDoc(collection(db, "allPublicMsg"), {
        from: user.userName,
        from1: user.userNum,
        msgContent: msgData.msgContant,
        msgKey: group.groupKey,
        type: "text",
        date: date2,
    
    }
        )
    setMsgData({
        from: "",
        from1:"",
        msgContant: "",
        msgKey: "",
        msgData: ""
    })

   }

   const handleSendSticker = (url) => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    const date1 = date.toLocaleDateString()
    const date2 = `${time}/${date1}`
    if(url.length == 0) return

    addDoc(collection(db, "allPublicMsg"), {
        from: user.userName,
        from1: user.userNum,
        msgContent: url,
        msgKey: group.groupKey,
        type: "sticker",
        date: date2,
    
    }
)

    setMsgData({
        from: "",
        from1:"",
        msgContant: "",
        msgKey: "",
        msgData: ""
    })

   }
   useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allMsg])
        return (
        <main>

            {/* <title>{group.groupName}</title> */}

            <div className="list">
                <Link href={"/chats"}>
                    <div className="friend">
                        <div className="dm wd">
                            <img src={group.groupPhoto}></img>
                        </div>
                        <div className="friend-info">
                            <h4>{group.groupName}</h4>
                            <h5>{group.groupKK}</h5>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="chat-c">
            {




                

                allMsg.filter((msg) => msg.msgKey == group.groupKey).map((msg, index) => 
                    msg.type == "text" ? (
                        msg.from1 == user.userNum ? (
                            <div className="chat-c-1" ref={index == allMsg.length - 1 ? lastMessageRef : null}>
                                {/* <b>{msg.from}</b> */}
                                {/* <p>{msg.msgContent}</p> */}
                                <div  className="c-1" >
                                    
                                <b>
                                    {msg.msgContent}
                                    {/* {msg.date} */}
                                </b>
                                </div>
                                <div className="date">{msg.date}</div>
                                
                            </div>
                        ) : (
                            <div className="chat-c-2" ref={index == allMsg.length - 1 ? lastMessageRef : null}>
                                <div className="date">{msg.Date}</div>
                                <div className="c-2">
                                <h4>{msg.from}</h4>
                                <b>{msg.msgContent}</b>
                                </div>
                            </div>
                        )
                    ):(
                        msg.from1 == user.userNum ? (
                            <div className="chat-c-1" ref={index == allMsg.length - 1 ? lastMessageRef : null}>
                                <div className="c-1">
                            
                                <img className="mm" src={msg.msgContent}></img>
                                </div>
                                <div className="date">{msg.date}</div>
                            </div>
                        ) : (  <div className="chat-c-2" ref={index == allMsg.length - 1 ? lastMessageRef : null}>
                           <div className="date">{msg.date}</div>
                            
                            <div className="c-2">
                            <h4>{msg.from}</h4>
                            <img className="mm" src={msg.msgContent}></img>
                            </div>
                        </div>
                    )
                ))
            }


            </div>
            <div className="chat">
                <textarea 
                    className="input"
                    placeholder="write a message"
                    value={msgData.msgContant}
                    onChange={(e) => setMsgData({ ...msgData, msgContant: e.target.value })}
                ></textarea>
                <div className="btns">
                    <button 
                    onClick={()=>handleSend()}
                    >send</button>
                    <button onClick={()=>setStickerMood(!stickerMood)}>sticker</button>
                </div>
             </div>
             <div style={stickerMood?{display:"flex"}:{display:"none"}} className="stick">
                <button className="close" onClick={()=>{setStickerMood(!stickerMood)}}>X</button>
                {
                    stickers.map((stick)=>(
                        <div className="sticker"
                        onClick={()=>{handleSendSticker(stick.url)}}
                        key={stick.id}
                        >
                            <img src={stick.url}></img>
                            </div>
                    ))
                }
             </div>
        </main>
    )
    
}