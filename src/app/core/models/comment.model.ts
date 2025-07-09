export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  rating?: number; // Opcional: rating de 1-5 estrellas
  isEdited?: boolean;
}

export interface CommentForm {
  content: string;
  rating?: number;
} 