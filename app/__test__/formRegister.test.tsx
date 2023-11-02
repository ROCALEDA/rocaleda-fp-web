import { render, screen, fireEvent } from '@testing-library/react';
import FormRegisterProyect from "@/components/project-register/form-register";

describe('<FormRegisterProyect />', () => {

    let mockSetProyectName, mockSetProyectDescription, mockSetProfiles, mockSetEmployees;

    beforeEach(() => {
        mockSetProyectName = jest.fn();
        mockSetProyectDescription = jest.fn();
        mockSetProfiles = jest.fn();
        mockSetEmployees = jest.fn();

        render(<FormRegisterProyect 
            setProyectName={mockSetProyectName}
            setProyectDescription={mockSetProyectDescription}
            setProfiles={mockSetProfiles}
            setEmployees={mockSetEmployees}
        />);
    });

    it('renders without crashing', () => {
        const input = screen.getByLabelText(/nombre/i);
        expect(input).toBeInTheDocument();
    });

    it('calls setProyectName when project name is entered', () => {
        const input = screen.getByLabelText(/nombre/i);
        fireEvent.change(input, { target: { value: 'Test Project' } });

        expect(mockSetProyectName).toHaveBeenCalledWith('Test Project');
    });

    // Similarly, you can write tests for the description and other parts of the component.
    // ...
    
    // Add tests for profiles and employees modals and their interactions.
    // ...

    // Lastly, ensure that form submission works as expected.
});
