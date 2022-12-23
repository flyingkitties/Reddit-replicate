import React from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  GlobeAltIcon,
  PlusIcon,
  SparklesIcon,
  MegaphoneIcon,
  VideoCameraIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div
      className="flex p-2  bg-white shadow-md sticky top-0 z-50
    items-center space-x-3"
    >
      {/* Logo */}
      <div
        className="relative h-10 w-20 flex-shrink-0 cursor-pointer
   mr-2 "
      >
        <Link href="/">
          <Image
            alt=""
            objectFit="contain"
            src="https://logos-world.net/imageup/Reddit/Reddit-Logo-PNG5.png"
            layout="fill"
          />
        </Link>
      </div>
      {/* Home */}
      <div className="flex items-center space-x-3 px-5">
        <HomeIcon className="h-5 w-5 " />
        <p className="flex-1 ml-2 hidden md:inline ">Home</p>
        <ChevronDownIcon className="h-5 w-5 " />
      </div>

      {/* Search box */}
      <form
        className="flex flex-1 items-center border border-gray-200 rounded-lg lg:min-w-[400px]
        bg-gray-100 px-3 py-1"
        action=""
      >
        <MagnifyingGlassIcon className="h-5 w-5 " />
        <input
          className="pl-5 flex-1 bg-transparent outline-none "
          placeholder="Search Reddit"
          type="text"
        />
        <button hidden type="submit" />
      </form>

      {/* Icons Right */}
      <div
        className=" text-gray-500 items-center text-right mx-3 space-x-3 
      hidden md:inline-flex"
      >
        <SparklesIcon className="icon " />
        <GlobeAltIcon className=" icon " />
        <VideoCameraIcon className=" icon " />
        <hr className="h-10 border border-gray-200" />
        <BellIcon className=" icon  " />
        <ChatBubbleLeftEllipsisIcon className=" icon " />
        <PlusIcon className=" icon  " />
        <MegaphoneIcon className=" icon  " />
      </div>
      <div className="flex items-center md:hidden ml-5 ">
        <Bars3Icon className=" icon  " />
      </div>

      {/* Sign in / sign out */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="flex items-center space-x-3 border  border-gray-100 rounded-full
       p-2 bg-gray-100 cursor-pointer "
        >
          <div className="relative h-6 w-6 flex-shrink-0 ">
            <Image alt="" layout="fill" src="https://links.papareact.com/23l" />
          </div>
          <div className="">
            <div className="hidden lg:inline  ">
              <p
                className="text-gray-500 text-[0.8rem] line-clamp-1
              "
              >
                Hello {session?.user?.name}
              </p>
            </div>

            <ChevronDownIcon className=" h-3 w-3 lg:hidden" />
          </div>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="flex items-center space-x-3 border  border-gray-100 rounded-full
       p-2 bg-gray-100 cursor-pointer "
        >
          <div className="relative h-6 w-6 shrink-none">
            <Image alt="" layout="fill" src="https://links.papareact.com/23l" />
          </div>
          <p className="text-gray-500 ">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;

// https://links.papareact.com/fqy
