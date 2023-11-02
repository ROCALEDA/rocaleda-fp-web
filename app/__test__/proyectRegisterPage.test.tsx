import React from "react";
import { render} from "@testing-library/react";
import RegisterPage from "../projects/register/page";


describe('<RegisterPage />', () => {
    it('renders without crashing', () => {
        expect(() => {
            render(<RegisterPage />);
        }).not.toThrow();
    });
});