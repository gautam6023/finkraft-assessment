import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

interface ISpaceData {
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

const DashboardTable = () => {
  const [data, setData] = useState<ISpaceData[]>([]);
  const [isLoading, setIsLogin] = useState<boolean>(false);

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

  useEffect(() => {
    getSpaceData();
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const getSpaceData = async () => {
    setIsLogin(true);
    try {
      const { data: fetchedData } = (await axios.get(
        "https://www.ag-grid.com/example-assets/space-mission-data.json"
      )) as {
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
    <>
      <h1 className="my-4 text-xl">
        <span className="text-blue-600 font-semibold">Space Vue</span> data
      </h1>
      <div
        className="ag-theme-quartz"
        style={{
          height: "600px",
          width: "100%",
        }}
      >
        {data && <AgGridReact rowData={data} columnDefs={colDefs} defaultColDef={defaultColDef} animateRows={true} />}
      </div>
    </>
  );
};

export default DashboardTable;
