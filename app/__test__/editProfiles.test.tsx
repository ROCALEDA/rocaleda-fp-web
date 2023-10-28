import React from "react";
import { render } from "@testing-library/react";
import EditProfileModal, { EditProfileProps } from "@/components/editProfile/EditProfile";

describe('<EditProfileModal />', () => {
    it('renders without crashing', () => {
        expect(() => {
            const props: EditProfileProps = {
                open: true,
                onClose: () => {},
                initialData: {
                    profileName: "Test Profile",
                    techSkills: ["JavaScript", "React"],
                    softSkills: ["Communication", "Teamwork"],
                    numberOfProfiles: 1
                },
                onSave: () => {}, 
                originalProfileName: "Test Profile"
            };
            render(<EditProfileModal {...props} />);
        }).not.toThrow();
    });
});