type MissionData = {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
};

export type SpanData = {
  span: string;
  [company: string]: number | string;
};
export interface IMissonsStatusData {
  totalMissions: SpanData[];
  failedMissions: SpanData[];
  successfulMissions: SpanData[];
}

type CompanyCost = {
  company: string;
  totalCost: number;
};

export type DecadeData = {
  [decade: string]: CompanyCost[];
};
export const processData = (missions: MissionData[]): IMissonsStatusData => {
  const totalMissions: SpanData[] = [];
  const failedMissions: SpanData[] = [];
  const successfulMissions: SpanData[] = [];

  for (let year = 1950; year < 2030; year += 10) {
    const spanEnd = year + 9;
    const spanLabel = `${year}-${spanEnd}`;
    const spanTotal: SpanData = { span: spanLabel };
    const spanFailed: SpanData = { span: spanLabel };
    const spanSuccessful: SpanData = { span: spanLabel };

    missions.forEach((mission) => {
      const missionYear = new Date(mission.date).getFullYear();
      if (missionYear >= year && missionYear <= spanEnd) {
        spanTotal[mission.company] = (Number(spanTotal[mission.company]) || 0) + 1;
        if (mission.successful) {
          spanSuccessful[mission.company] = (Number(spanSuccessful[mission.company]) || 0) + 1;
        } else {
          spanFailed[mission.company] = (Number(spanFailed[mission.company]) || 0) + 1;
        }
      }
    });

    totalMissions.push(spanTotal);
    failedMissions.push(spanFailed);
    successfulMissions.push(spanSuccessful);
  }

  return { totalMissions, failedMissions, successfulMissions };
};

export const getCosting = (missions: MissionData[]): DecadeData => {
  const decadeData: DecadeData = {};

  for (let year = 1950; year < 2030; year += 10) {
    const spanEnd = year + 9;
    const spanLabel = `${year}-${spanEnd}`;
    decadeData[spanLabel] = [];

    missions.forEach((mission) => {
      const missionYear = new Date(mission.date).getFullYear();
      if (missionYear >= year && missionYear <= spanEnd) {
        const existingCompany = decadeData[spanLabel].find((c) => c.company === mission.company);
        if (existingCompany) {
          existingCompany.totalCost += mission.price;
        } else {
          decadeData[spanLabel].push({ company: mission.company, totalCost: mission.price });
        }
      }
    });
  }

  return decadeData;
};
