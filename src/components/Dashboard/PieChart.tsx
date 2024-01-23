import { useEffect, useState } from "react";
import { ISpaceData } from "./DashboardTable";

import { AgChartOptions } from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import { Select } from "flowbite-react";

interface IPieCharttData {
  data: ISpaceData[];
}

interface IMissionSummary {
  successful: number;
  unsuccessful: number;
}

interface IChartData {
  type: string;
  count: number;
}
const PieChart = ({ data: missionData }: IPieCharttData) => {
  const [data, setData] = useState<ISpaceData[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("SpaceX");
  const [companyList, setCompanyList] = useState<string[]>([]);
  const [options, setOptions] = useState<AgChartOptions>({
    data: [],

    series: [
      {
        type: "pie",
        angleKey: "count",
        legendItemKey: "type",
        calloutLabelKey: "type",
        sectorLabelKey: "count",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          fontSize: "12px",
          formatter: ({ value }) => `${value}`,
        },
      },
    ],
  });

  // Function to filter out comapny missions
  const getMissionsByCompany = (missions: ISpaceData[], company: string): IChartData[] => {
    setSelectedCompany(company);
    const summary: IMissionSummary = {
      successful: 0,
      unsuccessful: 0,
    };

    missions.forEach((mission) => {
      if (mission.company === company) {
        mission.successful ? summary.successful++ : summary.unsuccessful++;
      }
    });

    const chartD = [
      {
        type: "Successful",
        count: summary.successful,
      },
      {
        type: "Unsuccessful",
        count: summary.unsuccessful,
      },
    ];

    setOptions({ ...options, data: [...chartD] });
    // setChartData(chartD);
    return chartD;
  };

  useEffect(() => {
    setData(missionData);
    if (missionData.length > 0) {
      const companyNames: string[] = [];

      // Finding companies
      missionData.map((el) => {
        const str: string = el.company;
        if (!companyNames.includes(str)) {
          companyNames.push(el.company);
        }
      });
      setCompanyList([...companyNames]);

      // First company missions
      const firstCompany = getMissionsByCompany(missionData, selectedCompany);
      setOptions({ ...options, data: [...firstCompany] });
    }
  }, [missionData]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-3 font-medium">Company wise Mission Success and Failures</h1>
      <div className="w-[200px]">
        <Select
          id="countries"
          value={selectedCompany}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => getMissionsByCompany(data, e.target.value)}
        >
          {companyList.map((company) => (
            <option key={company} value={company} onClick={() => setSelectedCompany(company)}>
              {company}
            </option>
          ))}
        </Select>
      </div>
      <AgChartsReact options={options} />
    </div>
  );
};

export default PieChart;
