import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CandidatesTable from "./candidates-table";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [], total_pages: 0 }),
  })
);
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ data: { user: { token: "mock-token" } } })),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ pathname: "/somepath" })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe("CandidatesTable", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<CandidatesTable />);
    expect(getByText("Cargando...")).toBeInTheDocument();
  });
});
