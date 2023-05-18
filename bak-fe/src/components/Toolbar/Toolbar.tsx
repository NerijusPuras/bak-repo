import classNames from "classnames";
import "./Toolbar.scss";
import { ToolbarProps } from "./types";

const Toolbar = ({
  contentLeft,
  contentRight,
  isFixed = false,
  isFullWidth,
}: ToolbarProps) => (
  <div
    className={classNames("toolbar", { "toolbar--fixed": isFixed })}
    data-testid="toolbar"
  >
    <div
      className={classNames("toolbar__content", {
        "content-wrapper-l": !isFullWidth,
      })}
    >
      <div className="toolbar__content-side" data-testid="toolbar-left">
        {contentLeft}
      </div>
      <div className="toolbar__content-side" data-testid="toolbar-right">
        {contentRight}
      </div>
    </div>
  </div>
);

export default Toolbar;
