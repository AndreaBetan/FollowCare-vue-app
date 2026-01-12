<script setup>
import Button from "primevue/button";
import FollowCare from "@/assets/follow-care.svg";
</script>

<template>
  <div class="relative min-h-160 lg:min-h-0 flex lg:flex-row flex-col">
    <div
      class="flex lg:flex lg:flex-row flex-col justify-center md:justify-normal h-full flex-1"
    >
      <div class="relative flex-1 z-20 flex items-center justify-center">
        <div class="flex items-center justify-center h-full">
          <div
            class="w-full max-w-2xl px-6 py-12 lg:p-12 xl:p-16 text-center lg:text-left"
          >
            <h1
              class="text-4xl xl:text-5xl font-bold text-surface-0 lg:text-surface-900 dark:text-surface-0 mb-6 leading-tight!"
            >
              <span class="block">La detección temprara</span>
              <span class="block text-primary">marca la diferencia</span>
            </h1>

            <p class="text-xl leading-normal mb-1 max-w-xl lg:max-w-none">
              El monitoreo continuo de grupos poblacionales en riesgo es clave
              para la prevención, el diagnóstico temprano y la toma de
              decisiones clínicas oportunas.
            </p>
            <p class="text-xl leading-normal mb-6 max-w-xl lg:max-w-none">
              FollowCare facilita el seguimiento
              de pacientes con riesgo cardiovascular, mujeres en edad fértil y
              personas con exámenes pendientes, permitiendo una atención más
              proactiva, personalizada y basada en datos.
            </p>
          </div>
        </div>
      </div>

      <div class="lg:relative inset-0 lg:inset-auto flex-1">
        <div class="lg:hidden inset-0 bg-surface-900/60 dark:bg-surface-900/80 z-10"/>
        <img
          :src="FollowCare"
          alt="hero-1"
          class="h-full w-full object-cover xl:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"
        />
      </div>
    </div>
  </div>
</template>
