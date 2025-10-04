import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../';

describe('Card Component', () => {
  it('renders card with title and description', () => {
    render(
      <Card 
        title="Test Card" 
        description="This is a test card description" 
      />
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test card description')).toBeInTheDocument();
  });

  it('renders card with action link', () => {
    render(
      <Card 
        title="Test Card" 
        description="This is a test card description"
        actionText="Read more"
        href="/read-more"
      />
    );
    
    const actionLink = screen.getByText('Read more');
    expect(actionLink).toBeInTheDocument();
    expect(actionLink.closest('a')).toHaveAttribute('href', '/read-more');
  });

  it('renders card without action when actionText is not provided', () => {
    render(
      <Card 
        title="Test Card" 
        description="This is a test card description"
      />
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test card description')).toBeInTheDocument();
    // Should not have action element
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders card with only title', () => {
    render(<Card title="Title Only Card" />);
    
    expect(screen.getByText('Title Only Card')).toBeInTheDocument();
    expect(screen.getByText('Title Only Card').closest('h3')).toBeInTheDocument();
  });

  it('renders card with only description', () => {
    render(<Card description="Description Only Card" />);
    
    expect(screen.getByText('Description Only Card')).toBeInTheDocument();
    expect(screen.getByText('Description Only Card').closest('p')).toBeInTheDocument();
  });

  it('renders card with children instead of title/description', () => {
    render(
      <Card>
        <div data-testid="custom-child">Custom Content</div>
      </Card>
    );
    
    const customChild = screen.getByTestId('custom-child');
    expect(customChild).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    
    // Should not render title/description structure
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});
