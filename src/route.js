import HomeScreen from './pages/home';
import DetailScreen from './pages/details';
import PassParams from './pages/passParms';
import Lifecycle from './pages/lifecycle';

export const mainRoutes = [
  {
    path: 'lifecycle',
    title: '生命周期',
    options: {headerShown: false},
    component: Lifecycle,
  },
  {
    path: 'passParams',
    title: '参数传递',
    options: {headerShown: false},
    component: PassParams,
  },
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
];
