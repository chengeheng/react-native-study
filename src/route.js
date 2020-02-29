import HomeScreen from './pages/home';
import DetailScreen from './pages/details';
import PassParams from './pages/passParms';

export const mainRoutes = [
  {
    path: 'home',
    title: '主页',
    component: HomeScreen,
  },
  {
    path: 'Details',
    title: '详情',
    component: DetailScreen,
  },
  {
    path: 'passParams',
    title: '参数传递',
    options: {headerShown: false},
    component: PassParams,
  },
];
