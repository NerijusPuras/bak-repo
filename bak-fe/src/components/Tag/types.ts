import { ReactNode } from "react";
import { TagVariant } from "./enums";

export interface TagProps {
  className?: string;
  variant: TagVariant;
  children: ReactNode;
}
