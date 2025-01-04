export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  category_id?: string;
  tags?: string[];
  code_snippet?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}
