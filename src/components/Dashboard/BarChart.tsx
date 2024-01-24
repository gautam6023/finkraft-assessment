import { useEffect, useState } from "react";
import { ISpaceData } from "./DashboardTable";
import { IMissonsStatusData, SpanData, processData } from "../../utils/processData";
import { AgChartOptions, AgSunburstSeriesOptions } from "ag-charts-community";
import { GetCompanyList } from "./PieChart";
import { AgChartsReact } from "ag-charts-react";
import { Select } from "flowbite-react";

export interface IBarCharttData {
  data: ISpaceData[];
}

enum MissionStatus {
  TOTAL = "Total",
  FAILED = "Failed",
  SUCCESS = "Succeed",
}
const BarChart = ({ data: missionData }: IBarCharttData) => {
  const [_, setData] = useState<ISpaceData[]>([]);
  const [missionStatusData, setMissionStatusData] = useState<IMissonsStatusData | null>(null);
  const [missionStatus, setMissionStatus] = useState<
    MissionStatus.FAILED | MissionStatus.SUCCESS | MissionStatus.TOTAL
  >(MissionStatus.TOTAL);
  const [chartData, setChartData] = useState<SpanData[]>([]);

  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "Space Missions Company wise data",
    },
    subtitle: {
      text: "",
    },
    data: missionStatusData?.totalMissions,
    series: [],
  });

  useEffect(() => {
    const series = GetCompanyList(missionData).map((el) => {
      return {
        type: "bar",
        xKey: "span",
        yKey: el,
        yName: el.toUpperCase(),
      };
    });

    setOptions({
      ...options,
      data: chartData!,
      series: series as AgSunburstSeriesOptions[],
      subtitle: {
        text: missionStatus === "Total" ? "Total Missions" : `Missions that was ${missionStatus}`,
      },
    });
  }, [missionStatusData, missionStatus]);

  useEffect(() => {
    if (missionData.length > 0) {
      setData(missionData);
      const { failedMissions, successfulMissions, totalMissions } = processData(missionData);
      setMissionStatusData({
        failedMissions,
        successfulMissions,
        totalMissions,
      });
      setChartData(totalMissions);
    }
  }, [missionData]);

  const handleMissionFilter = (value: string) => {
    if (value === MissionStatus.FAILED) {
      setMissionStatus(MissionStatus.FAILED);
      setChartData([...missionStatusData?.failedMissions!]);
    } else if (value === MissionStatus.SUCCESS) {
      setMissionStatus(MissionStatus.SUCCESS);
      setChartData([...missionStatusData?.successfulMissions!]);
    } else {
      setMissionStatus(MissionStatus.TOTAL);
      setChartData([...missionStatusData?.totalMissions!]);
    }
  };

  return (
    <div className="px-8 m-4 border-[1px] rounded-md bg-white">
      <h1 className="my-3 font-extrabold">Space Missions from 1950 to 2029</h1>
      <div className="my-4 flex flex-col w-[300px]">
        <div className="flex items-center gap-2 justify-between">
          <p>Select Mission Status</p>
          <Select
            id="countries"
            value={missionStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleMissionFilter(e.target.value)}
          >
            <option value={MissionStatus.TOTAL}>{MissionStatus.TOTAL}</option>
            <option value={MissionStatus.SUCCESS}>{MissionStatus.SUCCESS}</option>
            <option value={MissionStatus.FAILED}>{MissionStatus.FAILED}</option>
          </Select>
        </div>
      </div>

      <AgChartsReact options={options} />
    </div>
  );
};

export default BarChart;
