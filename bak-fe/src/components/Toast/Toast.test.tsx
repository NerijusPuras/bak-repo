import { render, cleanup, screen } from "@testing-library/react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { withProviders } from "utils/testUtils";
import Toast from "./Toast";

const SELECTORS = {
  toast: "toast",
  closeBtn: "toast-close-button",
};

const MOCK_MESSAGE = "A mock toast message";
const MOCK_TYPE = "info";

const MOCK_INITIAL_STATE = {
  isOpen: true,
  type: MOCK_TYPE,
  message: MOCK_MESSAGE,
  displayType: true,
  displayCloseBtn: true,
};

const reactRedux = { useAppDispatch, useAppSelector };
const useDispatchMock = jest.spyOn(reactRedux, "useAppDispatch");
const useSelectorMock = jest.spyOn(reactRedux, "useAppSelector");
const mockStore = configureStore();
const mockDispatch = jest.fn();
useDispatchMock.mockReturnValue(mockDispatch);

const renderComponent = (updatedStore?: MockStoreEnhanced<any>) =>
  render(withProviders(<Toast />, updatedStore));

describe("Toast", () => {
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  afterAll(() => {
    cleanup();
  });

  it("should render Toast component", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.toast)).toBeInTheDocument();
  });

  it("should display correct message in the toast", () => {
    const initialState = {
      toast: MOCK_INITIAL_STATE,
    };

    const updatedStore = mockStore(initialState);
    updatedStore.dispatch = mockDispatch;

    renderComponent(updatedStore);
    expect(screen.getByText(MOCK_MESSAGE)).toBeInTheDocument();
  });

  it("should display close button in the toast", () => {
    const initialState = {
      toast: MOCK_INITIAL_STATE,
    };

    const updatedStore = mockStore(initialState);
    updatedStore.dispatch = mockDispatch;

    renderComponent(updatedStore);
    expect(screen.getByTestId(SELECTORS.closeBtn)).toBeInTheDocument();
  });

  it("should not display type in the toast if displayType is false", () => {
    const initialState = {
      toast: {
        ...MOCK_INITIAL_STATE,
        displayType: false,
      },
    };

    const updatedStore = mockStore(initialState);
    updatedStore.dispatch = mockDispatch;

    renderComponent(updatedStore);
    expect(screen.queryByText(MOCK_TYPE)).not.toBeInTheDocument();
  });

  it("should not display close button in the toast if displayCloseBtn is false", () => {
    const initialState = {
      toast: {
        ...MOCK_INITIAL_STATE,
        displayCloseBtn: false,
      },
    };

    const updatedStore = mockStore(initialState);
    updatedStore.dispatch = mockDispatch;

    renderComponent(updatedStore);
    expect(screen.queryByTestId(SELECTORS.closeBtn)).not.toBeInTheDocument();
  });
});
