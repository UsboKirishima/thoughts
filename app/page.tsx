import moment from "moment";
import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";
import { postType } from "@/typings/posts";
import Post from "@/models/Post";
import connectDB from "@/database/connectDB";
import { GetServerSideProps } from 'next';
import axios from 'axios';

export interface testPostsType {
  author: string;
  icon: string;
  date: string;
  content: string;
  upvotes: number;
}

interface postTypeAfterDB {
  _id: string;
  author: string;
  icon: string;
  date: string;
  content: string;
  upvotes: number;
}

interface Props {
  posts: postTypeAfterDB[];
}

async function getPosts(): Promise<postType[]> {
  await connectDB();
  const posts = await Post.find().sort({ date: -1 }); // Order data by most recent post
  return posts;
}

const Home = async () => {

  const posts = await getPosts()

  return (
    <>
      <nav>

      </nav>
      <main className="flex flex-wrap w-full flex-col justify-left p-14">
        {posts.map((post: postType, index: number) => (
          <article className="border-white min-w-40 border rounded-md p-4 my-4 flex flex-row" key={index}>
            <div className="flex flex-row ">
              <div className="block">
                <Image
                  className="rounded-full block"
                  src={post.icon}
                  alt="icon"
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <div className="flex flex-col justify-left ml-4">
              <h4 className="font-bold">{post.author}</h4>
              <p>{post.content}</p>
              <p>{`${moment(post.date).fromNow()}`}</p>
            </div>
          </article>
        ))}
      </main>
    </>
  );
}

export default Home;