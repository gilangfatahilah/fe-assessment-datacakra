import { useAuthStore } from "@/stores/useAuthStore";
import Card from "@/components/ui/Card";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { formatDate } from "@/libs/formatter";
import { useEffect } from "react";
import { useCommentStore } from "@/stores/useCommentStore";
import { Skeleton } from "@/components/ui/Skeleton";
import { Article } from "@/types";
import ArticleCard from "@/components/card/Article";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { articles, loading, getCommentHistory, reset } = useCommentStore();
  const commentedArticles: Article[] = articles.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  useEffect(() => {
    if (user) getCommentHistory(user?.id);

    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCommentHistory, reset]);

  return (
    <AuthenticatedLayout>
      <div className="flex items-center flex-col gap-6">
        <Card
          title="Personal information"
          className="w-full h-[30vh] max-h-[30vh]"
        >
          <div className="w-full md:w-1/2 grid grid-cols-2 py-2 gap-y-2 items-center">
            <p className="font-medium">Username</p>
            <p className="font-medium">: {user?.username}</p>
            <p className="font-medium">Email</p>
            <p className="font-medium">: {user?.email}</p>
            <p className="font-medium">Joined</p>
            <p className="font-medium">
              : {formatDate(user?.createdAt as string)}
            </p>
          </div>
        </Card>

        <h1 className="text-2xl font-bold">Article you commented on</h1>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full bg-background col-span-1 h-48"
              />
            ))
          ) : articles.length ? (
            commentedArticles.map((article) => (
              <ArticleCard className="col-span-1" article={article} />
            ))
          ) : (
            <p>peh</p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
