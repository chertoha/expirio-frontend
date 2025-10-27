export const ROUTE_TITLES = [
  { route: '/admin/dashboard', title: 'Dashboard' },
  { route: '/admin/batches', title: 'Batches' },
  { route: '/admin/categories', title: 'Categories' },
  { route: '/admin/storages', title: 'Storages' },
  { route: '/admin/notice', title: 'Notice' },
]

export const getRouteTitle = (entry: string) =>
  ROUTE_TITLES.find(({ route }) => route === entry)?.title || null
