import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Testimonials from './components/testimonials/Testimonials';
import Setting from './components/setting/Setting';
import ProjectsMain from './components/projects/ProjectsMain';
import WorkLayout from './components/workExperience/WorkLayout';
import SkillsLayout from './components/skills/SkillsLayout';
import ProfileLayout from './components/profilePage/ProfileLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'projects/',
        element: <ProjectsMain />,
        children:[
          {
            path:":type",
            element:<ProjectsMain/> 

          },
          {
            path:":type/:id",
            element:<ProjectsMain/> 

          }
        ]
      },
      {
        path: 'work-experience/',
        element: <WorkLayout />,
        children:[
          {
            path:":type",
            element:<WorkLayout/>
          },
          {
            path:":type/:id",
            element:<WorkLayout/>
          }
        ]
      },
      {
        path: 'skills/',
        element: <SkillsLayout/>,
        children:[
          {
            path:":type",
            element: <SkillsLayout/>,
          },
          {
            path:":type/:id",
            element: <SkillsLayout/>,
          }
        ]
      },
      // {
      //   path: 'testimonials/*',
      //   element: <Testimonials />        
      // },
      {
        path: '/profile-details/:type',
        element: <ProfileLayout />,
      },
      {
        path: 'settings/*',
        element: <Setting />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
