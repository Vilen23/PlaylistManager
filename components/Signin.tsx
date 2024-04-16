"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Montserrat_Alternates } from "next/font/google";
import { FaDiscord } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GithubIcon } from "lucide-react";

const mont = Montserrat_Alternates({ weight: "600", subsets: ["latin"] });
interface signinProps {
  username: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [user, setUser] = useState<signinProps>();
  const session = useSession();
  useEffect(() => {
    if (session?.data?.user) {
      router.push("/");
    }
  }, [session]);

  const handleSignin = async () => {
    const res = await signIn("credentials", {
      username: user?.username,
      password: user?.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleDiscordSignin = async () => {
    const res = await signIn("discord", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleGithubSignin = async () => {
    const res = await signIn("github", {
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className="h-[70vh] w-[100vw] bg-[#111] flex justify-center items-center text-white overflow-x-hidden">
      <div className="flex flex-col gap-3 items-center w-[600px] shadow-2xl py-10  rounded-xl mt-20 md:mt-0">
        <h1 className="text-4xl font-extrabold">PlayIT</h1>
        <p className="text-center text-xs px-5 md:px-0">
          Login to get the enhanced experience while driving through your
          favourite music
        </p>
        <div className="mt-5 w-[70%]">
          <label
            htmlFor="username"
            className="block mb-2 ml-2 text-sm font-medium text-white dark:text-white"
          >
            USERNAME
          </label>
          <input
            onChange={(e: any) => {
              setUser((c: any) => ({ ...c, username: e.target.value }));
            }}
            type="text"
            id="username"
            className="bg-gray-50 rounded-[60px] text-gray-900 text-sm  focus:ring-0 focus:ring-offset-0 focus:border-0 block w-full p-3.5 "
            placeholder="John"
            required
          />
        </div>
        <div className="mt-2 w-[70%]">
          <label
            htmlFor="password"
            className="block mb-2 ml-2 text-sm font-medium text-white dark:text-white"
          >
            PASSWORD
          </label>
          <input
            onChange={(e: any) => {
              setUser((c: any) => ({ ...c, password: e.target.value }));
            }}
            type="text"
            id="password"
            className="bg-gray-50 rounded-[60px] text-gray-900 text-sm  focus:ring-0 focus:ring-offset-0 focus:border-0 block w-full p-3.5"
            placeholder="Strong Password"
            required
          />
        </div>
        <button
          onClick={handleSignin}
          className="bg-[#39FF14] text-black font-semibold hover:shadow-md hover:shadow-black hover:scale-110 transition  text-2xl rounded-[60px] px-8 py-2 mt-5"
        >
          <p className={mont.className}>Sign in</p>
        </button>
        <div className="flex  text-black px-3 py-2 gap-5 items-center ">
          <button onClick={handleGithubSignin} className="rounded-xl bg-white flex px-3 py-2 gap-2 items-center text-xl hover:scale-105 transition-all ease-in-out duration-500">
            <span>
              <GithubIcon />
            </span>
            Github
          </button>
          <button
            onClick={handleDiscordSignin}
            className="rounded-xl bg-white flex px-3 py-2 gap-2 items-center text-xl hover:scale-105 transition-all ease-in-out duration-500"
          >
            <span>
              <FaDiscord className=" text-2xl" />
            </span>
            Discord
          </button>
        </div>
      </div>
    </div>
  );
}
