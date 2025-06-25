
import { useParams } from 'react-router-dom'
import React from 'react';
import ProjectLayout from './ProjectLayout';
import ProjectAddPage from './ProjectAddPage';

function ProjectsMain() {
  const {type} = useParams()
  return (
    <>
    {type == "list" && <ProjectLayout/>}
    {type == "add" || type == 'edit' && <ProjectAddPage/>}
    </>
  );
}

export default ProjectsMain;
