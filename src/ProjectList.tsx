import React from 'react';
import styled from 'styled-components';

export interface Project {
  id: number;
  title: string;
  description: string;
  stack: string;
}

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  isEditable: boolean;
}

const ListWrapper = styled.div`
  margin: 2rem 0;
  max-width: 600px;
`;
const ProjectCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.2rem;
  position: relative;
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
const EditBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: #eee;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: 0.95rem;
`;

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, isEditable }) => (
  <ListWrapper>
    <h2>프로젝트 목록</h2>
    {projects.length === 0 && <div>등록된 프로젝트가 없습니다.</div>}
    {projects.map((p) => (
      <ProjectCard key={p.id}>
        <Title>{p.title}</Title>
        <Desc>{p.description}</Desc>
        <Stack>기술 스택: {p.stack}</Stack>
        {isEditable && <EditBtn onClick={() => onEdit(p)}>수정</EditBtn>}
      </ProjectCard>
    ))}
  </ListWrapper>
);

export default ProjectList; 