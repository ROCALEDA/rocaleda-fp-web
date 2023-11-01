import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnterpriseBreadcrumbs from '@/components/breadcrumbs/empresas';

describe('<EnterpriseBreadcrumbs />', () => {
    it('renders the breadcrumbs correctly', () => {
        render(<EnterpriseBreadcrumbs />);
        
        expect(screen.getByText("Empresas")).toBeInTheDocument();
        expect(screen.getByText("Proyectos")).toBeInTheDocument();
    });
});