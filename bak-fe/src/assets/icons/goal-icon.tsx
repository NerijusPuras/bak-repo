import { SvgProps } from "../types";

const GoalIcon = ({ className, testId }: SvgProps) => (
  <svg
    data-testid={testId}
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.68 13.69L12 11.93L14.31 13.69L13.43 10.84L15.75 9H12.91L12 6.19L11.09 9H8.25L10.56 10.84L9.68 13.69ZM20 10C20 5.58 16.42 2 12 2C7.58 2 4 5.58 4 10C4 12.03 4.76 13.87 6 15.28V23L12 21L18 23V15.28C19.24 13.87 20 12.03 20 10ZM12 4C15.31 4 18 6.69 18 10C18 13.31 15.31 16 12 16C8.69 16 6 13.31 6 10C6 6.69 8.69 4 12 4ZM12 19L8 20.02V16.92C9.18 17.6 10.54 18 12 18C13.46 18 14.82 17.6 16 16.92V20.02L12 19Z"
      fill="currentColor"
    />
  </svg>
);

export default GoalIcon;
