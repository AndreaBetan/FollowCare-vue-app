<script setup lang="ts">
import { ref } from "vue";
import { patientsApi } from "@/api/patientsApi";
import type { PatientResponse, Result as Patient } from "@/interfaces/patient";
import { usePatients } from "@/composables/usePatients";
import { useRouter } from "vue-router";
import cardiovascularRiskIcon from "@/assets/cardiovascular-risk.svg";
import fertileWomenIcon from "@/assets/fertile-women.svg";
import pendingExamsIcon from "@/assets/pending-exams.svg";
import allPatientsIcon from "@/assets/all-patients.svg";

const { womenInFertileAge, cardiovascularRiskPatients, patientsPendingExams } =
  usePatients();
const route = useRouter();

const items = ref([
  {
    label: "Riesgo cardiovascular",
    image: cardiovascularRiskIcon,
    command: () =>
      route.push({
        name: "patients-category",
        params: { category: "cardiovascular-risk" },
      }),
  },
  {
    label: "Mujeres en edad fértil",
    image: fertileWomenIcon,
    command: () =>
      route.push({
        name: "patients-category",
        params: { category: "fertile-women" },
      }),
  },
  {
    label: "Exámenes pendientes",
    image: pendingExamsIcon,
    command: () =>
      route.push({
        name: "patients-category",
        params: { category: "pending-exams" },
      }),
  },
  {
    label: "Todos los pacientes",
    image: allPatientsIcon,
    command: () =>
      route.push({ name: "patients-category", params: { category: "all" } }),
  },
]);
</script>

<template>
    <div class="px-4 py-6 md:px-6 lg:px-6">
      <div class="grid">
        <div v-for="item in items" :key="item.label" class="col-12 md:col-8 lg:col-3">
          <div
            class="surface-card shadow-2 p-4 border-round-xl cursor-pointer"
            @click="item.command"
          >
            <div class="flex justify-content-between align-items-center mb-3">
              <div>
                <span class="text-color-secondary pe-1">{{ item.label }}</span>
              </div>
   
              <div class="flex align-items-center justify-content-center bg-primary border-round-lg w-3rem h-3rem">
                <img :src="item.image" :alt="item.label" class="lg:w-5rem lg:h-5rem w-3rem h-3rem"/>
              </div>
            </div>

            <div>
              <span class="font-medium"> Ver pacientes </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
