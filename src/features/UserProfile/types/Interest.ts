export type Interest = {
  id: number;
  name: string;
  iconName: any;
};

export type CategoryInterest = {
  id: number;
  name: string;
  interests: Array<Interest>;
};
