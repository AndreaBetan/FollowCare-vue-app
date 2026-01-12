import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import PatientsList from "@/pages/PatientsList.vue";
import type { PatientFilter } from '@/interfaces'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "patients/:category",
          name: "patients-category",
          component: PatientsList,
          beforeEnter: (to) => {
            const category = to.params.category as PatientFilter;
            const allowed = [
              "cardiovascular-risk",
              "fertile-women",
              "pending-exams",
              "all",
            ];

            if (!allowed.includes(category)) return "/"
          },
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    }
  ],
});