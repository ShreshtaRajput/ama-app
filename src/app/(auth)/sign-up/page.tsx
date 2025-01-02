import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "@/action/user";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

async function SignUp() {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  }

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <h2 className="text-center font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to MysteryMessage
      </h2>
      <p className="text-center text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please sign up to continue
      </p>
      <br></br>
      <form action={register} className="my-8">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="flex flex-col">
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
            <Input
              id="username"
              placeholder="JohnDoe"
              type="text"
              name="username"
            />
          </div>
        </div>

        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="xyz@gmail.com"
          type="email"
          name="email"
        />

        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="***********"
          type="password"
          name="password"
          className="mb-5"
        />

        <Button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Sign up &rarr;
        </Button>

        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;