import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "@/components/client-register/register";
import { registerCompany } from "@/api/apiService";
import { fn } from 'jest-mock';

describe("<Register />", () => {
    test("renders the registration client form", () => {
        const { getByText } = render(<Register />);
    });
    test("shows error on invalid submission", async () => {
        const { getByText, getByLabelText, findByText } = render(<Register />);
        const companyInput = getByLabelText(/Compañía/);
        const phoneInput = getByLabelText(/Teléfono/);
        const emailInput = getByLabelText(/Correo/);
        const passwordInput = getByLabelText(/Contraseña/);
        const password2Input = getByLabelText(/Repetir contraseña/);
        const submitButton = getByText("Registrar");

        fireEvent.change(phoneInput, { target: { value: "+573503325442" } });
        fireEvent.click(submitButton);
});
});