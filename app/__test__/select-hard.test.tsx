import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BasicSelect from "@/components/select-hard/select";

describe("BasicSelect Component", () => {
  const mockOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  it("renders the provided label", () => {
    render(<BasicSelect text="Select an option" options={mockOptions} />);
    expect(screen.getByLabelText(/Select an option/i)).toBeInTheDocument();
  });

  it("renders provided options", async () => {
    render(<BasicSelect text="Select an option" options={mockOptions} />);

    const dropdown = screen.getByRole("combobox");
    userEvent.click(dropdown);
    for (const option of mockOptions) {
      expect(
        await screen.findByText(new RegExp(option.label, "i"))
      ).toBeInTheDocument();
    }
  });

  it("allows selection of multiple options", async () => {
    render(<BasicSelect text="Select an option" options={mockOptions} />);

    const dropdown = screen.getByRole("combobox");
    userEvent.click(dropdown);

    await waitFor(() => {
      const option1 = screen.getByText(new RegExp("Option 1", "i"));
      const option2 = screen.getByText(new RegExp("Option 2", "i"));
      userEvent.click(option1);
      userEvent.click(option2);
    });

    userEvent.click(dropdown);
  });
  it("renders chips for selected options", async () => {
    render(<BasicSelect text="Select an option" options={mockOptions} />);
    const dropdown = screen.getByRole("combobox");
    userEvent.click(dropdown);
    await waitFor(() => {
      const option1 = screen.getByText(new RegExp("Option 1", "i"));
      userEvent.click(option1);
    });
    const chip = screen.getByText(new RegExp("Option 1", "i"));
    expect(chip).toBeInTheDocument();
  });
  it("changes the style of selected menu items", async () => {
    render(<BasicSelect text="Select an option" options={mockOptions} />);
    const dropdown = screen.getByRole("combobox");
    userEvent.click(dropdown);
    await waitFor(() => {
      const option1 = screen.getByText(new RegExp("Option 1", "i"));
      userEvent.click(option1);
    });
    const menuItem = screen.getByText(new RegExp("Option 1", "i"));
    // Add an assertion for the style changes you expect
  });
  it("allows deselecting a selected option", async () => {
    render(<BasicSelect text="Select an option" options={mockOptions} />);
    const dropdown = screen.getByRole("combobox");
    userEvent.click(dropdown);
    await waitFor(() => {
      const option1 = screen.getByText(new RegExp("Option 1", "i"));
      userEvent.click(option1);  // Select
      userEvent.click(option1);  // Deselect
    });
    // Add assertions to verify that the option has been deselected
  });
});
