const React = require('react');
const { render, fireEvent, waitFor, screen, act } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios').default;
const { AuthProvider } = require('../../context/AuthContext');
const Login = require('./Login').default;

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);

// Mock the alert function before all tests
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Reset the mock before each test
beforeEach(() => {
  mock.reset();
});

describe('Login component', () => {
  it('handles user login', async () => {
    // Mock successful login response
    mock.onPost('http://localhost:5249/api/auth/login').reply(200, {
      token: 'fakeToken'
    });
    // Mock user details response
    mock.onGet('http://localhost:5249/api/Users/me').reply(200, {
      userName: 'testUser',
      email: 'testUser@example.com'
    });

    // Render the login component within required providers
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider axiosInstance={axiosInstance}>
            <Login />
          </AuthProvider>
        </BrowserRouter>
      );
    });

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    // Wait for the mock POST request to be made
    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });
  });
});
