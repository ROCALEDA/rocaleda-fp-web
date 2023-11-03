import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ProfileModal from '@/components/project-register/profileModal';
import userEvent from '@testing-library/user-event';

describe('<ProfileModal />', () => {
  it('renders without crashing', async () => {
    render(<ProfileModal open={true} onClose={() => {}} onAdd={() => {}} />);
    const element = await screen.findByText('Crear perfil');
    expect(element).toBeInTheDocument();
});
it('shows an error when profile name is empty', async () => {
  render(<ProfileModal open={true} onClose={() => {}} onAdd={() => {}} />);
  
  const addButton = screen.getByText('AÑADIR');
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText("El nombre del perfil es requerido");
  expect(errorMessage).toBeInTheDocument();
});

it('<ProfileModal /> handles number of profiles input correctly', async () => {
  // Asegúrate de renderizar el componente antes de intentar acceder a cualquier elemento.
  render(<ProfileModal open={true} onClose={() => {}} onAdd={() => {}} />);
  
  const input = screen.getByLabelText(/número de perfiles/i);
  userEvent.clear(input);
  userEvent.type(input, '3');
  await waitFor(() => {
    expect(input).toHaveValue(3);
  });
});
it('handles profile name input correctly', async () => {
  render(<ProfileModal open={true} onClose={() => {}} onAdd={() => {}} />);
  const input = await screen.findByLabelText(/nombre del perfil/i);
  userEvent.type(input, 'Test Profile');
  await waitFor(() => {
    expect(input).toHaveValue('Test Profile');
  });
});
it('handles tech skills selection correctly', async () => {
  render(<ProfileModal open={true} onClose={() => {}} onAdd={() => {}} />);
  const select = screen.getByLabelText(/habilidades técnicas/i);
  userEvent.click(select);
  const option = await screen.findByText(/Angular/i);
  userEvent.click(option);
  expect(screen.getByText('Angular')).toBeInTheDocument();
});
it('handles soft skills selection correctly', async() => {
  render(<ProfileModal open={true} onClose={() => {}} onAdd={() => {}} />);
  const select = screen.getByLabelText(/habilidades blandas/i);
  userEvent.click(select);
  const option = await screen.findByText('Leadership');
  userEvent.click(option);
  expect(screen.getByText('Leadership')).toBeInTheDocument();
});

test('should render and handle input changes and button clicks', async () => {
  const onCloseMock = jest.fn();
  const onAddMock = jest.fn();
  const onEditMock = jest.fn();

  render(<ProfileModal open={true} onClose={onCloseMock} onAdd={onAddMock} onEdit={onEditMock} />);

  const profileNameInput = screen.getByLabelText('Nombre del perfil');
  fireEvent.change(profileNameInput, { target: { value: 'Test Profile' } });
  expect(profileNameInput.value).toBe('Test Profile');

  const techSkillsSelect = screen.getByLabelText('Habilidades técnicas');
  fireEvent.mouseDown(techSkillsSelect);
  const menuItem = screen.getByText('Angular'); // Seleccionamos Angular como ejemplo
  fireEvent.click(menuItem);

  const softSkillsSelect = screen.getByLabelText('Habilidades blandas');
  fireEvent.mouseDown(softSkillsSelect);
  const menuItemSoft = screen.getByText('Adaptability'); // Seleccionamos Adaptability como ejemplo
  fireEvent.click(menuItemSoft);

  const numberOfProfilesInput = screen.getByLabelText('Número de perfiles');
  fireEvent.change(numberOfProfilesInput, { target: { value: '5' } });
  expect(numberOfProfilesInput.value).toBe('5');

  // Puedes continuar con otras acciones, como hacer clic en los botones

  const addButton = await screen.findByText('AÑADIR'); // O 'GUARDAR' si estás editando
  fireEvent.click(addButton);

  await waitFor(() => {
      expect(onAddMock).toHaveBeenCalledTimes(1); // Asegúrate de que el método onAdd ha sido llamado una vez
  });
});


});