import { ProfileForm } from "@/components/custom/forms/ProfileForm";
import { ProfileImageForm } from "@/components/custom/forms/ProfileImageForm";

export default function AccountRoute() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
      <div className="col-span-3">
        <ProfileForm />
      </div>
      <div className="col-span-2">
        <ProfileImageForm />
      </div>
    </div>
  );
}
