import LoaderIcon from "assets/icons/loader-icon";
import "./Loader.scss";

const Loader = () => (
  <div className="loader" data-testid="loader">
    <LoaderIcon className="loader__icon" />
  </div>
);

export default Loader;
