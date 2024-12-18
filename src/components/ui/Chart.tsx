import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = "bar" | "line";

export interface Props {
  data: number[];
  labels: string[];
  type?: ChartType;
}

const Chart = ({ data, labels, type = "bar" }: Props) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        title: "Article",
        data: data,
        backgroundColor: "rgba(37, 99, 235, 1)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 2,
        borderRadius: 5,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-[50vh]">
      <div className="relative w-full h-full">
        {type === "bar" && <Bar data={chartData} options={chartOptions} />}
        {type === "line" && <Line data={chartData} options={chartOptions} />}
      </div>
    </div>
  );
};

export default Chart;
