import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import PostBox from "../components/PostBox";

const Home: NextPage = () => {
  return (
    <div className=" max-w-5xl my-7 lg:mx-auto mx-5 ">
      <Head>
        <title>Rita&apos;s Reddit</title>
      </Head>

      {/* PostBox */}
      <PostBox />

      <div className="flex">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
