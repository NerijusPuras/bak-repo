import { SetStateAction } from "react";

export interface KnowledgeSharingPageProps {
  lectureTitle: string;
  lectureId: string;
  slideId: string;
  onKnowledgeSharingClose: SetStateAction<any>;
  onKnowledgeSharingSubmit: SetStateAction<any>;
  assignKnowledgeSharingBadge: SetStateAction<any>;
}
