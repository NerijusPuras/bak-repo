import { render, screen } from "@testing-library/react";
import { withProviders } from "utils/testUtils";
import Quiz from "./Topic";

const SELECTORS = {
  topicPage: "topic-page",
};

const mockTopic = { id: 1, title: "Topic Title" };

jest.mock("services/topic/topic.service", () => ({
  useGetLectureListByTopicIdQuery: () => ({
    data: mockTopic,
    isFetching: false,
  }),
  useGetTopicByTopicIdQuery: () => ({
    data: mockTopic,
    isFetching: false,
  }),
}));

const renderComponent = () => render(withProviders(<Quiz />));

describe("Topic", () => {
  it("should render Topic component", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.topicPage)).toBeInTheDocument();
  });
});
