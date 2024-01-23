import { useEffect, useState } from "react";
import { getMockData } from "../api/api";
import DashboardTable, { ISpaceData } from "../components/Dashboard/DashboardTable";
import PieChart from "../components/Dashboard/PieChart";

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
    <div>
      <div className="w-[100%] bg-gray-400">
        <h1 className="my-4 text-xl text-white">
          <span className="text-blue-600 font-semibold">Space Vue</span> Data
        </h1>
      </div>
      <PieChart data={data} />
      <DashboardTable data={data} />
    </div>
  );
};

export default Dashboard;
