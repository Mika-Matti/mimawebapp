export interface Post {
  post_title: string;
  post_content: string;
  post_date: string;
  post_is_public: boolean;
  post_id?: number;
  user_id?: number;
}
