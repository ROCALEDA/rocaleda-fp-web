import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailProject from '@/components/project-detail/project-detail';

describe('<DetailProject />', () => {
    it('renders the projects correctly', () => {
        render(<DetailProject />);

        const titles = screen.getAllByText("Equipo pendiente");
        expect(titles.length).toBeGreaterThan(1);
    });
});