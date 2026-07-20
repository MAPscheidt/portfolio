<template>
  <div id="app-scroll-viewport" class="relative w-full min-h-screen bg-[#0b0b0b] font-mono select-none">
    
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-1000 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <BootSequence v-if="isBooting" @complete="handleBootComplete" />
    </transition>

    <div :class="[
      'fixed inset-0 w-full h-full pointer-events-auto',
      (globalState.isAboutExpanded || globalState.isDriveInMode) ? 'z-20' : 'z-0'
    ]">
      <Suspense>
        <template #default>
          <StudioScene />
        </template>
        <template #fallback>
          <div class="flex items-center justify-center w-full h-full text-white text-sm tracking-widest">
            INITIALISING 3D ENVIRONMENT...
          </div>
        </template>
      </Suspense>
    </div>

    <main :class="[
      'relative w-full flex flex-col pointer-events-boxnone overflow-hidden',
      (globalState.isAboutExpanded || globalState.isAboutReturning || globalState.isDriveInMode || globalState.isDriveInReturning) ? 'z-0 !pointer-events-none' : 'z-10'
    ]">
      
      <!-- 2D Expanded About Overlay has been moved to a 3D panel in SceneContent.vue -->
      
      <div 
        :class="{ 
          'opacity-0 pointer-events-none transition-opacity duration-700': globalState.isAboutExpanded || globalState.isAboutReturning || globalState.isDriveInMode || globalState.isDriveInReturning, 
          'opacity-100 transition-opacity duration-700': !globalState.isAboutExpanded && !globalState.isAboutReturning && !globalState.isDriveInMode && !globalState.isDriveInReturning
        }"
        class="w-full flex flex-col pointer-events-boxnone"
      >
        <section class="w-full min-h-screen flex flex-col justify-between p-6 md:p-12 text-white">
        <header class="flex flex-col md:flex-row justify-between items-start w-full mix-blend-difference gap-4">
          <div class="flex flex-col">
            <h1 class="glitch-text text-4xl md:text-5xl font-black tracking-tighter leading-none italic text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" :data-text="portfolioData.name">{{ portfolioData.name }}</h1>
            <span class="text-xs md:text-sm text-[#00ffff] font-mono mt-2">{{ portfolioData.role }}</span>
          </div>
          <div class="flex flex-col md:items-end">
            <span class="text-xs uppercase tracking-widest text-[#ff00ff] font-bold">> LOC_TRACKING: ACTIVE</span>
            <span class="text-xs uppercase tracking-widest text-[#00ffff] font-bold mt-1">{{ portfolioData.location }}</span>
          </div>
        </header>
        <div class="max-w-xl self-start mb-24 mix-blend-difference">
          <p class="text-lg md:text-2xl leading-relaxed font-semibold text-white drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">
            Where we're going, we don't need roads. Keep scrolling to find out.
          </p>
        </div>
      </section>

      <!-- About Me Section -->
      <section class="w-full min-h-screen flex items-center justify-end p-6 md:p-12 text-white">
        <div class="w-full max-w-md bg-neutral-900/60 backdrop-blur-md p-8 border-l-4 border-[#00ffff] rounded-none shadow-[0_0_15px_rgba(0,255,255,0.3)] pointer-events-auto">
          <h2 class="text-xs uppercase tracking-widest text-[#00ffff] mb-4 font-bold">// ABOUT ME</h2>
          <p class="text-sm leading-loose text-neutral-300">
            {{ portfolioData.aboutMe }}
          </p>
          <button 
            @click="toggleAboutExpanded"
            class="mt-6 bg-transparent border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,255,0.8)] transition-all duration-300 uppercase tracking-wider font-bold px-4 py-2 text-xs"
          >
            EXPAND DATABANKS →
          </button>
        </div>
      </section>

      <!-- Projects Section (Spans 200vh to allow scroll exploration) -->
      <section class="w-full min-h-[200vh] flex flex-col pt-32 p-6 md:p-12 z-20">
        <h2 class="text-3xl font-black italic tracking-tighter text-[#ff00ff] mb-12 drop-shadow-[0_0_10px_rgba(255,0,255,0.8)] mix-blend-difference">FEATURED PROJECTS</h2>
        
        <div class="flex flex-col space-y-32 w-full max-w-6xl mx-auto">
          <ProjectCard 
            v-for="(project, index) in portfolioData.projects"
            :key="index"
            :class="index % 2 === 0 ? 'self-start' : 'self-end'"
            :title="project.title" 
            :description="project.description" 
            :technologies="project.technologies" 
            :link="project.link" 
          />
        </div>
      </section>

      <!-- Contact & Departure Section -->
      <section class="w-full min-h-screen flex flex-col justify-between p-6 md:p-12 text-white z-20 relative pt-32">
        <div class="w-full flex flex-col md:flex-row items-center justify-between gap-12 mt-auto mb-32">
          
          <ContactForm />

          <div class="w-full flex flex-col items-center justify-center mix-blend-difference text-center">
            <h2 ref="speedTextRef" class="text-5xl md:text-8xl font-black italic tracking-tighter text-[#ff5500] drop-shadow-[0_0_20px_rgba(255,85,0,0.8)]">0 MPH</h2>
            <p class="text-sm tracking-widest text-[#00ffff] font-bold mt-4 uppercase">TEMPORAL DISPLACEMENT INITIATED</p>
          </div>
        </div>

        <footer class="w-full border-t border-[#ff00ff]/30 pt-6 flex justify-between items-center text-xs text-[#ff00ff]">
          <div>© DELOREAN MOTOR COMPANY</div>
          <button 
            @click="triggerEasterEgg"
            class="group flash-attention hover:text-white hover:shadow-[0_0_15px_rgba(255,0,255,0.8)] transition-all duration-300 uppercase tracking-wider font-bold pointer-events-auto border border-[#ff00ff] px-4 py-2 hover:bg-[#ff00ff]/10"
          >
             <span class="glitch-text opacity-90 group-hover:opacity-100 transition-opacity" data-text="TIME TRAVEL">TIME TRAVEL</span>
          </button>
        </footer>
      </section>

      </div>
    </main>
    
    <!-- Time Circuits Easter Egg UI (Moved outside main to avoid transform stacking context issues) -->
    <transition 
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-[2000ms]"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <TimeCircuits v-if="showTimeCircuits" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StudioScene from '../shared/components/StudioScene.vue';
import ProjectCard from '../shared/components/ProjectCard.vue';
import ContactForm from '../shared/components/ContactForm.vue';
import TimeCircuits from '../shared/components/TimeCircuits.vue';
import BootSequence from '../shared/components/BootSequence.vue';
import { globalState } from '../shared/state';
import { parseReadme } from '../shared/useReadme';
import rawReadme from '../../README.md?raw';

