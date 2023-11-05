import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '@/components/navbar/empresa';  // Ajusta la ruta si es necesario.


describe('<Navbar />', () => {
  
  it('renders without crashing', () => {
    render(<Navbar />);
  });

  it('displays the Cloud icon', () => {
    const { getByTestId } = render(<Navbar />);
    expect(getByTestId('cloud-icon')).toBeInTheDocument();
  });

  it('displays the Quire and Empresas text', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Quire')).toBeInTheDocument();
    expect(getByText('Empresas')).toBeInTheDocument();
  });

  it('displays the Proyectos and Candidatos buttons', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Proyectos')).toBeInTheDocument();
    expect(getByText('Candidatos')).toBeInTheDocument();
  });

  it('displays the language selector', () => {
    const { getByTestId } = render(<Navbar />);
    expect(getByTestId('language-selector')).toBeInTheDocument();
  });

});