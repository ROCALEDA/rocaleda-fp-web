import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterProyect from '@/components/project-register/project-register';

describe('<RegisterProyect />', () => {

  it('renders without crashing', () => {
    expect(() => {
        render(<RegisterProyect />);
    }).not.toThrow();
  });


});