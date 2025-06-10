import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star'; // For Testimonials
import CodeIcon from '@mui/icons-material/Code'; // For Skills
import PersonIcon from '@mui/icons-material/Person'; // For About me

export const NAV_OPTIONS = [
  {
    label: 'Dashboard',
    url: '/',
    icon: <HomeIcon />,
  },
  {
    label: 'Projects',
    url: '/projects',
    icon: <BuildIcon />,
  },
  {
    label: 'Work History',
    url: '/work-history',
    icon: <WorkIcon />,
  },
  {
    label: 'Skills',
    url: '/skills',
    icon: <CodeIcon />,
  },
  {
    label: 'Testimonials',
    url: '/testimonials',
    icon: <StarIcon />,
  },
  {
    label: 'About Me',
    url: '/about',
    icon: <PersonIcon />,
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: <SettingsIcon />,
  },
];
