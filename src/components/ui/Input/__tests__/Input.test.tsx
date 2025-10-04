import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../';

describe('Input Component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('renders input with label', () => {
    render(<Input label="Full Name" placeholder="Enter your name" />);
    
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Input label="Full Name" required placeholder="Enter your name" />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders password input with toggle button', () => {
    render(<Input type="password" placeholder="Enter password" />);
    
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
    
  });

  it('toggles password visibility when button is clicked', () => {
    render(<Input type="password" placeholder="Enter password" />);
    
    const input = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button');
    
    expect(input).toHaveAttribute('type', 'password');
    
    // Click toggle button
    fireEvent.click(toggleButton);
    
    // Input type should change to text
    expect(input).toHaveAttribute('type', 'text');
  });

  it('displays error message when error prop is true', () => {
    render(
      <Input 
        error={true} 
        errorMessage="This field is required" 
        placeholder="Enter your name"
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays helper text when no error', () => {
    render(
      <Input 
        helperText="Enter your full name"
        placeholder="Enter your name"
      />
    );
    
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const mockOnChange = jest.fn();
    render(<Input onChange={mockOnChange} placeholder="Enter your name" />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'John Doe'
        })
      })
    );
  });
});
