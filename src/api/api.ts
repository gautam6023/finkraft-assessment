import axios from "axios";

export const getMockData = async () => {
  return axios.get("https://www.ag-grid.com/example-assets/space-mission-data.json");
};
