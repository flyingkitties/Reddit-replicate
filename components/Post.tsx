import React from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ArrowUturnRightIcon,
  GifIcon,
} from "@heroicons/react/24/outline";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  return (
    <div
      className=" flex bg-white cursor-pointer border border-gray-300 
     my-5 shadow-sm rounded-md hover:border hover:border-gray-400 "
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

      <div className="p-3 pb-1">
        {/* header */}
        <div></div>
        {/* body */}
        <div></div>
        {/* image */}
        <div></div>
        {/* footer */}
        <div></div>
      </div>
    </div>
  );
}

export default Post;
