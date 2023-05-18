import { ReactNode } from "react";

export interface ToolbarProps {
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  isFixed?: boolean;
  isFullWidth?: boolean;
}
