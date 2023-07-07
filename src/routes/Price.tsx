import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  if (isLoading) {
    return <div>Loading chart...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  const exceptData = data ?? [];
  const ChartData = exceptData?.map((i) => {
    const middle = Math.floor((Number(i.open) + Number(i.close)) / 2);
    return {
      x: new Date(i.time_close).getTime(),
      y: [i.low, i.close, String(middle), i.open, i.high],
    };
  });

  return (
    <div>
      <ApexChart
        type="boxPlot"
        series={[
          {
            data: ChartData,
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: "datetime",
            categories: data?.map((price) => price.time_close),
          },
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "50%",
            },
            boxPlot: {
              colors: {
                upper: "#FF8551",
                lower: "#9BCDD2",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Price;
