import { KnowledgeSharingPageProps } from "./types";
import "./KnowledgeSharingPage.scss";
import Button from "components/Button";
import { ButtonVariant } from "components/Button/enums";
import { usePostContributionMutation } from "services/slide/slide.service";
import { useEffect, useState } from "react";
import { useGetContributionsCountForLectureQuery } from "services/lecture/lecture.service";
import Loader from "components/Loader";

const KnowledgeSharingPage = ({
  lectureTitle,
  lectureId,
  slideId,
  onKnowledgeSharingClose,
  onKnowledgeSharingSubmit,
  assignKnowledgeSharingBadge,
}: KnowledgeSharingPageProps) => {
  const [postContribution] = usePostContributionMutation();
  const { data: contributionsCount, isLoading } =
    useGetContributionsCountForLectureQuery(lectureId);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSubmit = async () => {
    assignKnowledgeSharingBadge();
    await postContribution({ lectureId, slideId, text: inputValue });
    onKnowledgeSharingSubmit(true);
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      setIsSubmitDisabled(true);
      return;
    }
    setIsSubmitDisabled(false);
  }, [inputValue]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="knowledge-sharing-page">
      <div className="knowledge-sharing-page__content-container">
        <div className="knowledge-sharing-page__title-wrapper">
          <h3>{lectureTitle}</h3>
        </div>
        <h1 className="knowledge-sharing-page__title">
          Ar žinai papildomai dalykų šiai potemiai? Pasidalink ir gauk žinių
          dalintojo ženklelį!
        </h1>
        <h4 className="knowledge-sharing-page__title">
          Jau {contributionsCount} žmonės pasidalino savo žiniomis, pasidalink
          ir tu
        </h4>
        <textarea
          className="knowledge-sharing-page__input"
          //type="text"
          id="textInput"
          placeholder="Įrašyk, ką papildomai žinai"
          value={inputValue}
          onChange={handleChange}
        />
        <div className="knowledge-sharing-page__action-buttons">
          <Button
            variant={ButtonVariant.secondaryFilled}
            onClick={onKnowledgeSharingClose}
          >
            Praleisti
          </Button>
          <Button
            variant={ButtonVariant.primaryFilled}
            onClick={handleSubmit}
            isDisabled={isSubmitDisabled}
          >
            Pateikti
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSharingPage;
