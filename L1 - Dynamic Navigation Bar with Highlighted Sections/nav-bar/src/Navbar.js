import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: #f8f9fa;
  padding: 1rem;

  @media (max-width: 768px) {
    ul {
      flex-direction: column;
    }
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: #007bff;
  }

  &.active {
    background: #007bff;
    color: white;
  }
`;

function Navbar() {
  return (
    <NavContainer>
      <NavList>
        <li>
          <StyledNavLink to="/">Home</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/about">About</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/services">Services</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/contact">Contact</StyledNavLink>
        </li>
      </NavList>
    </NavContainer>
  );
}

export default Navbar;
