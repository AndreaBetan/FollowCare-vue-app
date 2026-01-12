<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { usePatients } from "@/composables/usePatients";
import { usePatientsActions } from "@/composables/usePatientsActions";
import PatientModal from "@/components/modals/PatientModal.vue";
import type { Patient, PatientFilter } from "@/interfaces";
import NoImage from "@/assets/no-image.svg";
import Loader from "@/components/ui/Loader.vue"

const route = useRoute();
const category = computed(() => route.params.category as PatientFilter);

const { paginatedPatients, page, nextPage, prevPage, loading } = usePatients(category);
const {actionLoading, update, remove } = usePatientsActions();
const toast = useToast();
const showModal = ref<boolean>(false);
const selectedPatient = ref<Patient | null>(null);

const titleMap: Record<string> = {
  "cardiovascular-risk": "Pacientes con riesgo cardiovascular",
  "fertile-women": "Mujeres en edad fértil",
  "pending-exams": "Pacientes con exámenes pendientes",
  all: "Todos los pacientes",
};

const title = computed(() => titleMap[category.value]);

const openPatientModal = (patient: Patient) => {
  selectedPatient.value = patient;
  showModal.value = true;
};

const closeModal = () => {
  selectedPatient.value = null;
  showModal.value = false;
};

const handleUpdatePatient = async (patient: Patient) => {
  await update(patient);

  toast.add({
    severity: "success",
    summary: "Success Message",
    detail: "Datos actualizados",
    life: 3000,
  });
  showModal.value = false;
};

const handleDeletePatient = async (patient: Patient) => {
  await remove(patient);

  toast.add({
    severity: "success",
    summary: "Paciente eliminado",
    detail: `${patient.name.first} ${patient.name.last}`,
    life: 3000,
  });

  showModal.value = false;
};
</script>

<template>
  <Loader v-if="loading || actionLoading" />
  <template v-else>
    <div class="flex w-full justify-content-center">
      <h1>{{ title }}</h1>
    </div>

    <div class="grid px-2">
      <div
        v-for="patient in paginatedPatients"
        :key="patient.login.uuid"
        class="col-12 md:col-6 lg:col-3"
      >
        <div
          class="surface-card shadow-2 p-4 border-round-xl flex align-items-center gap-3"
          @click="openPatientModal(patient)"
        >
          <!-- Imagen -->
          <img
            :src="patient.picture ? patient.picture.medium : NoImage"
            :alt="`${patient.name.first} ${patient.name.last}`"
            class="border-circle w-4rem h-4rem"
          />

          <!-- Datos -->
          <div class="flex flex-column">
            <span class="text-color-secondary font-medium">
              {{ patient.name.first }} {{ patient.name.last }}
            </span>
            <span class="text-sm text-color-secondary">
              Edad: {{ patient.dob.age }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-content-center gap-3 mt-4">
      <i
        class="pi pi-angle-double-left"
        @click="prevPage"
        :disabled="page === 1"
      />
      <span class="text-sm">Página {{ page }}</span>
      <i class="pi pi-angle-double-right" @click="nextPage" />
    </div>
    <PatientModal
      :visible="showModal"
      mode="view"
      :patient="selectedPatient"
      @close="closeModal"
      @update="handleUpdatePatient"
      @delete="handleDeletePatient"
    />
    <Toast />
  </template>
</template>

<style scoped></style>
