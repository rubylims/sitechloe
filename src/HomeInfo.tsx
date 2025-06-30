import React from 'react';
import styled from 'styled-components';

const InfoWrapper = styled.section`
  margin: 2rem 0;
  padding: 2rem;
  background: #fafbfc;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  max-width: 600px;
`;
const Name = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
`;
const Job = styled.h2`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
`;
const Intro = styled.p`
  font-size: 1rem;
  color: #333;
`;

const HomeInfo: React.FC = () => (
  <InfoWrapper>
    <Name>임연주</Name>
    <Job>프론트엔드 개발자</Job>
    <Intro>
      안녕하세요! 사용자 경험을 중시하는 프론트엔드 개발자 임연주입니다.<br/>
      React, TypeScript, UI/UX에 관심이 많아요.
    </Intro>
  </InfoWrapper>
);

export default HomeInfo; 