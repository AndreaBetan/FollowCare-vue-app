<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import Button from "primevue/button";
import type { Patient } from "@/interfaces";

const props = defineProps<{
  patient: Patient;
  mode: "create" | "edit";
}>();

const emit = defineEmits<{
  (e: "submit", patient: Patient): void;
  (e: "cancel"): void;
}>();

// Validaciones
const required = (v: string) => (v && v.trim() ? true : "Campo obligatorio");
const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email inválido";
const positiveNumber = (v: string) => Number(v) > 0 || "Debe ser mayor que 0";

// Submit
const onSubmit = (values: any) => {
  emit("submit", {
    ...props.patient,
    name: {
      first: values.firstName,
      last: values.lastName,
    },
    gender: values.gender,
    email: values.email,
    phone: values.phone,
    dob: {
      ...props.patient.dob,
      age: Number(values.age),
    },
  });
};
</script>
<template>
  <Form
    :initial-values="{
      firstName: patient.name.first,
      lastName: patient.name.last,
      gender: patient.gender,
      email: patient.email,
      phone: patient.phone,
      age: patient.dob.age,
    }"
    @submit="onSubmit"
    v-slot="{ meta, isSubmitting }"
    class="flex flex-column gap-3 lg:w-30rem"
  >
    <div class="field">
      <Field
        name="firstName"
        :rules="required"
        placeholder="Nombre"
        class="fc-input"
      />
      <ErrorMessage name="firstName" class="fc-error" />
    </div>

    <div class="field">
      <Field
        name="lastName"
        :rules="required"
        placeholder="Apellido"
        class="fc-input"
      />
      <ErrorMessage name="lastName" class="fc-error" />
    </div>

    <div class="field">
      <Field
        name="gender"
        :rules="required"
        placeholder="Genero"
        class="fc-input"
      />
      <ErrorMessage name="gender" class="fc-error" />
    </div>

    <div class="field">
      <Field
        name="email"
        :rules="validEmail"
        placeholder="Email"
        class="fc-input"
      />
      <ErrorMessage name="email" class="fc-error" />
    </div>

    <div class="field">
      <Field
        name="phone"
        :rules="required"
        placeholder="Teléfono"
        class="fc-input"
      />
      <ErrorMessage name="phone" class="fc-error" />
    </div>

    <div class="field">
      <Field
        name="age"
        type="number"
        :rules="positiveNumber"
        placeholder="Edad"
        class="fc-input"
      />
      <ErrorMessage name="age" class="fc-error" />
    </div>

    <!-- Footer -->
    <div class="flex justify-content-end gap-2 mt-3">
      <Button
        label="Cancelar"
        severity="secondary"
        text
        @click="emit('cancel')"
      />

      <Button
        type="submit"
        :label="mode === 'create' ? 'Crear' : 'Guardar'"
        severity="success"
        :disabled="!meta.valid || isSubmitting"
        :loading="isSubmitting"
      />
    </div>
  </Form>
</template>

<style scoped>
.fc-input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.fc-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.25);
  outline: none;
}

.fc-error {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

.field {
  display: flex;
  flex-direction: column;
}
</style>
