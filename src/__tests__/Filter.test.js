// src/__tests__/Filter.test.js
import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";

test("the input field acts as a controlled input", () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/search/i);
  fireEvent.change(searchInput, { target: { value: "testing 123" } });

  expect(searchInput.value).toBe("testing 123");
});

test("the shopping filters based on the search term to include full matches", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: "Yogurt" },
  });

  expect(screen.getByText("Yogurt")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
});

test("the shopping filters based on the search term to include partial matches", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: "Cheese" },
  });

  expect(screen.getByText("Swiss Cheese")).toBeInTheDocument();
  expect(screen.getByText("String Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
  expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
});
