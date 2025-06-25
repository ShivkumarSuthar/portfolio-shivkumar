import React from 'react'
import SkillsListPage from './SkillsListPage';
import SkillOpenPage from './SkillOpenPage';
import { useParams } from 'react-router-dom';

function SkillsLayout() {
  const { type, id } = useParams();
  return (
    <>
      {type == 'List' && <SkillsListPage />}
      {type == 'add'  && <SkillOpenPage />}
    </>
  )
}

export default SkillsLayout
