import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ProfileCard from "@/components/projects/create/profileCard";
import userEvent from "@testing-library/user-event";

describe("<ProfileCard />", () => {
  it("renders without crashing", () => {
    expect(() => {
      render(
        <ProfileCard
          profile={{
            profileName: "John Doe",
            techSkills: ["JavaScript", "React"],
            softSkills: ["Communication", "Teamwork"],
            numberOfProfiles: 2,
          }}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      );
    }).not.toThrow();
  });
  it("calls onDelete when the delete button is clicked", async () => {
    const handleDelete = jest.fn();
    const { getByLabelText } = render(
      <ProfileCard
        profile={{
          profileName: "John Doe",
          techSkills: ["JavaScript", "React"],
          softSkills: ["Communication", "Teamwork"],
          numberOfProfiles: 2,
        }}
        onEdit={() => {}}
        onDelete={handleDelete}
      />
    );

    userEvent.click(getByLabelText("delete"));

    await waitFor(() => expect(handleDelete).toHaveBeenCalledWith("John Doe"));
  });
  it("calls onEdit when the edit button is clicked", async () => {
    const handleEdit = jest.fn();
    const profileData = {
      profileName: "John Doe",
      techSkills: ["JavaScript", "React"],
      softSkills: ["Communication", "Teamwork"],
      numberOfProfiles: 2,
    };

    const { getByRole } = render(
      <ProfileCard
        profile={profileData}
        onEdit={handleEdit}
        onDelete={() => {}}
      />
    );

    userEvent.click(getByRole("button", { name: "edit" }));

    await waitFor(() => expect(handleEdit).toHaveBeenCalledWith(profileData));
  });
});
