import { getUserMeLoader } from "@/data/loaders";
import { logoutAction } from "@/data/actions/auth-actions";
import { LogoutIcon } from "@/components/icons/LogoutIcon";

interface AuthUserProps {
  username: string;
  email: string;
}

function LogoutButton() {
  return <form action={logoutAction}>
    <button type="submit">
      <LogoutIcon className="w-6 h-6 hover:text-primary" />
    </button>
  </form>;
}

function AuthUser({ userData }: { readonly userData: AuthUserProps }) {
  return (
    <div className="flex gap-2">
      <h1 className="font-semibold">{userData.username}</h1>
      <LogoutButton />
    </div>
  );
}

export default async function LoggedIn({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const user = await getUserMeLoader();
  console.log("user", user);
  return <div>{user.ok ? <AuthUser userData={user.data} /> : children}</div>;
}
