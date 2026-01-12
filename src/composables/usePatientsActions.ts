import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePatientsStore } from '@/stores/patients-store'
import { updatePacientApi, createPatient, deletePatientApi } from '@/helpers/patients-api'
import type { Patient } from '@/interfaces'

export const usePatientsActions = () => {

  const store = usePatientsStore()

  // actions
  const { addPatient, updatePatient, deletePatient } = store
  
  const actionLoading = ref<boolean>(false)
  const error = ref<string | null>(null);

  const create = async (patient: Pacient) => {  
    try {
      actionLoading.value = true
      const created = await createPatient(patient)
      addPatient(created)
    } catch {
      error.value = "Error creando paciente";
    } finally {
      actionLoading.value = false
    }
  }

  const update = async (patient: Patient) => {  
    try {
      actionLoading.value = true
      const updated = await updatePacientApi(patient)
      updatePatient(updated)
    } catch {
      error.value = "Error actualizando paciente";
    } finally {
      actionLoading.value = false
    }
  }
  
  const remove = async (patient: Patient) => {
    try {
      actionLoading.value = true
      await deletePatientApi(patient.login.uuid)
      deletePatient(patient.login.uuid)
    } catch {
      error.value = "Error eliminando paciente"
    } finally {
      actionLoading.value = false
    }
  }

  return {
    create,
    update,
    remove,
    actionLoading,
    error,
  }
}
