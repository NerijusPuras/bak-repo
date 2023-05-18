import { Link, useNavigate } from "react-router-dom";
// import PlayIcon from "assets/icons/play-icon";
import Button from "components/Button";
import { ButtonVariant } from "components/Button/enums";
// import ImageThumbnailNoImg from "components/ImageThumbnailNoImg";
import { ROUTES } from "router";
import "./TopicCard.scss";
import { ContentCardProps } from "./types";
import { getRelativeDate } from "./utils";
import PlayIcon from "assets/icons/play-icon";

const TopicCard = ({ content, isLecture }: ContentCardProps) => {
  const navigate = useNavigate();
  const relativeDate = getRelativeDate(content.modified);
  const handleStartLecture = () => {
    isLecture
      ? navigate(`${ROUTES.lectures}/${content.id}`)
      : navigate(`${ROUTES.topics}/${content.id}`);
  };

  const returnProperDateTime = (dateString: Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <li className="content-card" data-testid="content-card">
      <div className="content-card__main">
        <div className="content-card__title-and-description">
          <Link
            to={
              isLecture
                ? `${ROUTES.lectures}/${content.id}`
                : `${ROUTES.topics}/${content.id}`
            }
            data-testid="content-card-link"
          >
            <h3>{content.title}</h3>
          </Link>
          <p className="caption">{content.description}</p>
        </div>
        <div className="content-card__actions">
          {isLecture ? (
            <Button
              variant={ButtonVariant.icon}
              onClick={handleStartLecture}
              icon={<PlayIcon className="content-card__play-icon" />}
            />
          ) : null}
        </div>
      </div>
      <div className="content-card__details">
        <p className="paragraph2-regular">
          {isLecture
            ? `${content.childrenCount} ${"potem."}`
            : `${content.childrenCount} ${"skyr."}`}
        </p>
        <p className="paragraph2-regular">{`Atnaujinta ${returnProperDateTime(
          content.modified
        )}`}</p>
      </div>
    </li>
  );
};

export default TopicCard;
