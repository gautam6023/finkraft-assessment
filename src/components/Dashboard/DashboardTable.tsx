import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useEffect, useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

export interface ISpaceData {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

interface CustomColDef extends ColDef {
  cellRenderer?: (params: any) => React.ReactNode;
}

interface IDashboardTable {
  data: ISpaceData[];
}
const DashboardTable = ({ data: missionData }: IDashboardTable) => {
  const [data, setData] = useState<ISpaceData[]>([]);

  useEffect(() => {
    setData(missionData);
  }, [missionData]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, _setColDefs] = useState<CustomColDef[]>([
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "time" },
    { field: "rocket" },
    { field: "price" },
    { field: "successful", cellRenderer: (params) => <span>{params.value ? "Yes" : "No"}</span> },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  return (
    <div className="border-[1px] mx-4 py-4 rounded-md bg-white">
      <h2 className="font-bold">Mission Data</h2>
      <div
        className="ag-theme-quartz p-2"
        style={{
          height: "600px",
          width: "100%",
        }}
      >
        {data && <AgGridReact rowData={data} columnDefs={colDefs} defaultColDef={defaultColDef} animateRows={true} />}
      </div>
    </div>
  );
};

export default DashboardTable;
