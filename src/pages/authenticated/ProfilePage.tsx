import AuthenticatedLayout from "@/components/layout/Authenticated";

const ProfilePage = () => {
  return (
    <AuthenticatedLayout>
      <p>Hello profile page</p>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
