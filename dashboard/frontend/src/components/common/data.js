import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import StarIcon from '@mui/icons-material/Star';
import RecommendIcon from '@mui/icons-material/Recommend';
import Person4Icon from '@mui/icons-material/Person4';
import SettingsIcon from '@mui/icons-material/Settings';

export const NAV_OPTIONS = [
  {
    label: 'Dashboard',
    url: '/',
    icon: HomeIcon,
  },
  {
    label: 'Projects',
    url: '/projects/list',
    icon: FolderIcon,
  },
  {
    label: 'Work History',
    url: '/work-experience/list',
    icon: WorkHistoryIcon,
  },
  {
    label: 'Skills',
    url: '/skills/List',
    icon: StarIcon,
  },
  // {
  //   label: 'Testimonials',
  //   url: '/testimonials',
  //   icon: RecommendIcon,
  // },
  {
    label: 'Profile',
    url: '/profile-details/personal',
    icon: Person4Icon,
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
  },
];
