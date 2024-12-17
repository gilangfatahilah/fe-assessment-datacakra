import AuthenticatedLayout from "@/layouts/Authenticated";
import Card from "@/components/ui/Card";
import Chart from "@/components/ui/Chart";
import { useArticleStore } from "@/stores/useArticleStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader } from "lucide-react";
// import Button from "@/components/ui/Button";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { articleChartData, loading, getArticleChartData, reset } =
    useArticleStore();

  useEffect(() => {
    if (user) getArticleChartData(user.id);

    return () => reset();
  }, [getArticleChartData, user, reset]);

  return (
    <AuthenticatedLayout>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Beautiful Landscape"
            description="Enjoy the scenic beauty of nature with this stunning landscape."
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View More
            </button>
          </Card>

          <Card
            title="Beautiful Landscape"
            description="Enjoy the scenic beauty of nature with this stunning landscape."
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View More
            </button>
          </Card>

          <Card
            title="Beautiful Landscape"
            description="Enjoy the scenic beauty of nature with this stunning landscape."
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View More
            </button>
          </Card>

          <Card
            title="Beautiful Landscape"
            description="Enjoy the scenic beauty of nature with this stunning landscape."
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View More
            </button>
          </Card>
        </div>

        <Card className="h-[62vh]">
          <h1 className="text-2xl font-bold text-center py-2">
            Most commented articles
          </h1>

          {articleChartData?.data.length && !loading ? (
            <Chart
              data={articleChartData?.data}
              labels={articleChartData?.labels}
              type="bar"
            />
          ) : loading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            <div className="h-max flex flex-col gap-4 items-center justify-center">
              <p className="text-center text-muted-foreground font-semibold text-lg">
                No articles yet.
              </p>
            </div>
          )}
        </Card>
      </div>
    </AuthenticatedLayout>
  );
};

export default DashboardPage;