gsap.registerPlugin(ScrollTrigger);

const portfolioData = parseReadme(rawReadme);

let lenisEngine: Lenis | null = null;
let animationFrameId: number | null = null;
const speedTextRef = ref<HTMLElement | null>(null);
const showTimeCircuits = ref(false);
const isBooting = ref(true);

const handleBootComplete = () => {
  isBooting.value = false;
  if (!globalState.isAboutExpanded) {
    lenisEngine?.start();
  }
};

const toggleAboutExpanded = () => {
  if (globalState.isDriveInMode || globalState.isDriveInReturning || globalState.isAboutReturning || globalState.isEasterEggActive) return;
  globalState.isAboutExpanded = !globalState.isAboutExpanded;
  if (globalState.isAboutExpanded) {
    lenisEngine?.stop();
  }
};

const triggerEasterEgg = () => {
  if (globalState.isEasterEggActive) return;
  globalState.isEasterEggActive = true;
  showTimeCircuits.value = true;
  
  // 1. UI Glitch Overload
  gsap.to('main', { 
    x: () => Math.random() * 10 - 5, 
    y: () => Math.random() * 10 - 5, 
    duration: 0.05, 
    repeat: 30, 
    yoyo: true 
  });
  
  // 2. Lock-in happens at 1.5s (handled inside TimeCircuits.vue)
  
  // 3. Temporal Displacement
  setTimeout(() => {
    // Reset shake
    gsap.set('main', { clearProps: 'transform' }); 
    
    // Snap scroll to 1985 (top of page)
    lenisEngine?.scrollTo(0, { immediate: true });
    
    // Fade out Time Circuits
    showTimeCircuits.value = false;
    
    // Trigger the 3D drive-in animation exactly as the UI starts fading out
    globalState.isEasterEggActive = false;
  }, 3000); 
};

watch(() => globalState.isDriveInMode || globalState.isDriveInReturning || globalState.isAboutExpanded || globalState.isAboutReturning, (isActive) => {
  if (isActive) {
    lenisEngine?.stop();
    document.body.style.overflow = 'hidden';
  } else {
    lenisEngine?.start();
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  // Prevent browser from restoring previous scroll position on reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  lenisEngine = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    syncTouch: true,
  });

  // Force Lenis to start at the absolute top
  lenisEngine.scrollTo(0, { immediate: true });

  if (isBooting.value) {
    lenisEngine.stop();
  }

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  function renderTicker(time: number) {
    lenisEngine?.raf(time);
    animationFrameId = requestAnimationFrame(renderTicker);
  }

  animationFrameId = requestAnimationFrame(renderTicker);

  // Speed Counter Animation perfectly synced with the 3D scene timeline
  const speedObj = { value: 0 };
  
  const speedTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#app-scroll-viewport',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
    }
  });

  // The 3D car departure starts at time '3' in the updated GSAP timeline.
  // We use the exact same timeline structure so it is 100% synced.
  speedTimeline.to(speedObj, {
    value: 88,
    duration: 0.4, // Finish slightly before the car animation ends
    ease: 'power2.in', // slightly smoother curve than power3
    onUpdate: () => {
      if (speedTextRef.value) {
        speedTextRef.value.innerText = `${Math.round(speedObj.value)} MPH`;
      }
    }
  }, 3);
  
  // Pad the timeline to exactly 3.5s to match the 3D scrollTimeline.
  // This ensures the 88 MPH is reached at 97% scroll, preventing mobile browser UI from clipping the final pixel.
  speedTimeline.set({}, {}, 3.5);
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  lenisEngine?.destroy();
});
</script>

<style scoped>
.pointer-events-boxnone {
  pointer-events: none;
}
.pointer-events-boxnone > * {
  pointer-events: none;
}
button, a {
  pointer-events: auto;
}
</style>
