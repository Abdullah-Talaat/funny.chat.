import { db } from "@/app/firebase/firebase_confage";
import { getDoc, doc,updateDoc } from "firebase/firestore";
import { Share } from "next/font/google";
import Link from "next/link";
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3091973519.

export default async function BlogPost({ params }) {
    const id = params.id;
    const post = (await getDoc(doc(db, "blog", id))).data();
setTimeout(() => {
    updateDoc(doc(db, "blog", id),{
        views:post.views + 1
    }).then(()=>{
        console.log("views updated");
    }).catch((err)=>{
        console.log(err);
    })
}, 10000);
  
  return (<main>

    <h1 className="p-5">{post.title}</h1>
    
        <img className="img-card-post" src={post.image} alt={post.title}></img>
    <hr className="m-5"/>
    <div className="p-5 bodyyy">{post.body.split("\n").map((line, index) => {
        if (line[0] == '-'){
            return <li key={index}><strong>{line.slice(1,line.length)}</strong></li>
        }
        else if(line[0]=='_'){
            return <li key={index}>{line.slice(1,line.length)}</li>
        }
        else if(line[0]=='*'){
            return <a className="a-blog" key={index} href={line.slice(1,line.length)}>{line.slice(1,line.length)}</a>
        }
        else{
            return <p key={index}>{line}</p>
        }
    })}</div>
    <hr className="m-5"></hr>

    <div className="info m-5">
        This post was written by  <Link className="auther" href={"/profile_anther/" + post.from.split(" ")[0]}>{post.from.split(" ")[1]}</Link> on <b>{post.date}</b>.
    </div>
    <hr className="m-5"/>
    <h1 className="m-5">
        views: {post.views}
    </h1>
  </main>);
}
