import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Project } from './ProjectList';

interface ProjectFormProps {
  initial?: Project | null;
  onSubmit: (project: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  background: #fafbfc;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
`;
const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 80px;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
`;
const Button = styled.button`
  padding: 0.7rem 1.2rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;
const CancelBtn = styled(Button)`
  background: #aaa;
`;

const ProjectForm: React.FC<ProjectFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stack, setStack] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description);
      setStack(initial.stack);
    } else {
      setTitle('');
      setDescription('');
      setStack('');
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !stack.trim()) return;
    onSubmit({ title, description, stack });
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="설명"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <Input
          placeholder="기술 스택 (예: React, TypeScript)"
          value={stack}
          onChange={e => setStack(e.target.value)}
          required
        />
        <ButtonRow>
          <Button type="submit">{initial ? '수정 완료' : '등록'}</Button>
          <CancelBtn type="button" onClick={onCancel}>취소</CancelBtn>
        </ButtonRow>
      </form>
    </FormWrapper>
  );
};

export default ProjectForm; 