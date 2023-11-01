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
        
        expect(screen.getByTestId("responsiveAppBarTestId")).toBeInTheDocument(); 
        expect(screen.getByTestId("CustomBreadcrumbsTestId")).toBeInTheDocument(); 
        
        expect(screen.getByText(testChildText)).toBeInTheDocument();
    });
});