import classNames from "classnames";
import "./Container.scss";
import { ContainerProps } from "./types";

const Container = ({
  children,
  className,
  testId,
  small = false,
}: ContainerProps) => {
  const containerClasses = classNames(
    `container`,
    small ? "container--small" : "container--large",
    {
      [`${className}`]: className,
    }
  );

  return (
    <div className={containerClasses} data-testid={testId}>
      {children}
    </div>
  );
};

export default Container;
