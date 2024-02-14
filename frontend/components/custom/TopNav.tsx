import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/custom/Logo";
import { LoggedIn } from "./LoggedIn";

export function TopNav() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md dark:bg-gray-800">
      <Logo />
      <div className="flex items-center gap-4">
        <LoggedIn>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </LoggedIn>
      </div>
    </div>
  );
}
