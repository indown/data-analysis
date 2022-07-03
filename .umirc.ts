import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy: {
    '/api': {
      'target': 'http://110.40.181.41:9900/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  },
  layout: {
    title: '数据分析',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '上传文件',
      path: '/home',
      component: './Home',
    },
    {
      name: '显示数据',
      path: '/access',
      component: './Access',
    },
    // {
    //     name: ' CRUD 示例',
    //     path: '/table',
    //     component: './Table',
    // },
  ],
  npmClient: 'pnpm',
});

