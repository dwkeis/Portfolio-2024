const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: '/three', name: 'Three', component: () => import('pages/ThreePage.vue') },
      { path: '/project', name: 'Project', component: () => import('pages/ProjectPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
