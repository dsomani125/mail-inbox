export type mailDataType = {
  userId: number;
  id: number;
  tag: string;
  subject: string;
  body: string;
  onClick?: () => void;
};
