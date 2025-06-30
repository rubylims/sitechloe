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
  padding: 0.7rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;
const Button = styled.button`
  width: 100%;
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

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <FormWrapper>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
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
    </FormWrapper>
  );
};

export default LoginForm; 