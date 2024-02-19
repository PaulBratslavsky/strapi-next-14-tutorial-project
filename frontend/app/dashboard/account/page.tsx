import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/custom/forms/ProfileForm";
import { ProfileImageForm } from "@/components/custom/forms/ProfileImageForm";
import { Suspense } from "react";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;
  const userImage = userData?.image;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
      <Suspense fallback={<div className="">Add loader here</div>}>
        <ProfileForm data={userData} className="col-span-3" />
        <ProfileImageForm data={userImage} className="col-span-2" />
      </Suspense>
    </div>
  );
}
