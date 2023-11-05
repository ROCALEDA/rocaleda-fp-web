import React from "react";
import { render, waitFor } from "@testing-library/react";
import Candidates from "@/components/candidates/candidates";

// Mocking the global fetch function
global.fetch = jest.fn();

// Example usage: mocking a successful fetch response
const mockData = { data: { data: [] } };
const mockResponse = { json: () => Promise.resolve(mockData) };
global.fetch.mockResolvedValue(mockResponse);

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: any }) => <a>{children}</a>,
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 1, // Puedes ajustar este valor según lo que necesites para la prueba
      },
    },
    status: "authenticated",
  }),
  signIn: jest.fn(),
}));

jest.mock("notistack", () => ({
  enqueueSnackbar: jest.fn(),
}));

describe("<Candidates />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders 'No hay candidatos para mostrar' when data is an empty array", async () => {
    const emptyData = [];
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(emptyData) });

    const { getByText } = render(<Candidates />);
    await waitFor(() => {
      expect(getByText("No hay candidatos para mostrar")).toBeInTheDocument();
    });
  });

  it("renders table when data contains values", async () => {
    const mockData = {
      data: [
        { user_id: 749, name: "Candidate 1", tech_skills: [], soft_skills: [] },
        { user_id: 910, name: "Candidate 2", tech_skills: [], soft_skills: [] },
      ],
    };
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData) });

    const { getByText } = render(<Candidates />);
    await waitFor(() => {
      expect(getByText("749")).toBeInTheDocument();
      expect(getByText("910")).toBeInTheDocument();
    });
  });
});
