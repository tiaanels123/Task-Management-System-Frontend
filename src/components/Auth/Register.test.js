const React = require('react');
const { render, fireEvent, waitFor, screen, act } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios').default;
const { AuthProvider } = require('../../context/AuthContext');
const Register = require('./Register').default;

const mock = new MockAdapter(axios);

// Mock the alert function before all tests
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Reset the mock before each test
beforeEach(() => {
  mock.reset();
});

describe('Register component', () => {
  it('handles user registration', async () => {
    // Mock successful registration response
    mock.onPost('http://localhost:5249/api/auth/register').reply(200, {
      userId: 'newUserId'
    });

    // Render the register component within required providers
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider axiosInstance={axios}>
            <Register />
          </AuthProvider>
        </BrowserRouter>
      );
    });

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newUser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newUser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password!1' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for the mock POST request to be made
    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });
  });
});
