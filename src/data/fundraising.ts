export interface FundraisingData {
  communityId: string;
  communityName: string;
  currentAmount: number;
  goalAmount: number;
  nonprofitCount: number;
  businessCount: number;
  lastUpdated: string;
}

export const fundraisingData: FundraisingData[] = [
  {
    communityId: '1',
    communityName: 'Conway',
    currentAmount: 12452,
    goalAmount: 1000000,
    nonprofitCount: 12,
    businessCount: 35,
    lastUpdated: '2025-04-22'
  },
  {
    communityId: '2',
    communityName: 'Amarillo',
    currentAmount: 15670,
    goalAmount: 1000000,
    nonprofitCount: 8,
    businessCount: 22,
    lastUpdated: '2025-04-22'
  }
];

// Total fundraising across all communities
export const totalFundraisingData = {
  currentAmount: 28122,
  goalAmount: 1000000,
  nonprofitCount: fundraisingData.reduce((sum, data) => sum + data.nonprofitCount, 0),
  businessCount: fundraisingData.reduce((sum, data) => sum + data.businessCount, 0),
  lastUpdated: '2025-04-22'
};
