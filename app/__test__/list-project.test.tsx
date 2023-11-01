import React from 'react';
import { render, screen } from '@testing-library/react';
import ListProject from '@/components/list-project/list-project';

jest.mock('../../api/auth', () => ({
  getCustomerProjects: jest.fn()
}));

jest.mock('../../components/project-detail/project-detail', () => () => <div data-testid='detailProjectComponent'> Mock DetailProject </div>);

describe('<ListProject />', () => {
  it('renders the component correctly', () => {
    render(<ListProject />);

    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Gestiona tus proyectos y tu equipo')).toBeInTheDocument();
    expect(screen.getByText('CREAR')).toBeInTheDocument();
    expect(screen.getByTestId('detailProjectComponent')).toBeInTheDocument();
  });
});