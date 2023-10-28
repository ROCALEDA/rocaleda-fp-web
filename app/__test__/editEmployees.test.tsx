import React from "react";
import { render} from "@testing-library/react";
import EditModal, { EditModalProps } from "@/components/editEmployees/EditModal";

describe('<EditModal />', () => {
    it('renders without crashing', () => {
        const props: EditModalProps = {
            open: true,
            onClose: () => {},
            initialData: {},
            onSave: () => {},
            originalName: ""
        };
        expect(() => {
            render(<EditModal {...props} />);
        }).not.toThrowError();
    });
});