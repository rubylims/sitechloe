import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const FormWrapper = styled.div`
  max-width: 350px;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;
const Title = styled.h2`
  margin-bottom: 1.5rem;
`;
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;
const Button = styled.button`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 0.7rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;
const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-size: 0.97rem;
`;
const SubButton = styled.button`
  width: 48%;
  padding: 0.5rem;
  background: #f5f5f5;
  color: #222;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.97rem;
  cursor: pointer;
  margin-top: 0.5rem;
`;
const SubButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4%;
`;
const SubLink = styled.span`
  color: #888;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0 0.5rem;
  transition: color 0.2s;
  &:hover {
    color: #444;
  }
`;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loginid, setLoginid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // 회원가입 상태
  const [regLoginId, setRegLoginId] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  // 커스텀 필수값 안내 메시지 상태
  const [regLoginIdError, setRegLoginIdError] = useState('');
  const [regNameError, setRegNameError] = useState('');
  const [regEmailError, setRegEmailError] = useState('');
  const [regPasswordError, setRegPasswordError] = useState('');

  // 비밀번호 찾기 상태
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  // 이메일 형식 체크 함수
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(loginid, password);
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 회원가입 제출 핸들러 (API 연동 예정)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 시도!');
    setRegError('');
    setRegSuccess('');
    // 안내 메시지 초기화
    setRegLoginIdError('');
    setRegNameError('');
    setRegEmailError('');
    setRegPasswordError('');
    let hasError = false;
    if (!regLoginId) {
      setRegLoginIdError('로그인ID를 입력해주세요');
      hasError = true;
    }
    if (!regName) {
      setRegNameError('이름을 입력해주세요');
      hasError = true;
    }
    if (!regEmail) {
      setRegEmailError('이메일을 입력해주세요');
      hasError = true;
    } else if (!isValidEmail(regEmail)) {
      setRegEmailError('이메일 주소를 올바르게 입력해 주세요.');
      hasError = true;
    }
    if (!regPassword) {
      setRegPasswordError('비밀번호를 입력해주세요');
      hasError = true;
    }
    if (hasError) return;
    try {
      const res = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginid: regLoginId,
          name: regName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
        }),
      });
      const data = await res.json();
      console.log('data.user:', data.user);
      if (!res.ok) {
        setRegError(data.message || '회원가입 실패');
      } else {
        console.log('navigate 실행!', data.user);
        navigate('/register-success', { state: { user: data.user } });
      }
    } catch (err) {
      setRegError('서버 오류');
    }
  };

  // 비밀번호 찾기 제출 핸들러 (API 연동 예정)
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMsg('');
    if (!forgotEmail) {
      setForgotMsg('이메일을 입력해주세요.');
      return;
    }
    // TODO: API 연동
    setForgotMsg('임시 비밀번호가 이메일로 전송되었습니다.');
    setShowForgot(false);
  };

  // 회원가입 입력값 및 에러 초기화 함수
  const resetRegisterForm = () => {
    setRegLoginId('');
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegPassword('');
    setRegLoginIdError('');
    setRegNameError('');
    setRegEmailError('');
    setRegPasswordError('');
    setRegError('');
    setRegSuccess('');
  };

  return (
    <FormWrapper>
      {!showRegister && !showForgot && (
        <>
          <Title>로그인</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="loginid"
              placeholder="아이디"
              value={loginid}
              onChange={e => setLoginid(e.target.value)}
              required 
              onInvalid={(e) => e.currentTarget.setCustomValidity("아이디를 입력하세요.")}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Button type="submit" disabled={loading}>{loading ? '로그인 중...' : '로그인'}</Button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.7rem' }}>
            <SubLink onClick={() => setShowRegister(true)}>회원가입</SubLink>
            <span style={{ color: '#bbb', fontSize: '0.85rem' }}>|</span>
            <SubLink onClick={() => setShowForgot(true)}>비밀번호 찾기</SubLink>
          </div>
        </>
      )}
      {showRegister && (
        <>
          <Title>회원가입</Title>
          <form onSubmit={handleRegister} noValidate>
            <Input
              type="text"
              placeholder="로그인ID"
              value={regLoginId}
              onChange={e => { setRegLoginId(e.target.value); setRegLoginIdError(''); }}
              autoComplete="username"
            />
            {regLoginIdError && <ErrorMsg style={{marginTop:'-0.7rem', marginBottom:'0.7rem'}}>{regLoginIdError}</ErrorMsg>}
            <Input
              type="password"
              placeholder="비밀번호"
              value={regPassword}
              onChange={e => { setRegPassword(e.target.value); setRegPasswordError(''); }}
              autoComplete="new-password"
            />
            {regPasswordError && <ErrorMsg style={{marginTop:'-0.7rem', marginBottom:'0.7rem'}}>{regPasswordError}</ErrorMsg>}
            <Input
              type="text"
              placeholder="이름"
              value={regName}
              onChange={e => { setRegName(e.target.value); setRegNameError(''); }}
              autoComplete="off"
            />
            {regNameError && <ErrorMsg style={{marginTop:'-0.7rem', marginBottom:'0.7rem'}}>{regNameError}</ErrorMsg>}
            <Input
              type="email"
              placeholder="이메일"
              value={regEmail}
              onChange={e => { setRegEmail(e.target.value); setRegEmailError(''); }}
              autoComplete="off"
            />
            {regEmailError && <ErrorMsg style={{marginTop:'-0.7rem', marginBottom:'0.7rem'}}>{regEmailError}</ErrorMsg>}
            <Input
              type="text"
              placeholder="전화번호"
              value={regPhone}
              onChange={e => setRegPhone(e.target.value)}
              autoComplete="off"
            />
            
            {regError && <ErrorMsg>{regError}</ErrorMsg>}
            <Button type="submit">회원가입</Button>
            <SubButton type="button" onClick={() => { resetRegisterForm(); setShowRegister(false); }} style={{width:'100%',marginTop:'0.5rem'}}>취소</SubButton>
          </form>
        </>
      )}
      {showForgot && (
        <>
          <Title>비밀번호 찾기</Title>
          <form onSubmit={handleForgot}>
            <Input
              type="email"
              placeholder="이메일 입력"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              required
            />
            {forgotMsg && <ErrorMsg>{forgotMsg}</ErrorMsg>}
            <Button type="submit">임시 비밀번호 발급</Button>
            <SubButton type="button" onClick={() => setShowForgot(false)} style={{width:'100%',marginTop:'0.5rem'}}>취소</SubButton>
          </form>
        </>
      )}
    </FormWrapper>
  );
};

export default LoginForm; 