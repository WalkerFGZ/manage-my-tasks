export type Priority = "low" | "medium" | "high";

export interface SubTask {
  id: string;
  task_id: string;
  title: string;
  is_completed: boolean;
  temp_task?: boolean;
  created_at: Date;
}
export interface Task {
  id: string;
  user_id: string;
  title: string;
  priority: Priority;
  category: string;
  time: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
  subtasks: SubTask[];
  shared: boolean;
  shared_tasks: SharedTask[];
}

export interface newTaskForm {
  title: string;
  time: string;
  priority: string;
  category: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface SharedTask {
  id: string;
  task_id: string;
  user_id: string;
  shared_with_id: string;
  shared_with_name: string;
  shared_with_img: string;
  created_at: Date;
}
