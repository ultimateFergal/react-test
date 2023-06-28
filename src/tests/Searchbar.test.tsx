import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import SearchBar from "../components/SearchBar";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setSearchWord, addtoSearchHistory, setShowSuggestions } from "../store/slices/gifs";

jest.mock("react-redux", () => {
    return {
      ...jest.requireActual("react-redux"),
      useDispatch: jest.fn(),
    };
  });

// jest.mock("react-redux");
describe("SearchBox component tests", () => {
  const queryClient = new QueryClient();
  it("handleChange updates keyword value and dispatches setShowSuggestions action", async () => {
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <SearchBar />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );

    const inputElement = screen.getByRole("searchbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "example" } });
    expect(inputElement.value).toBe("example");
    expect(dispatch).toHaveBeenCalledWith(setShowSuggestions(true));
    
    const usernameInputEl = screen.getByPlaceholderText(/Search for Gifs/i);
    expect(usernameInputEl).toBeInTheDocument();
  });

  it("handleSubmit dispatches setSearchWord, addToSearchHistory, and navigates to search route", async () => {
  
    // const dispatchMock = jest.fn();
    // (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    // useDispatch.mockImplementation(() => dispatchMock);
    // useDispatch.mockReturnValue(dispatchMock);

    // useDispatch.mockImplementation(() => dispatchMock);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <SearchBar />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );

    const inputElement = screen.getByRole("searchbox");
    const submitButton = screen.getByRole("button", { name: "Search" });
  
    fireEvent.change(inputElement, { target: { value: "example" } });
    fireEvent.click(submitButton);
  
    expect(dispatch).toHaveBeenCalledWith(setSearchWord("example"));
    expect(dispatch).toHaveBeenCalledWith(addtoSearchHistory("example"));
    expect(dispatch).toHaveBeenCalledWith(setShowSuggestions(false));
  });
});
