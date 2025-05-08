export interface Todo {
  id: string;
  title: string;
  description?: string;
  deadline: Date;
  completed: boolean;
  createdAt: Date;
}
