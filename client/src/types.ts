export type User = { id: string; name: string; email: string };

export type Entry = {
  _id: string;
  userId: string;
  date: string;      // YYYY-MM-DD
  title: string;
  content: string;
  tags: string[];
  mood: number;      // 1-5
  links: string[];
  timeSpent: number; // minutes
  createdAt: string;
  updatedAt: string;
};