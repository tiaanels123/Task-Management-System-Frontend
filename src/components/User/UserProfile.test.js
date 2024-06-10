const React = require('react');
const { render, fireEvent, screen } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const UserProfile = require('./UserProfile').default;
const { AuthContext } = require('../../context/AuthContext');

describe('UserProfile Component', () => {
  it('displays and updates user information', () => {
    const user = { userName: 'JohnDoe', email: 'johndoe@example.com' };
    const updateUserDetails = jest.fn();

    // Render UserProfile component within AuthContext and BrowserRouter
    render(
      <AuthContext.Provider value={{ user, updateUserDetails }}>
        <BrowserRouter>
          <UserProfile />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    // Simulate user input and form submission
    fireEvent.change(screen.getByLabelText(/update username/i), { target: { value: 'JaneDoe' } });
    fireEvent.change(screen.getByLabelText(/update email/i), { target: { value: 'janedoe@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /update profile/i }));

    // Assert that updateUserDetails was called with the updated user details
    expect(updateUserDetails).toHaveBeenCalledWith({
      userName: 'JaneDoe',
      email: 'janedoe@example.com'
    });
  });
});
