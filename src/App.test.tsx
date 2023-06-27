import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("App tests", () => {
  const queryClient = new QueryClient();
  it("should contain title in header for home page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );
    const heading = screen.getByText(/GifSearch!/i);
    expect(heading).toBeInTheDocument();
  });
});
