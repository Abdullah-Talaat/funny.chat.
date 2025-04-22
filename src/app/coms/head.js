"use client";

import Link from "next/link";
import { UseUser } from "../layout";
import { useContext, useState } from "react";

export default function Head() {
    const { user } = useContext(UseUser);
    const [menoMood, setMenoMood] = useState("translateY(-100%)")
    if (!user) return <p>Loading...</p>;

    return (
        <header>
            <button onClick={() => {
                    setMenoMood("translateY(0%)")
            }} className="meno">Meno</button>
            <ul className="computer">
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/blog"}>Blog</Link></li>
                <li><Link href={"/chats"}>Chats</Link></li>
                <li><Link href={"/groups"}>Groups</Link></li>
                <li><Link href={"/search"}>Search</Link></li>
                {!user.userOk ? (
                    <li className="log-in-links">
                        <Link href={"/log_in"}>Log in</Link>
                        <Link href={"/sign_up"}>Sign up</Link>
                    </li>
                ) : (
                    <li className="profile-links">
                        <Link href={"/profile"}>
                            <p>{user.userName}</p>
                            {user.userPhoto && (
                                <div className="dm1">
                                <img className="" src={user.userPhoto} alt="User photo" />
                                </div>
                            )}
                        </Link>
                    </li>
                )}
            </ul>
            
    
            <ul className="mobile"style={{
        
                transform:menoMood
        
            }}>
                <button onClick={() => {
                    setMenoMood("translateY(-100%)")
                }}>X</button>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/blog"}>Blog</Link></li>
                <li><Link href={"/chats"}>Chats</Link></li>
                <li><Link href={"/groups"}>Groups</Link></li>
                <li><Link href={"/search"}>Search</Link></li>
                {!user.userOk ? (
                    <li className="log-in-links">
                        <Link href={"/log_in"}>Log in</Link>
                        <Link href={"/sign_up"}>Sign up</Link>
                    </li>
                ) : (
                    <li className="profile-links">
                        <Link href={"/profile"}>
                            <p>{user.userName}</p>
                            {user.userPhoto && (
                                <div className="dm1">
                                <img className="" src={user.userPhoto} alt="User photo" />
                                </div>
                            )}
                        </Link>
                    </li>
                )}
            </ul>
            
        </header>
    );
}