import { RedditPost } from "@/app/models/game";
import Link from "next/link";
import React from "react";
interface Props {
  posts: RedditPost[];
}
const RedditPosts = ({ posts }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-8 pt-8">
        <h3 className="text-lg text-primary-150 font-bold">
          Recent Reddit posts
        </h3>
        <div className="flex flex-col gap-4 px-[20rem] max-2xl:px-[10rem] max-lg:px-[5rem] max-md:px-8 max-sm:px-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border-b border-dark pb-2"
            >
              <Link href={post.url} target="_blank" className="hover:underline">
                <span className="text-primary-100 text-lg tracking-wide font-bold max-sm:text-base ">
                  {" "}
                  {post.name}
                </span>
              </Link>
              <div className="flex gap-1">
                <span className="text-primary-200  max-sm:text-xs">by</span>{" "}
                <Link
                  href={post.username_url}
                  className="hover:underline text-primary-150 max-sm:text-xs  w-max"
                  target="_blank"
                >
                  {post.username}
                </Link>
              </div>
              <p
                className="text-primary-300 max-sm:text-sm"
                dangerouslySetInnerHTML={{ __html: post.text }}
              ></p>
              <span className="text-end text-primary-200 max-sm:text-xs">
                {new Date(post.created).toDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RedditPosts;
