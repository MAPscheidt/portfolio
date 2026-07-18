<template>
  <div class="relative group w-full max-w-sm rounded-none border-l-4 border-[#ff00ff] bg-neutral-900/60 backdrop-blur-md p-6 shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:-translate-y-2 pointer-events-auto">
    
    <!-- Title & Link -->
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-xl font-bold uppercase tracking-widest text-white">{{ title }}</h3>
      <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="text-[#00ffff] hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>

    <!-- Description -->
    <p class="text-sm leading-relaxed text-neutral-300 mb-6">
      {{ description }}
    </p>

    <!-- Tech Stack -->
    <div class="flex flex-wrap gap-2 mt-auto">
      <span 
        v-for="tech in technologies" 
        :key="tech" 
        class="text-[10px] uppercase tracking-widest text-[#00ffff] border border-[#00ffff]/50 px-2 py-1"
      >
        {{ tech }}
      </span>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}>();
</script>
