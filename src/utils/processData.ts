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
