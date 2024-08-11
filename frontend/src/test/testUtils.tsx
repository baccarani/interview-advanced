import { ReactElement } from "react";
import { MockThemeProvider } from "./mocks/MockThemeProvider";
import { RenderOptions, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export const renderWithThemeContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MockThemeProvider>{children}</MockThemeProvider>
    ),
    ...options,
  });

export const renderWithRouter = (
  ui: ReactElement,
  { initialRoutes = ["/"], initialIndex = 0 } = {}
) => {
  return {
    ...render(
      <MemoryRouter initialEntries={initialRoutes} initialIndex={initialIndex}>
        {ui}
      </MemoryRouter>
    ),
  };
};
