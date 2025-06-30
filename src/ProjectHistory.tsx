import React from 'react';
import styled from 'styled-components';

const projects = [
  {
    title: '포트폴리오 웹사이트',
    description: 'React와 TypeScript로 제작한 개인 포트폴리오 사이트',
    stack: ['React', 'TypeScript', 'Styled-Components'],
  },
  {
    title: '팀 협업 툴',
    description: '실시간 채팅 및 일정 관리 기능을 제공하는 협업 플랫폼',
    stack: ['React', 'Redux', 'Socket.io'],
  },
];

const HistoryWrapper = styled.section`
  margin: 2rem 0;
  max-width: 600px;
`;
const ProjectCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.2rem;
`;
const Title = styled.h3`
  margin: 0 0 0.5rem 0;
`;
const Desc = styled.p`
  margin: 0 0 0.5rem 0;
  color: #444;
`;
const Stack = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

const ProjectHistory: React.FC = () => (
  <HistoryWrapper>
    <h2>프로젝트 이력</h2>
    {projects.map((p, i) => (
      <ProjectCard key={i}>
        <Title>{p.title}</Title>
        <Desc>{p.description}</Desc>
        <Stack>기술 스택: {p.stack.join(', ')}</Stack>
      </ProjectCard>
    ))}
  </HistoryWrapper>
);

export default ProjectHistory; 