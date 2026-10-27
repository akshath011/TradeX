import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import Hero from '../home/Hero';

describe('Hero component', () => {
  test('renders the Hero component', () => {
    render(<Hero />);
    const heroElement = screen.getByAltText('Hero Image');
    expect(heroElement).toBeInTheDocument();
    expect(heroElement).toHaveAttribute('src', 'media/homeHero.png');
  });

  test('renders the sign up component', () => {
    render(<Hero />);
    const signUpElement = screen.getByText('Sign Up');
    expect(signUpElement).toBeInTheDocument();
    expect(signUpElement).toHaveClass('btn btn-primary fs-5 mb-5');
  });
  
  test('renders the heading and paragraph', () => {
    render(<Hero />);
    const headingElement = screen.getByText('Invest in Everything');
        const paragraphElement = screen.getByText(/TradeX is a platform that allows you to invest/);
    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});


