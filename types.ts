export type Priority = "low" | "medium" | "high";

export interface SubTask {
  id: string;
  task_id: string;
  title: string;
  is_completed: boolean;
}
export interface Task {
  id: string;
  title: string;
  priority: Priority;
  category: string;
  time: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
  subtasks: SubTask[];
}

export interface newTaskForm {
  title: string;
  time: string;
  priority: string;
  category: string;
}
