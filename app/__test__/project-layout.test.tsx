import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '@/components/layout/project-layout';

describe('<Layout />', () => {
    it('renders the layout correctly', () => {
        const testChildText = "Test Child Content";
        render(
            <Layout>
                <div>{testChildText}</div>
            </Layout>
        );
        
        // Verifica que los componentes ResponsiveAppBar y EnterpriseBreadcrumbs estén presentes
        // Nota: Necesitarás algunos identificadores (por ejemplo, texto o roles) de estos componentes para realizar estas verificaciones.
        expect(screen.getByTestId("responsiveAppBarTestId")).toBeInTheDocument(); // Asumiendo que ResponsiveAppBar tiene un data-testid="responsiveAppBarTestId"
        expect(screen.getByTestId("enterpriseBreadcrumbsTestId")).toBeInTheDocument(); // Asumiendo que EnterpriseBreadcrumbs tiene un data-testid="enterpriseBreadcrumbsTestId"
        
        // Verifica que el componente hijo se renderice
        expect(screen.getByText(testChildText)).toBeInTheDocument();
    });

    // ... (otros tests que quieras agregar)
});