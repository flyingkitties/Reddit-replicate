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
import { PostType, Vote } from "../typings";

type Props = {
  post: PostType;
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
        created_at: new Date(),
      },
    });

    console.log("New vote:", newVote); // desctructured data

    console.log("Placed vote:", data); // structured data
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVoteByPostId;
    //latest vote as we sorted it by newely created
    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote;

    setVote(vote);
  }, [data]);

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVoteByPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );
    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }
    return displayNumber;
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
     my-2 shadow-sm rounded-md hover:border hover:border-gray-400 py-3 w-full ">
        {/* votes */}
        <div
          className="flex flex-col items-center justify-start 
      space-y-1 rounded-l-md p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-blue-400 ${
              vote === true && "text-blue-400"
            }`}
          />
          <p className="text-xs font-semibold text-black">
            {displayVotes(data)}
          </p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-red-400 ${
              vote === false && "text-red-400"
            }`}
          />
        </div>

        <div className="py-3 pr-12 pb-1 w-full">
          {/* header */}
          <div className="flex items-center space-x-2 pr-10 ">
            <Avatar large seed={post?.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400 ">
              <Link href={`/subreddit/${post?.subreddit[0]?.topic}`}>
                <span
                  className="font-bold text-black hover:text-blue-400 
            hover:underline ">
                  r/{post?.subreddit[0]?.topic}
                </span>
              </Link>{" "}
              . Posted by u/
              {post?.username} • <TimeAgo date={post?.created_at} />
            </p>
          </div>
          {/* body */}
          <div className="py-4 ">
            <h2 className="text-xl font-semibold">{post?.title}</h2>
            <p className="mt-2 text-sm font-light ">{post?.body}</p>
          </div>
          {/* image */}

          <img className="w-full pr-2" src={post?.image} alt="" />

          {/* footer */}
          <div className="flex space-x-4 text-gray-400 py-2 ">
            <div className="postButtons ">
              <ChatBubbleLeftIcon className="icon" />
              <p className="text-xs ">
                {post?.comments.length}
                <span className="hidden lg:inline"> Comments</span>
              </p>
            </div>

            <div className="postButtons ">
              <GiftIcon className="icon" />
              <p className="hidden text-xs lg:inline">Award</p>
            </div>
            <div className="postButtons ">
              <ShareIcon className="icon" />
              <p className="hidden text-xs lg:inline">Share</p>
            </div>
            <div className="postButtons ">
              <BookmarkIcon className="icon" />
              <p className="hidden text-xs lg:inline">Save</p>
            </div>
            <div className="postButtons ">
              <EllipsisHorizontalIcon className="icon" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
