export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  category: string;
  time: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface newTaskForm {
  title: string;
  time: string;
  priority: string;
  category: string;
}
