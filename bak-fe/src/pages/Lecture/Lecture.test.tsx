import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Lecture from "./Lecture";
import { AnyAction, Dispatch } from "redux";
import configureStore, {
  MockStoreEnhanced,
  MockStoreCreator,
} from "redux-mock-store";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn().mockReturnValue({ lectureId: "123" }),
}));
jest.mock("services/lecture/lecture.service");
jest.mock("services/slide/slide.service");
jest.mock("store/toast/slices/toast", () => ({
  showToast: jest.fn(),
}));
jest.mock("components/Loader", () => () => <div>Loading...</div>);

describe("Lecture", () => {
  type RootState = {}; // Replace with your actual RootState type

  const mockStore: MockStoreCreator<
    RootState,
    Dispatch<AnyAction>
  > = configureStore([]);
  let store: MockStoreEnhanced<RootState, Dispatch<AnyAction>>;

  beforeEach(() => {
    store = mockStore({
      game: {
        lecture: {
          currentSlideIndex: 1,
          totalSlides: 10,
          points: 0,
        },
      },
    });
  });

  test("renders Lecture component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/lecture/123`]}>
          <Route path="/lecture/:lectureId">
            <Lecture />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    // Test your assertions for the rendered components, state changes, etc.
    // Example:
    expect(screen.getByText("Skyrius 1/5")).toBeInTheDocument();
    expect(screen.getByText("0 tašk.")).toBeInTheDocument();
  });

  test("handles next slide button click", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/lecture/123`]}>
          <Route path="/lecture/:lectureId">
            <Lecture />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Tęsti"));
    expect(screen.getByText("Skyrius 2/5")).toBeInTheDocument();
  });

  // Add more unit tests for other functionalities and scenarios in the component
});
