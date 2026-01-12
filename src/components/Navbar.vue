<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import Menubar from "primevue/menubar"
import Badge from "primevue/badge"
import InputText from "primevue/inputtext"
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Avatar from "primevue/avatar"
import FollowCare from "@/assets/follow-care.svg"
import FemaleAvatar from "@/assets/female-avatar.svg"
import { usePatientsActions } from "@/composables/usePatientsActions"
import PatientModal from "@/components/modals/PatientModal.vue"
import type { Patient } from "@/interfaces";


const showCreatePatient = ref(false);
const { create } = usePatientsActions();
const router = useRouter();
const toast = useToast();

const handleCreatePatient = async (patient: Patient) => {
  await create(patient);
  toast.add({
    severity: 'success', 
    summary: 'Paciente creado', 
    detail: `${patient.name.first} ${patient.name.last}`,
    life: 3000 
  });
  showCreatePatient.value = false;
};


const items = ref([
  { label: "FollowCare", image: FollowCare },
  { label: "Crear Paciente", icon: "pi pi-plus-circle" },
  { label: "Usuario", icon: "pi pi-user" },
]);
</script>

<template>
  <div class="card w-full">
    <Menubar>
      <template #start>
        <div
          class="flex align-items-center gap-2 cursor-pointer"
          @click="router.push('/')"
        >
          <img :src="FollowCare" alt="FollowCare" class="h-2rem" />
          <span class="font-bold text-lg">FollowCare</span>
        </div>
      </template>
      <template #end>
        <div class="flex align-items-center gap-4">
          <!-- Crear paciente -->
          <a 
            class="flex align-items-center gap-2 cursor-pointer"
            @click="showCreatePatient = true"
          >
            <i class="pi pi-plus-circle" />
            <span>Crear Paciente</span>
          </a>

          <div class="flex align-items-center gap-2">
            <img :src="FemaleAvatar" alt="FemaleAvatar" class="h-2rem" />
            <span>Usuario</span>
          </div>
        </div>
      </template>
    </Menubar>
  </div>
  
  <PatientModal
    :visible="showCreatePatient"
    mode="create"
    @close="showCreatePatient = false"
    @create="handleCreatePatient"
  />
  <Toast />
</template>
