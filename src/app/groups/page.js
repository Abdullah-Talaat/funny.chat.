"use client"
import { UseUser } from "../layout"
import { useEffect, useContext, useState } from "react"
import { db } from "../firebase/firebase_confage"
import { collection, onSnapshot } from "firebase/firestore"
import Link from "next/link"
import Loder from "../coms/loder"

export default function Groups() {
    const {user} = useContext(UseUser)
    if(!user.userOk) return <Loder/>
    const [groups,setGroups] = useState([])
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
            const fetchedGroups = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setGroups(fetchedGroups)
        })
    
        return () => unsubscribe()
    },[])
    return (
        <main>
            <h1>groups</h1>
            <div className="list">
                {groups.map((group) => (
                    <Link href={`/groups/${group.id}`} key={group.id}>
                        <div className="friend">
                            <div className="dm wd">
                                <img src={group.groupPhoto}></img>
                            </div>
                            <div className="friend-info">
                                <h4>{group.groupName}</h4>
                            
                            </div>
                        </div>
                        <hr></hr>
                    </Link>
                ))}
            </div>
        </main>
    )
} 