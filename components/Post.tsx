import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>();

  const { data: session } = useSession();

  const { data, loading, error } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });
  // console.log(error);

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVoteByPostId"],
  });

  const upVote = async (isUpvote: boolean) => {
    // Check if user has already voted
    if (!session) {
      toast("You'll need to sign in to Vote!");
      return;
    }
    // all good unti here
    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    console.log("voting...", isUpvote);

    const {
      data: { insertVote: newVote },
    } = await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });

    console.log("New vote:", newVote); // desctructured data

    console.log("Placed vote:", data); // structured data
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVoteByPostId;
    //latest vote as we sorted it by newely created
    // The problem is here
    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote;

    setVote(vote);
  }, [data]);

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );
  };

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
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-blue-400 ${
              vote === true && "text-blue-400"
            }`}
          />
          <p className="text-xs font-semibold text-black">0</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-red-400 ${
              vote === false && "text-red-400"
            }`}
          />
        </div>

        <div className="p-3 pr-10 pb-1 w-full">
          {/* header */}
          <div className="flex items-center space-x-2 pr-10 ">
            <Avatar large seed={post?.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400 ">
              <Link href={`/subreddit/${post?.subreddit[0]?.topic}`}>
                <span
                  className="font-bold text-black hover:text-blue-400 
            hover:underline "
                >
                  r/{post?.subreddit[0]?.topic}
                </span>
              </Link>{" "}
              . Posted by u/
              {post?.username} • <TimeAgo date={post?.created_at} />
            </p>
          </div>
          {/* body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post?.title}</h2>
            <p className="mt-2 text-sm font-light ">{post?.body}</p>
          </div>
          {/* image */}

          <img className="w-full" src={post?.image} alt="" />

          {/* footer */}
          <div className="flex space-x-4 text-gray-400 py-2 ">
            <div className="postButtons ">
              <ChatBubbleLeftIcon className="h-6 w-6" />
              <p className="">{post?.comment.length} Comments</p>
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
