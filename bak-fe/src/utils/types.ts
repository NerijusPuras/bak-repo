export interface Topic {
  id: string;
  created: Date;
  modified: Date;
  title: string;
  description: string;
  lectures: Array<Lecture>
}

export interface TopicDto {
  id: string;
  modified: Date;
  title: string;
  description: string;
  childrenCount: number
}

export interface LectureDto {
  id: string;
  modified: Date;
  title: string;
  description: string;
  childrenCount: number
}

export interface SlideDto {
  id: string;
  text: string;
  index: number
  isQuestion: string;
  answers?: Answer[]
}

export interface ContributionDto {
  id: string;
  text: string;
}

export interface ContributionSavingDto {
  lectureId: string;
  slideId: string;
  text: string;
}

export interface Lecture {
  id: string;
  title: string;
  description: string;
  created: Date;
  modified: Date;
}

export interface Answer {
  id?: string;
  text: string;
  isCorrect?: boolean;
}

export interface UserScore {
  playerName: string;
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  lectureId?: string;
  hasExpertBadge?: boolean;
  hasKnowledgeSharingBadge?: boolean;
}

export interface JointUserScore {
  playerName: string;
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  lectureId?: string;
  hasExpertBadge?: boolean;
  hasKnowledgeSharingBadge?: boolean;
  expertBadgeCount?: number;
  knowledgeSharingBadgeCount?: number; 
}

export type Leaderboard = UserScore[];

export type MainLeaderboard = JointUserScore[];

export interface ContributionValidation {
  contributionId: string;
  validationResult: number;
  validatedUserName: string;
}