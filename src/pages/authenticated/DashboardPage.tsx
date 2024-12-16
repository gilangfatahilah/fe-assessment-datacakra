import AuthenticatedLayout from "@/layouts/Authenticated";
import Card from "@/components/ui/Card";
import Chart from "@/components/ui/Chart";

const DashboardPage = () => {
  const chartData = {
    data: [100, 200, 150, 300, 250],
    labels: ["January", "February", "March", "April", "May"],
  };

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

        <Card title="Most high" className="h-[62vh]">
          <Chart data={chartData.data} labels={chartData.labels} type="line" />
        </Card>
      </div>
    </AuthenticatedLayout>
  );
};

export default DashboardPage;
