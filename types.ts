export interface BaseModel {
  id: string;
  created_at: Date;
  updated_at: string;
}

export type Priority = "low" | "medium" | "high";

export interface Todo extends BaseModel {
  user_id?: string;
  title: string;
  description?: string;
  priority: Priority;
  time?: string;
  is_completed: boolean;
  due_date?: string;
}

export interface newTaskForm {
  title: string;
  time: string;
  priority: string;
  category: string;
}
