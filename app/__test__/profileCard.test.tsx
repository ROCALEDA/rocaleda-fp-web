import React from "react";
import { render, fireEvent,waitFor } from "@testing-library/react";
import ProfileCard from "@/components/project-register/profileCard";
import userEvent from '@testing-library/user-event';

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
  it('calls onDelete when the delete button is clicked', async () => {
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
  
    userEvent.click(getByLabelText('delete'));
  
    await waitFor(() => 
      expect(handleDelete).toHaveBeenCalledWith("John Doe")
    );
  });
  
  
  


});