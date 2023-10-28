import React from "react";
import { render } from "@testing-library/react";
import CreateProjectForm from "@/components/proyect-form/proyect-form";

describe('<CreateProjectForm />', () => {
    it('renders without crashing', () => {
        // Definir mock props basadas en la interfaz
        const mockProps = {
            proyectName: "Test Project",
            handleTitleChange: jest.fn(),
            proyectDescription: "Test Project Description",
            handleDescriptionChange: jest.fn(),
            updateProfiles: jest.fn(),
            updateEmployees: jest.fn()
        };
        
        expect(() => {
            render(<CreateProjectForm {...mockProps} />);
        }).not.toThrow();
    });
});