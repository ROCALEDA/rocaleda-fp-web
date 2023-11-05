import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomBreadcrumbs from '@/components/breadcrumbs/breadcrumbs';

describe('<CustomBreadcrumbs />', () => {
    const mockRoutes = [
        { name: 'Inicio', path: '/' },
        { name: 'Empresa', path: '/empresa' },
        { name: 'Proyectos', path: '/proyectos' }
    ];

    beforeEach(() => {
        render(<CustomBreadcrumbs routes={mockRoutes} paddingLeft="10px" />);
    });

    it('renders all routes correctly', () => {
        mockRoutes.forEach(route => {
            expect(screen.getByText(route.name)).toBeInTheDocument();
        });
    });
});