import React from "react";
import { render } from "@testing-library/react";
import ProfileCard from "@/components/project-register/profileCard";

describe('<ProfileCard />', () => {
  it('renders without crashing', () => {
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
});