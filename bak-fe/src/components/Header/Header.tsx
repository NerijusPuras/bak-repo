import { useNavigate } from "react-router-dom";
import { ButtonVariant } from "components/Button/enums";
import { ROUTES } from "router";
import Button from "../Button";
import "./Header.scss";
import HandIcon from "assets/icons/hand-icon";

const Header = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => navigate(`${ROUTES.topics}`);

  return (
    <>
      <header className="header" data-testid="header">
        <div className="header__content content-wrapper-l">
          <Button
            onClick={handleClickLogo}
            icon={<HandIcon />}
            variant={ButtonVariant.icon}
            className="header__logo-btn"
            ariaLabel="Go to homepage"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
