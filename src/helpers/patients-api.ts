import type { PatientResponse } from '@/interfaces'
import { patientsApi } from '@/api/patientsApi'

export const getPatients = async ({ page, results}): Promise<PatientResponse> => {

  const params: Record<string, any> = {
    page,
    results
  }

  const { data } = await patientsApi.get<PatientResponse>('/', { params })
  return data
}

export const createPatient = (patient: Patient): Promise<Patient> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patient)
    }, 500)
  })
}

export const updatePacientApi = (patient: Patient): Promise<Patient> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(patient), 500)
  })
}

export const deletePatientApi = (uuid: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}
