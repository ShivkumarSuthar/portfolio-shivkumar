import { Container } from 'react-bootstrap'
import LearningMaterial from '@/Components/Notes/LearningMaterials'
import LearningMaterialPage from '@/Components/Notes/LearningMaterialPage'

export default function DynamicPage({ slugPath }) {
  let content = null

  if (slugPath === 'learning-materials/list') {
    content = <LearningMaterial />
  } else if (slugPath === 'learning-materials/add') {
    content = <LearningMaterialPage />
  } else if (slugPath.startsWith('learning-materials/')) {
    // any dynamic ID will be handled here
    content = <LearningMaterialPage />
  } else {
    content = <h1>404 - Page Not Found</h1>
  }

  return (
    <Container fluid className="dynamic-page-wrapper p-0">
      {content}
    </Container>
  )
}

export async function getServerSideProps({ params }) {
  const slugPath = params.slug.join('/')
  return { props: { slugPath } }
}
