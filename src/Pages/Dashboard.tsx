import { useEffect, useState } from "react";
import { getMockData } from "../api/api";
import DashboardTable, { ISpaceData } from "../components/Dashboard/DashboardTable";
import PieChart from "../components/Dashboard/PieChart";
import BarChart from "../components/Dashboard/BarChart";
import BarChartForCosting from "../components/Dashboard/BarChartForCosting";

const Dashboard = () => {
  const [isLoading, setIsLogin] = useState<boolean>(false);
  const [data, setData] = useState<ISpaceData[]>([]);

  useEffect(() => {
    getSpaceData();
  }, []);

  const getSpaceData = async () => {
    setIsLogin(true);
    try {
      const { data: fetchedData } = (await getMockData()) as {
        data: ISpaceData[];
      };
      setData(fetchedData);
      setIsLogin(false);
    } catch (err) {
      setIsLogin(false);
      console.log(err);
    }
  };
  return (
    <div className="bg-slate-100">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="w-[100%] bg-gray-400">
            <h1 className="my-4 text-xl text-white">
              <span className="text-blue-600 font-semibold">SpaceVue</span> Data
            </h1>
          </div>
          <BarChart data={data} />
          <PieChart data={data} />
          <BarChartForCosting data={data} />
          <DashboardTable data={data} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
