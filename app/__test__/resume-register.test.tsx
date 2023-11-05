import React from 'react';
import { render } from '@testing-library/react';
import ResumeRegisterProyect from '@/components/project-register/resume-register';

describe('<ResumeRegisterProyect />', () => {
  it('renders without crashing', () => {
    expect(() => {
        render(<ResumeRegisterProyect
            proyectName="My Project"
            proyectDescription="This is a description of my project"
            profiles={[]}
            employees={[]}
        />);
    }).not.toThrow();
  });
});

