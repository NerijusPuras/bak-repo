import { ReactElement, ReactNode } from "react";

export interface LectureDetailContainerProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactElement;
  testId?: string;
  arePointsAdded?: boolean;
}
