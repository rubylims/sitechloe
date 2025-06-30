import React, { useState } from 'react';
import ProjectList, { Project } from './ProjectList';
import ProjectForm from './ProjectForm';
import { useAuth } from './AuthContext';

const initialProjects: Project[] = [
  {
    id: 1,
    title: '포트폴리오 웹사이트',
    description: 'React와 TypeScript로 제작한 개인 포트폴리오 사이트',
    stack: 'React, TypeScript, Styled-Components',
  },
  {
    id: 2,
    title: '팀 협업 툴',
    description: '실시간 채팅 및 일정 관리 기능을 제공하는 협업 플랫폼',
    stack: 'React, Redux, Socket.io',
  },
];

const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setShowForm(true);
  };

  const handleSubmit = (data: Omit<Project, 'id'>) => {
    if (editing) {
      setProjects(projects.map(p => p.id === editing.id ? { ...editing, ...data } : p));
    } else {
      const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
      setProjects([{ id: newId, ...data }, ...projects]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      {user && !showForm && (
        <button style={{ marginBottom: '1.5rem', padding: '0.7rem 1.5rem', fontSize: '1rem', borderRadius: 5, border: 'none', background: '#222', color: '#fff', cursor: 'pointer' }} onClick={handleAdd}>
          새 프로젝트 등록
        </button>
      )}
      {showForm && (
        <ProjectForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      <ProjectList
        projects={projects}
        onEdit={user ? handleEdit : () => {}}
        isEditable={!!user}
      />
    </div>
  );
};

export default ProjectsPage; 