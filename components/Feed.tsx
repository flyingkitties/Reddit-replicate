import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POSTS } from "../graphql/queries";
import Post from "../components/Post";

function Feed() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  const posts: Post[] = data?.getPostList;

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      Hello
    </div>
  );
}

export default Feed;
