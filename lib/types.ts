export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  sport: string;
  followers: number;
  following: number;
  totalViews: number;
  verified: boolean;
  joinedDate: string;
  location: string;
  software: string[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  createdAt: string;
}

export interface Video {
  id: string;
  userId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  sport: SportCategory;
  tags: string[];
  views: number;
  likes: number;
  comments: Comment[];
  shares: number;
  duration: string;
  createdAt: string;
  software: string;
  featured: boolean;
}

export type SportCategory =
  | "all"
  | "football"
  | "basketball"
  | "soccer"
  | "baseball"
  | "hockey"
  | "tennis"
  | "mma"
  | "olympics"
  | "motorsport"
  | "esports";

export interface SportFilter {
  id: SportCategory;
  label: string;
  icon: string;
  color: string;
}
