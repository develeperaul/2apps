const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") },
      {
        path: "calc",
        name: "calc",
        component: () => import("pages/Calc.vue"),
      },
      { path: "how", name: "how", component: () => import("pages/Index.vue") },
      {
        path: "contacts",
        name: "contacts",
        component: () => import("pages/Contacts.vue"),
      },
      {
        path: "work",
        name: "work",
        component: () => import("pages/Index.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
