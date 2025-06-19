// src/tests/Components.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // To wrap components that use <Link>
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AboutPage from '../pages/AboutPage';

// Helper function to render components wrapped in MemoryRouter
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};


describe('Core Component Rendering', () => {

  // Test 1: Check if the Navbar renders the brand name "SoleVault"
  it('should render the Navbar component with the brand name', () => {
    renderWithRouter(<Navbar />);
    // `screen.getByText` finds an element by its text content.
    // The /i flag makes the search case-insensitive.
    expect(screen.getByText(/solevault/i)).toBeInTheDocument();
  });

  // Test 2: Check if the Navbar shows "Sign Up" and "Sign In" links
  it('should render Sign Up and Sign In links in the Navbar', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  // Test 3: Check if the Footer renders the copyright text
  it('should render the Footer with copyright information', () => {
    renderWithRouter(<Footer />);
    // We can use a regular expression to find part of the text
    expect(screen.getByText(/© 2025 SoleVault. All rights reserved./i)).toBeInTheDocument();
  });

  // Test 4: Check if the Footer has a link to "About Us"
  it('should have a link to the About Us page in the Footer', () => {
    renderWithRouter(<Footer />);
    // `screen.getByRole` is great for accessibility, finding elements by their role.
    const aboutLink = screen.getByRole('link', { name: /about us/i });
    expect(aboutLink).toBeInTheDocument();
  });

  // Test 5: Check if the AboutPage renders its main heading
  it('should render the main heading on the About Page', () => {
    // We need to import the actual page component for this test
    renderWithRouter(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /about solevault/i });
    expect(heading).toBeInTheDocument();
  });

});