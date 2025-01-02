import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { login } from "@/action/user";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

async function Login() {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  }

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <h2 className="text-center font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-center text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please login to continue
      </p>
      <form action={login} className="my-8">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="xyz@gmail.com"
          type="email"
          name="email"
        ></Input>
        <br></br>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="********"
          type="password"
          name="password"
        ></Input>
        <br></br>
        <Button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Login &rarr;
        </Button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Don't have account? <Link href="/sign-up">SignUp</Link>
        </p>
      </form>
      <div>
        <h1 className="text-center text-md text-neutral-800 dark:text-neutral-300">
          Or
        </h1>
        <p className="text-center text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login with
        </p>
        <br></br>
      </div>
      <form>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300"></IconBrandGithub>
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Github
          </span>
        </button>
      </form>
      <form>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300"></IconBrandGoogle>
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
        </button>
      </form>
    </div>
  );
}

export default Login;
