import { storeToRefs } from 'pinia'
import { onMounted, ref, computed, watch } from 'vue'
import { usePatientsStore } from '@/stores/patients-store'
import { getPatients } from '@/helpers/patients-api'
import type { PatientFilter } from '@/interfaces'

export const usePatients = (filter?: Ref<PatientFilter>) => {

  const store = usePatientsStore()

  const {
    patientArr,
    womenInFertileAge,
    cardiovascularRiskPatients,
    patientsPendingExams
  } = storeToRefs(store)

  // actions
  const { loadPatients } = store

  //pagination
  const page = ref<number>(1)
  const results = ref<number>(20)
  const loading = ref<boolean>(false)

  const fetchPatients = async () => {
    if (patientArr.value.length) return;
    
    try {
      loading.value = true
      const res = await getPatients({ results: 200 })
      loadPatients(res.results)
    } finally {
      loading.value = false
    }
  }

  const filteredAllPatients = computed(() => {
    switch (filter.value) {
      case 'cardiovascular-risk': return cardiovascularRiskPatients.value
      case 'fertile-women': return womenInFertileAge.value
      case 'pending-exams': return patientsPendingExams.value
      default: return patientArr.value
    }
  })

  const paginatedPatients = computed(() => {
    const start = (page.value - 1) * results.value
    return filteredAllPatients.value.slice(
      start,
      start + results.value
    )
  })

  const nextPage = () => {
    if ((page.value * results.value) < filteredAllPatients.value.length) {
      page.value++
    }
  }

  const prevPage = () => {
    if( page.value > 1) {
      page.value--
    }  
  }

  watch(filter, () => page.value = 1)

  onMounted(fetchPatients)
  
  return {
    paginatedPatients,
    page,
    loading,
    nextPage,
    prevPage
  }
}
