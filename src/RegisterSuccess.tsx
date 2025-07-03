import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  text-align: center;
`;
const Info = styled.div`
  margin-top: 2rem;
  text-align: left;
  font-size: 1.1rem;
  line-height: 2;
`;
const Button = styled.button`
  margin-top: 2rem;
  padding: 0.7rem 2rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const RegisterSuccess = () => {
  const location = useLocation();
  console.log('RegisterSuccess user:', location.state?.user);
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Wrapper>
      <h2>{user.name} 회원님😄 반갑습니다!</h2>
      <div style={{marginTop:'1.5rem', fontWeight:'bold', fontSize:'1.2rem'}}>
        회원가입이 완료되었습니다.🎉
      </div>
      <Info>
        아이디 : {user.loginid}<br/>
        이름 : {user.name}<br/>
        이메일 : {user.email}<br/>
        전화번호 : {user.phone || '-'}
      </Info>
      <Button onClick={()=>navigate('/login')}>로그인 하러 가기</Button>
    </Wrapper>
  );
};

export default RegisterSuccess; 