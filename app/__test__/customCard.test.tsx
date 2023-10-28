import React from "react";
import { render} from "@testing-library/react";
import CustomCard from "@/components/proyect-card/proyect-card";

describe('<CustomCard />', () => {
  it('renders without crashing', () => {
    expect(() => {
    render(<CustomCard 
        number={1} 
        proyectName="Test Project" 
        proyectDescription="This is a test project" 
        profiles={[]} 
        employees={[]}
    />);
  });
})
});