import AuthenticatedLayout from "@/layouts/Authenticated";

const ProfilePage = () => {
  return (
    <AuthenticatedLayout>
      <p>Hello profile page</p>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
