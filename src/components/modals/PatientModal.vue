<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import PatientForm from './PatientForm.vue'
import type { Patient } from '@/interfaces'
import NoImage from "@/assets/no-image.svg"

const props = defineProps<{
  visible: boolean
  mode: 'view' | 'edit' | 'create'
  patient?: Patient
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', patient: Patient): void
  (e: 'update', patient: Patient): void
  (e: 'delete', patient: Patient): void
}>()

const localMode = ref(props.mode)
const editablePatient = ref<Patient | null>(null)

const onUpdateVisible = (value: boolean) => {
  if (!value) emit('close')
}

const headerTitle = computed(() => {
  if (localMode.value === 'create') return 'Crear paciente'
  else if (props.patient) return `${props.patient.name.first} ${props.patient.name.last}`
  return 'Paciente'
})

// Init
watch(
  () => [props.patient, props.mode],
  ([patient, mode]) => {
    localMode.value = mode
    editablePatient.value = patient
      ? JSON.parse(JSON.stringify(patient))
      : {
          login: { uuid: crypto.randomUUID() },
          gender: '',
          name: { first: '', last: '' },
          email: '',
          phone: '',
          dob: { age: 0, date: new Date() },
          registered: { date: new Date(), age: 0 },
        }
  },
  { immediate: true }
)

const handleSubmit = async (patient: Patient) => {
  localMode.value === 'create'
    ? emit('create', patient)
    : emit('update', patient)
}

const handleDelete = () => {
  if (!props.patient) return
  emit('delete', props.patient)
  emit('close')
}

</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :header="headerTitle"
    class="lg:w-35rem"
    @update:visible="onUpdateVisible"
  >
    <!-- View -->
    <template v-if="localMode === 'view' && patient">
      <div class="flex gap-4">
        <img :src="patient.picture ? patient.picture.large : NoImage" class="border-circle w-8rem h-8rem" />
        <div>
          <h3>{{ patient.name.first }} {{ patient.name.last }}</h3>
          <div><b>Genero:</b> {{ patient.gender }}</div>
          <div><b>Edad:</b> {{ patient.dob.age }}</div>
          <div><b>Teléfono:</b> {{ patient.phone }}</div>
          <div><b>Email:</b> {{ patient.email }}</div>
          <div><b>Fecha ultima consulta:</b> {{ new Date(patient.registered.date).toLocaleDateString() }}</div>
        </div>
      </div>
    </template>

    <!-- Edit / Create -->
    <template v-else-if="editablePatient && localMode !== 'view'">
      <PatientForm
        :key="`${editablePatient.login.uuid}-${localMode}`"
        :patient="editablePatient"
        :mode="localMode === 'create' ? 'create' : 'edit'"
        @submit="handleSubmit"
        @cancel="emit('close')"
      />
    </template>


    <template #footer v-if="localMode === 'view'">
      <Button
        label="Cancelar"
        severity="secondary"
        text
        @click="emit('close')"
      />
      <Button
        label="Eliminar"
        severity="danger"
        text
        @click="handleDelete"
      />
      <Button label="Editar" outlined @click="localMode = 'edit'" />
    </template>
  </Dialog>
</template>

