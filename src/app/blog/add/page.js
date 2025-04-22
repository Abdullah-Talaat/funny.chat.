'use client'
import { useEffect, useState, useContext } from 'react';
import { UseUser } from '@/app/layout';
import { db } from '@/app/firebase/firebase_confage';
import { addDoc,collection } from 'firebase/firestore';
import { CldUploadWidget } from 'next-cloudinary';
import Link from 'next/link';
import { uploadPreset } from '@/app/sign_up/page';
export default function AddBlog() {
    const {user}= useContext(UseUser)
    const [post, setPost] = useState({
    title:"",
    body:"",
    image:"",
    views:0,
    from:user.id + " " + user.userName,
})
console.log(post)

  return user.userNum == "015014809099"? (
    <div>
        <img src={post.image}></img>
      <h1 className="m-5">Add Blog</h1>

      <form className='flex flex-col m-5 '>
        <input value={post.title} placeholder='title' type='text' className='m-2 p-2 border' onChange={(e)=>setPost({...post,title:e.target.value})}/>
        <textarea value={post.body} placeholder='body' className='m-2 p-2 border' onChange={(e)=>setPost({...post,body:e.target.value})}/>
        <CldUploadWidget
        uploadPreset={uploadPreset}
        onSuccess={({ info }) =>
            setPost({...post,image:info.secure_url})}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button onClick={handleOnClick} className=" border p-2 m-2">
              Upload a Image
            </button>
          );
        }}
      </CldUploadWidget>
      <button className='p-2 bg-green-300 hover:bg-green-500 m-2' onClick={async (e)=>{
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1080667841.
        const date = new Date();
        const date1 = date.toLocaleDateString;
        const date2 = date.toLocaleTimeString;
        console.log(date1 + " " + date2);
        e.preventDefault()
        if(post.title != "" && post.body != "" && post.image != ""){
        const blogRef = collection(db, "blog");
        await addDoc(blogRef, {
          ...post,
          date: date2 + " " + date1,
        });
        setPost({
          title:"",
          body:"",
          image:"",
          from:user.id + " " + user.userName,
        })}
        else{
            alert("please fill all fields")
        }

      }}>save</button>
      </form>
      
    </div>
  ):<>
    you mustn't be here

    <Link href={"/blog"} className='text-red-600 hover:text-red-800'>        go to blog</Link>
  </>;
}
