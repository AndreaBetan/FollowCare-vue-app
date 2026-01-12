<script setup lang="ts">
import { ref } from "vue";
import DashboardMessage from "@/components/dashboard/DashboardMessage.vue";
import PatientsSummaryCard from "@/components/dashboard/PatientsSummaryCard.vue"
import { usePatients } from '@/composables/usePatients'
import Loader from "@/components/ui/Loader.vue"

const { loading } = usePatients()

</script>

<template>
  <Loader v-if="loading" />
  <div v-else class="flex mt-2">
    <div class="flex-1">
      
      <DashboardMessage />

      <PatientsSummaryCard />

    </div>
  </div>
</template>
