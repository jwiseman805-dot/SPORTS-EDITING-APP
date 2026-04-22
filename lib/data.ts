import { User, Video, SportFilter } from "./types";

export const SPORT_FILTERS: SportFilter[] = [
  { id: "all", label: "All Sports", icon: "🏆", color: "from-yellow-500 to-orange-500" },
  { id: "football", label: "Football", icon: "🏈", color: "from-green-500 to-emerald-600" },
  { id: "basketball", label: "Basketball", icon: "🏀", color: "from-orange-500 to-red-500" },
  { id: "soccer", label: "Soccer", icon: "⚽", color: "from-blue-500 to-cyan-500" },
  { id: "baseball", label: "Baseball", icon: "⚾", color: "from-red-500 to-rose-600" },
  { id: "hockey", label: "Hockey", icon: "🏒", color: "from-cyan-500 to-blue-600" },
  { id: "tennis", label: "Tennis", icon: "🎾", color: "from-lime-500 to-green-500" },
  { id: "mma", label: "MMA", icon: "🥊", color: "from-red-600 to-orange-600" },
  { id: "olympics", label: "Olympics", icon: "🥇", color: "from-yellow-400 to-yellow-600" },
  { id: "motorsport", label: "Motorsport", icon: "🏎️", color: "from-gray-400 to-slate-500" },
  { id: "esports", label: "Esports", icon: "🎮", color: "from-purple-500 to-violet-600" },
];

