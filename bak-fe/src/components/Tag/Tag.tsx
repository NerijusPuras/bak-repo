import classNames from "classnames";
import "./Tag.scss";
import { TagProps } from "./types";

const Tag = ({ className, variant, children }: TagProps) => (
  <div
    className={classNames(`tag tag--${variant}`, {
      [`${className}`]: className,
    })}
    data-testid="tag"
  >
    {children}
  </div>
);

export default Tag;
