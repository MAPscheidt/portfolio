<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0b] text-[#00ffff] font-mono pointer-events-auto">
    <!-- Scanlines -->
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10"></div>
    
    <div class="relative z-20 w-full max-w-3xl p-8 flex flex-col justify-end text-left text-sm md:text-base leading-relaxed h-[60vh]">
      <div v-for="(line, index) in visibleLines" :key="index" class="mb-2">
        <span class="mr-2">></span>
        <span v-html="line"></span>
      </div>
      <div v-if="!isComplete" class="w-2.5 h-5 bg-[#00ffff] animate-pulse mt-1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const emit = defineEmits(['complete']);

const lines = [
  'INITIATING TEMPORAL DISPLACEMENT PROTOCOLS...',
  'ESTABLISHING SECURE CONNECTION...',
  'AUTHENTICATING GUEST_USER...',
  'ACCESS GRANTED.',
  '<br/>',
  '<span class="text-xl md:text-3xl font-black italic tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">ACCESSING DOSSIER: MATHEUS</span>',
  '<br/>',
  'LOADING 3D ENVIRONMENT...'
];

const visibleLines = ref<string[]>([]);
const isComplete = ref(false);

onMounted(() => {
  let delay = 0;
  
  lines.forEach((line, index) => {
    // Determine wait time before this line appears
    let waitTime = 600;
    if (line === 'ACCESS GRANTED.') waitTime = 1200;
    if (line.includes('ACCESSING')) waitTime = 800;
    if (line === '<br/>') waitTime = 200;
    
    delay += waitTime;
    
    setTimeout(() => {
      visibleLines.value.push(line);
      
      if (index === lines.length - 1) {
        // Last line printed, start fade out sequence
        isComplete.value = true;
        setTimeout(() => {
          emit('complete');
        }, 1500);
      }
    }, delay);
  });
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
