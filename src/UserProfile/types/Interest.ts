export type Interest = {
  id?: number;
  description: string;
  iconName: any;
};

export type CategoryInterest = {
  id: number;
  name: string;
  interests: Array<number>;
};
