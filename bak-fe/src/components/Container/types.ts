import { ReactNode } from "react";

export interface ContainerProps {
  children?: ReactNode;
  className?: string;
  testId?: string;
  small?: boolean;
}