export const USERS: User[] = [
  {
    id: "u1",
    username: "cutmaster_cole",
    displayName: "Cole Reeves",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cole",
    bio: "NFL highlight editor. 8 years turning raw footage into cinematic moments. Premiere Pro wizard 🎬",
    sport: "football",
    followers: 48200,
    following: 312,
    totalViews: 12400000,
    verified: true,
    joinedDate: "2020-03-12",
    location: "Los Angeles, CA",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
  {
    id: "u2",
    username: "hoopseditor_maya",
    displayName: "Maya Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
    bio: "NBA content creator & freelance editor. Motion graphics specialist. DM for collab 🏀",
    sport: "basketball",
    followers: 31500,
    following: 528,
    totalViews: 7800000,
    verified: true,
    joinedDate: "2021-01-08",
    location: "New York, NY",
    software: ["DaVinci Resolve", "After Effects", "Final Cut Pro"],
  },
  {
    id: "u3",
    username: "soccerfilms_jorge",
    displayName: "Jorge Mendez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jorge",
    bio: "La Liga & Champions League edits. Cinematic football storytelling. Barcelona ❤️",
    sport: "soccer",
    followers: 89700,
    following: 214,
    totalViews: 45000000,
    verified: true,
    joinedDate: "2019-07-22",
    location: "Barcelona, Spain",
    software: ["DaVinci Resolve", "Premiere Pro"],
  },
  {
    id: "u4",
    username: "iceedits_sam",
    displayName: "Sam Kowalski",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
    bio: "NHL editor living for that perfect icing shot. Speed & precision in every cut ❄️",
    sport: "hockey",
    followers: 18300,
    following: 441,
    totalViews: 3200000,
    verified: false,
    joinedDate: "2022-09-14",
    location: "Toronto, Canada",
    software: ["Final Cut Pro", "Motion"],
  },
  {
    id: "u5",
    username: "octagon_edits",
    displayName: "Nia Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nia",
    bio: "UFC & Bellator fight edits. Slow-mo specialist. Every punch tells a story 🥊",
    sport: "mma",
    followers: 62100,
    following: 189,
    totalViews: 28000000,
    verified: true,
    joinedDate: "2020-11-30",
    location: "Las Vegas, NV",
    software: ["Premiere Pro", "After Effects"],
  },
  {
    id: "u6",
    username: "f1_frames",
    displayName: "Luca Ferrari",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luca",
    bio: "F1 & motorsport cinematic edits. 200mph storytelling. DaVinci color grading master 🏎️",
    sport: "motorsport",
    followers: 74000,
    following: 302,
    totalViews: 33000000,
    verified: true,
    joinedDate: "2020-05-18",
    location: "Milan, Italy",
    software: ["DaVinci Resolve", "After Effects"],
  },
];

export const VIDEOS: Video[] = [
  {
    id: "v1",
    userId: "u3",
    title: "Champions League Final — Cinematic Edit 4K",
    description:
      "Recreated the magic of last year's final with a cinematic color grade and orchestral score sync. 40 hours of work compressed into 3 minutes of pure football emotion.",
    thumbnail: "https://picsum.photos/seed/soccer1/640/360",
    videoUrl: "",
    sport: "soccer",
    tags: ["UCL", "cinematic", "4K", "colorgading"],
    views: 2400000,
    likes: 187000,
    comments: [
      { id: "c1", userId: "u1", username: "cutmaster_cole", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cole", text: "The color grade on this is absolutely insane. What LUT did you use?", likes: 412, createdAt: "2024-03-10" },
      { id: "c2", userId: "u5", username: "octagon_edits", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nia", text: "The music sync is perfect bro 🔥 Every beat lands on a key moment.", likes: 289, createdAt: "2024-03-11" },
    ],
    shares: 43000,
    duration: "3:14",
    createdAt: "2024-03-09",
    software: "DaVinci Resolve",
    featured: true,
  },
  {
    id: "v2",
    userId: "u1",
    title: "NFL Season Recap — Best Plays 2023",
    description:
      "Every jaw-dropping play from the 2023 NFL season in one cinematic package. Graded with a gritty, high-contrast look to match the intensity of the game.",
    thumbnail: "https://picsum.photos/seed/football2/640/360",
    videoUrl: "",
    sport: "football",
    tags: ["NFL", "highlights", "premiere", "season-recap"],
    views: 1800000,
    likes: 142000,
    comments: [
      { id: "c3", userId: "u2", username: "hoopseditor_maya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya", text: "That slow-mo sequence at 1:45 is everything. Tutorial please!", likes: 334, createdAt: "2024-02-20" },
      { id: "c4", userId: "u6", username: "f1_frames", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luca", text: "The transitions are seamless. What plugins are you using?", likes: 198, createdAt: "2024-02-21" },
    ],
    shares: 28000,
    duration: "5:22",
    createdAt: "2024-02-18",
    software: "Premiere Pro",
    featured: true,
  },
  {
    id: "v3",
    userId: "u2",
    title: "NBA Dribble Wizards — Motion Graphics Edit",
    description:
      "Tracking motion paths in After Effects to follow the ball movement. Spent 3 weeks on the motion graphics package — every element designed from scratch.",
    thumbnail: "https://picsum.photos/seed/basketball3/640/360",
    videoUrl: "",
    sport: "basketball",
    tags: ["NBA", "motion-graphics", "aftereffects", "tracking"],
    views: 950000,
    likes: 78000,
    comments: [
      { id: "c5", userId: "u3", username: "soccerfilms_jorge", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jorge", text: "Motion tracking on moving players is SO hard. Respect!", likes: 256, createdAt: "2024-01-15" },
    ],
    shares: 15000,
    duration: "2:48",
    createdAt: "2024-01-12",
    software: "After Effects",
    featured: false,
  },
  {
    id: "v4",
    userId: "u5",
    title: "UFC 300 — The Art of the Fight",
    description:
      "Slow motion breakdown of the most technical striking combinations from UFC 300. 240fps footage color graded to look like a dark, gritty feature film.",
    thumbnail: "https://picsum.photos/seed/mma4/640/360",
    videoUrl: "",
    sport: "mma",
    tags: ["UFC", "slowmo", "240fps", "cinematic"],
    views: 3100000,
    likes: 245000,
    comments: [
      { id: "c6", userId: "u1", username: "cutmaster_cole", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cole", text: "That 240fps grade is a masterclass. The grain texture is perfect.", likes: 521, createdAt: "2024-04-02" },
      { id: "c7", userId: "u4", username: "iceedits_sam", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam", text: "This inspired me to do something similar for hockey slapshots 🔥", likes: 144, createdAt: "2024-04-03" },
    ],
    shares: 67000,
    duration: "4:07",
    createdAt: "2024-04-01",
    software: "Premiere Pro",
    featured: true,
  },
  {
    id: "v5",
    userId: "u6",
    title: "Monaco Grand Prix — Cinematic Lap",
    description:
      "One full hot lap of Monaco transformed into a cinematic experience. Custom LUT developed over 2 months to capture the golden hour light of Monte Carlo.",
    thumbnail: "https://picsum.photos/seed/f15/640/360",
    videoUrl: "",
    sport: "motorsport",
    tags: ["F1", "Monaco", "LUT", "cinematic"],
    views: 4700000,
    likes: 389000,
    comments: [
      { id: "c8", userId: "u3", username: "soccerfilms_jorge", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jorge", text: "The sound design combined with this grade… chef's kiss 🤌", likes: 892, createdAt: "2024-05-26" },
      { id: "c9", userId: "u2", username: "hoopseditor_maya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya", text: "Selling that LUT?? I'd pay serious money for this.", likes: 445, createdAt: "2024-05-26" },
    ],
    shares: 112000,
    duration: "6:01",
    createdAt: "2024-05-25",
    software: "DaVinci Resolve",
    featured: true,
  },
  {
    id: "v6",
    userId: "u4",
    title: "NHL Overtime — The Decisive Moments",
    description:
      "Every OT goal from last season's playoffs, back to back. The lighting in arenas is brutal to grade — 6 months learning how to handle the mixed sources.",
    thumbnail: "https://picsum.photos/seed/hockey6/640/360",
    videoUrl: "",
    sport: "hockey",
    tags: ["NHL", "playoffs", "colorgrading", "arena"],
    views: 620000,
    likes: 51000,
    comments: [
      { id: "c10", userId: "u5", username: "octagon_edits", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nia", text: "The arena lighting correction is insane. Post a breakdown!", likes: 178, createdAt: "2024-06-01" },
    ],
    shares: 9000,
    duration: "4:33",
    createdAt: "2024-05-30",
    software: "Final Cut Pro",
    featured: false,
  },
  {
    id: "v7",
    userId: "u3",
    title: "El Clásico — A Rivalry Reborn",
    description:
      "10 years of El Clásico moments condensed into one emotional short film. Archival footage restoration + modern color grading. This one took 3 months.",
    thumbnail: "https://picsum.photos/seed/soccer7/640/360",
    videoUrl: "",
    sport: "soccer",
    tags: ["ElClasico", "Barcelona", "RealMadrid", "documentary"],
    views: 8900000,
    likes: 710000,
    comments: [
      { id: "c11", userId: "u6", username: "f1_frames", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luca", text: "The archival restoration work is the most impressive part. Tutorial??", likes: 1203, createdAt: "2024-06-15" },
    ],
    shares: 234000,
    duration: "9:48",
    createdAt: "2024-06-12",
    software: "DaVinci Resolve",
    featured: true,
  },
  {
    id: "v8",
    userId: "u1",
    title: "Super Bowl Halftime Hype Edit",
    description:
      "Re-edited the halftime show with custom cuts and synced it to the actual crowd noise. The energy in this one is DIFFERENT.",
    thumbnail: "https://picsum.photos/seed/football8/640/360",
    videoUrl: "",
    sport: "football",
    tags: ["SuperBowl", "halftime", "hype", "NFL"],
    views: 5200000,
    likes: 421000,
    comments: [
      { id: "c12", userId: "u2", username: "hoopseditor_maya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya", text: "The crowd sync is INSANE. How did you clean up the audio?", likes: 567, createdAt: "2024-02-12" },
    ],
    shares: 98000,
    duration: "3:55",
    createdAt: "2024-02-11",
    software: "Premiere Pro",
    featured: true,
  },
];

export function getUserById(id: string): User | undefined {
  return USERS.find((u) => u.id === id);
}

export function getUserByUsername(username: string): User | undefined {
  return USERS.find((u) => u.username === username);
}

export function getVideosByUser(userId: string): Video[] {
  return VIDEOS.filter((v) => v.userId === userId);
}

export function getVideosBySport(sport: string): Video[] {
  if (sport === "all") return VIDEOS;
  return VIDEOS.filter((v) => v.sport === sport);
}

export function getFeaturedVideos(): Video[] {
  return VIDEOS.filter((v) => v.featured);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
