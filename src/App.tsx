import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
// import logo from './logo.svg';
import './App.css';
import HomeInfo from './HomeInfo';
import ProjectHistory from './ProjectHistory';
import { AuthProvider, useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import ProjectsPage from './ProjectsPage';
import RegisterSuccess from './RegisterSuccess';

const AppWrapper = styled.div`
  min-height: 100vh;
  background: #f7f8fa;
`;

const CenteredContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const NavbarBg = styled.div`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

const NavbarInner = styled.nav`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
`;

const LoginButton = styled.button`
  font-size: 0.9rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
`;

const Title = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  color: #222;
`;

const TitleBar = styled.div`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 1rem 2rem;
`;

const Header = styled.header`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

const HeaderInner = styled.div`
  max-width: 1000px;
  margin: 1rem auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function NavbarComponent() {
  const { user, logout } = useAuth();
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <NavLinks>
        <Link to="/">홈</Link>
        <Link to="/projects">프로젝트</Link>
      </NavLinks>
      {user ? (
        <LoginButton onClick={logout}>로그아웃</LoginButton>
      ) : (
        <LoginButton as={Link} to="/login">로그인</LoginButton>
      )}
    </div>
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
      <AppWrapper>
        <Router>
          <Header>
            <HeaderInner>
              <Title>Chloe Blog</Title>
              <NavbarComponent />
            </HeaderInner>
          </Header>
          <CenteredContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-success" element={<RegisterSuccess />} />
            </Routes>
          </CenteredContainer>
        </Router>
      </AppWrapper>
    </AuthProvider>
  );
}

export default App;
