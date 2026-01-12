import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Patient } from "@/interfaces";

export const usePatientsStore = defineStore("patients", () => {
    
    const saveToStorage = (patients: Patient[]) => {
        localStorage.setItem('followcare_patients', JSON.stringify(patients))
    }

    const loadFromStorage = (): Patient[] => {
        const data = localStorage.getItem('followcare_patients')
        return data ? JSON.parse(data) : []
    }

    /* State */
    const patientArr = ref<Patient[]>(loadFromStorage());
    
    /* Getters */

    // Mujeres entre 15 y 49 años
    const womenInFertileAge = computed(() =>
        patientArr.value.filter(
        (p) => p.gender === "female" && p.dob.age >= 15 && p.dob.age <= 49
        )
    );

    // Adultos >= 45 años
    const cardiovascularRiskPatients = computed(() =>
        patientArr.value.filter((p) => p.dob.age >= 45)
    );

    // Pacientes con ≥ 5 años desde registro
    const patientsPendingExams = computed(() => {
        const today = new Date();

        return patientArr.value.filter((p) => {
        const registeredDate = new Date(p.registered.date);

        const years =
            today.getFullYear() -
            registeredDate.getFullYear() -
            (today.getMonth() < registeredDate.getMonth() ||
            (today.getMonth() === registeredDate.getMonth() &&
            today.getDate() < registeredDate.getDate())
            ? 1
            : 0);

        return years >= 5;
        });
    });

    /* Actions */
    const loadPatients = (patients: Patient[]) => {
        patientArr.value = patients;
    }

    const addPatient = (patient: Patient) => {
        patientArr.value.unshift(patient);
        saveToStorage(patientArr.value);
    };

    const updatePatient = (updated: Patient) => {
        const index = patientArr.value.findIndex(
            p => p.login.uuid === updated.login.uuid
        );
        if (index !== -1) {
            patientArr.value[index] = updated;
            saveToStorage(patientArr.value);
        }
    };

    const deletePatient = (uuid: string) => {
        patientArr.value = patientArr.value.filter(
            p => p.login.uuid !== uuid
        )
        saveToStorage(patientArr.value)
    }



    return {
        // state
        patientArr,

        // getters
        womenInFertileAge,
        cardiovascularRiskPatients,
        patientsPendingExams,

        // actions
        loadPatients,
        addPatient,
        updatePatient,
        deletePatient,
    };
});
