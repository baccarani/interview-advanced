import { ThemeProviderState, Theme } from "@/features/theme/ThemeTypes";
import { createContext, ReactNode, useState, useContext } from "react";

const MockThemeContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export const MockThemeProvider: React.FC<{
  children: ReactNode;
  initialTheme?: Theme;
}> = ({ children, initialTheme = "light" }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const value = { theme, setTheme };

  return (
    <MockThemeContext.Provider value={value}>
      {children}
    </MockThemeContext.Provider>
  );
};

export const useMockTheme = (): ThemeProviderState => {
  const context = useContext(MockThemeContext);
  if (!context) {
    throw new Error("useMockTheme must be used within a MockThemeProvider");
  }
  return context;
};
