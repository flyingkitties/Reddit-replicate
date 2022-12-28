import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

function PostPage() {
  const router = useRouter();
  const {
    loading,
    error,
    data = {},
  } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });
  console.log(router.query.postId);
  console.log(data);

  const post: Post = data?.getPostByPostId;

  if (loading) return <p>Loading ...</p>;

  // if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div>
      HEllo
      <Post post={post} />
    </div>
  );
}

export default PostPage;
