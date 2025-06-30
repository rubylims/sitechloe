import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import logo from './logo.svg';
import './App.css';
import HomeInfo from './HomeInfo';
import ProjectHistory from './ProjectHistory';
import { AuthProvider, useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import ProjectsPage from './ProjectsPage';

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
`;
const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;
const LoginButton = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
`;

function NavbarComponent() {
  const { user, logout } = useAuth();
  return (
    <Navbar>
      <NavLinks>
        <Link to="/">홈</Link>
        <Link to="/projects">프로젝트</Link>
      </NavLinks>
      {user ? (
        <LoginButton onClick={logout}>로그아웃</LoginButton>
      ) : (
        <LoginButton as={Link} to="/login">로그인</LoginButton>
      )}
    </Navbar>
  );
}

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <HomeInfo />
      <ProjectHistory />
    </div>
  );
}

function Projects() {
  return <ProjectsPage />;
}

function Login() {
  return <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
