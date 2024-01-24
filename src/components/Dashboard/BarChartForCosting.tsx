import { useEffect, useState } from "react";
import { ISpaceData } from "./DashboardTable";
import { DecadeData, getCosting } from "../../utils/processData";
import { Select } from "flowbite-react";
import { AgChartOptions } from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";

interface IBarChartForCosting {
  data: ISpaceData[];
}

const BarChartForCosting = ({ data: missionData }: IBarChartForCosting) => {
  const [data, setData] = useState<DecadeData | null>(null);
  const [decadeList, setDecadeList] = useState<string[]>([]);
  const [selectedDecade, setSelectedDecade] = useState<string>(decadeList[0]);

  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "Space Missions Company wise data",
    },
    data: (data && data[selectedDecade]) || [],
    series: [
      {
        type: "bar",
        xKey: "company",
        yKey: "totalCost",
      },
    ],
  });

  useEffect(() => {
    const newData = data && data[selectedDecade];

    if (newData) {
      setOptions({
        ...options,
        data: newData,
      });
    }
  }, [selectedDecade]);

  useEffect(() => {
    if (missionData) {
      let data = getCosting(missionData);
      let list = Object.keys(data).reverse();
      setDecadeList([...list]);
      setData(data);
      setSelectedDecade(list[0]);
      const newData = data && data[selectedDecade];
      setOptions({
        ...options,
        data: newData,
      });
    }
  }, [missionData]);

  return (
    <div className="px-8 m-4 border-[1px] rounded-md bg-white">
      <h1 className="my-3 font-extrabold">Space Missions Costing at 10 year span</h1>
      <div className="my-4 flex flex-col w-[300px]">
        <div className="flex items-center gap-2 justify-between">
          <p>Select Mission Status</p>
          <Select
            value={selectedDecade}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDecade(e.target.value)}
          >
            {decadeList.map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </Select>
        </div>
      </div>

      <AgChartsReact options={options} />
    </div>
  );
};

export default BarChartForCosting;
