"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "./coms/head";
import Loading from "./loading";
import { createContext, useEffect, useState } from "react";
import { db } from "./firebase/firebase_confage";
import { collection, onSnapshot } from "firebase/firestore"
import {encode, decode} from "@/app/sign_up/replacer"
/*
export const metadata = {
  title: "Funny Chat",
  description: "Funny Chat is a chat app that allows you to chat with your friends",
};*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const UseUser = createContext(null);

export default function RootLayout({ children }) {
  const [user, setUser] = useState({
    userOk: false,
    userName: "o",
    userNum: 0,
    score: 100,
    userPhoto: " ",
    mode: false,
    userFriends: [],
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(fetchedUsers);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (users.length === 0) return;

    const loginWithToken = () => {
      setLoading(true);
      if(localStorage.getItem("user_token") === null  ){
        setLoading(false);
        return;
      }
      // //(localStorage.getItem("user_token"))
      const userDataToken1 = localStorage.getItem("user_token");
      const userDataToken = decode(userDataToken1);
      // //(userDataToken,"yy")
      if (!userDataToken) {
        setLoading(false);
        return;
      }

      const tokenParts = userDataToken.split("UT-5");
      //(tokenParts)

      const foundUser = users.find(
        (user) => user.userNum == tokenParts[0] && user.password == tokenParts[1]
      );

      if (foundUser) {
        setUser({ ...foundUser, userOk: true });
      } else {
        alert("User not found");
      }

      setLoading(false);
    };

    loginWithToken();
  }, [users]);

  return (
    <html lang="en">
      <head>
        <meta name="image" content="./share.jpg"/>
        {/* <link rel="icon" type="image/png" href = "./funny messages.png" /> */}
        <title>funny chat</title>
        {/* <mate name="theme-color" content="#000000" /> */}
        {/* <mate name="title" content="funny chat"/> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="image" href="./share.jpg" />
        {/* <mate name="image" content="./share.png"/> */}
        <link rel="icon" type="image/png" href="./funny messages.png" />
        <meta property="og:image" content="./share.jpg"/>
        <meta property="og:title" content="funny chat" />
        <meta property="og:description" content="Funny Chat is a chat app that allows you to chat with my friends with emojis and stickers and funny" />
        <meta property="og:url" content="https://abdullah-t-funny-chat-hjni.vercel.app/" />
        <meta property="og:type" content="website" />
        {/* <mate name="robots" content="index, follow"></mate> */}
      </head>
      <UseUser.Provider value={{ user, setUser }}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Head />
          {loading ? <Loading /> : children}
        </body>
      </UseUser.Provider>
    </html>
  );
}
