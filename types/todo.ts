export interface Todo {
  todo_id: number;
  todo_title: string;
  todo_category?: string;
  todo_priority?:string;
  todo_description?: string;
  todo_due_date?:string;
  todo_completed:boolean;
  created_at:number;
  updated_at:number;
}