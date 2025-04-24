

import Link from "next/link";
import { getDocs,collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase_confage";
const getAllPosts = async () => {
    const q = query(collection(db, "blog"), orderBy("date"));
    const allPosts = await getDocs(q);

    const posts = allPosts.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    let posts1 = [];
    for(let i = posts.length - 1; i >= 0; i--){
        posts1.push(posts[i])
    }
    
    return posts1;
}

export default async function Blog() {
    const posts = await getAllPosts();
  return (
    <main>
      <h1 className="p-10">blog</h1>
    <div className="flex flex-wrap justify-center flex-col items-center p-5 gap-5">
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:3458280302. */}
    {posts.map((post)=>(
        <Link href={"/blog/" + post.id} key={post.id} className="card">
          
                <img src={post.image} className="img-card-blog" alt={post.title}></img>
            <div className="card-info">
                <h4 className="title">{post.title}</h4>
                <p className="des" >{post.body.slice(0,30).split("\n").map((line, index) => {
        if (line[0] == "-"){
            return <li key={index}><b>{line.slice(1,line.length)}</b></li>
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
    })}<strong>...</strong></p>
                <Link href={"/profile_anther/"+post.from.split(" ")[0]} className="">{post.from.split(" ")[1]}</Link>
                <h5 className="date">{post.date}</h5>

            </div>
        </Link>
    ))}
    </div>
    </main>
  );
}
