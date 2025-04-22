

import Link from "next/link";
import { getDocs,collection } from "firebase/firestore";
import { db } from "../firebase/firebase_confage";
const getAllPosts = async () => {
    const allPosts = await getDocs(collection(db, "blog"));
    const posts = allPosts.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return posts;
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
            <div className="card-img">
                <img src={post.image} alt={post.title}></img>
            </div>
            <div className="card-info">
                <h4 className="title">{post.title}</h4>
                <p className="des" >{post.body.slice(0, 30)}...</p>
                <Link href={"/profile_anther/"+post.from.split(" ")[0]} className="">{post.from.split(" ")[1]}</Link>
                <h5 className="date">{post.date}</h5>

            </div>
        </Link>
    ))}
    </div>
    </main>
  );
}
