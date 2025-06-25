import React from 'react'
import { useParams } from 'react-router-dom'
import WorkExperienceList from './WorkExperienceList'
import WorkExperiencePage from './WorkExperiencePage'

function WorkLayout() {
  const {type, id}=useParams()
  console.log(type, 'type')
  return (
    <>
    {type == 'list' && <WorkExperienceList/>}
    {type == 'Add' || type == 'edit' && <WorkExperiencePage/>}
    </>
  )
}

export default WorkLayout
