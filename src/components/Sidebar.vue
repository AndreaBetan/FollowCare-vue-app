<script setup>
import { ref } from "vue";
import Menu from "primevue/menu";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";
import { useRouter } from 'vue-router'
import FemaleAvatar from "@/assets/female-avatar.svg";

const route = useRouter()
const items = ref([
  {
    label: "PAGINA PRINCIPAL",
    items: [
      {
        label: "Inicio",
        icon: "pi pi-home",
        command: () => route.push('/')
      },
    ],
  },
  {
    label: "PACIENTES DE RIESGO",
    items: [
      {
        label: "Riesgo cardiovascular",
        icon: "pi pi-heart",
        command: () =>
          route.push({
            name: "patients-category",
            params: { category: "cardiovascular-risk" },
          }),
      },
      {
        label: "Mujeres en edad fértil",
        icon: "pi pi-venus",
        command: () =>
          route.push({
            name: "patients-category",
            params: { category: "fertile-women" },
          }),
      },
      {
        label: "Exámenes pendientes",
        icon: "pi pi-file-edit",
        command: () =>
          route.push({
            name: "patients-category",
            params: { category: "pending-exams" },
          }),
      }
    ]
  },
  { separator: true },
]);
</script>

<template>
  <Menu :model="items" class="w-full md:w-15rem">
    <template #item="{ item, props }">
      <a v-ripple class="flex align-items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <button
        v-ripple
        class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
      >
        <i class="pi pi-user pr-2"/>
        <span class="inline-flex flex-column">
          <span class="font-bold">Nombre de usuario</span>
          <span class="text-sm">Admin</span>
        </span>
      </button>
    </template>
  </Menu>
</template>