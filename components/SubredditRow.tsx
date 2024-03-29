import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import Link from "next/link";

type Props = {
  topic: string;
  index: number;
};

function SubredditRow({ index, topic }: Props) {
  return (
    <div
      className="flex items-center space=x-2 border-t bg-white px-4 py-2
  last:rounded-b">
      <p>{index + 1}</p>
      <ChevronDoubleRightIcon className="h-4 w-4 flex-shrink-0 text-blue-400 " />
      <Avatar large seed={`/subreddit/${topic}`} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-2 text-white">
          View
        </div>
      </Link>
    </div>
  );
}

export default SubredditRow;
