import React from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ArrowUturnRightIcon,
  GiftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  if (!post)
    return (
      <div className="flex w-full items-center p-10 justify-center txt-xl ">
        <Jelly size={50} color="#FF4501" />
      </div>
    );
  return (
    <Link href={`/post/${post?.id}`}>
      <div
        className=" flex bg-white cursor-pointer border border-gray-300 
     my-2 shadow-sm rounded-md hover:border hover:border-gray-400 py-3 w-full "
      >
        {/* votes */}
        <div
          className="flex flex-col items-center justify-start 
      space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400"
        >
          <ArrowUpIcon className=" voteButtons hover:text-blue-400" />
          <p className="text-xs font-semibold text-black">0</p>
          <ArrowDownIcon className=" voteButtons hover:text-red-400" />
        </div>

        <div className="p-3 pr-10 pb-1 w-full">
          {/* header */}
          <div className="flex items-center space-x-2 pr-10 ">
            <Avatar large seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400 ">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span
                  className="font-bold text-black hover:text-blue-400 
            hover:underline "
                >
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{" "}
              . Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light ">{post.body}</p>
          </div>
          {/* image */}

          <img className="w-full" src={post.image} alt="" />

          {/* footer */}
          <div className="flex space-x-4 text-gray-400 py-2 ">
            <div className="postButtons ">
              <ChatBubbleLeftIcon className="h-6 w-6" />
              <p className="">{post.comment.length} Comments</p>
            </div>

            <div className="postButtons ">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden lg:inline">Award</p>
            </div>
            <div className="postButtons ">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden lg:inline">Share</p>
            </div>
            <div className="postButtons ">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden lg:inline">Save</p>
            </div>
            <div className="postButtons ">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
