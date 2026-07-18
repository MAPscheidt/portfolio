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

    <div class="fixed inset-0 w-full h-full z-0 pointer-events-none">
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

    <main class="relative z-10 w-full flex flex-col pointer-events-boxnone overflow-hidden">
      
      <!-- Expanded About Overlay -->
      <transition 
        enter-active-class="transition-all duration-500 ease-out" 
        enter-from-class="opacity-0 scale-95" 
        enter-to-class="opacity-100 scale-100" 
        leave-active-class="transition-all duration-300 ease-in" 
        leave-from-class="opacity-100 scale-100" 
        leave-to-class="opacity-0 scale-95"
      >
        <div 
          v-if="globalState.isAboutExpanded"
          class="fixed inset-0 z-50 flex items-end md:items-center justify-end p-4 pb-8 md:p-12 pointer-events-auto!"
          @click.self="toggleAboutExpanded"
        >
          <div 
            data-lenis-prevent
            class="relative w-full max-w-2xl max-h-[60vh] md:max-h-full bg-neutral-900/80 backdrop-blur-md border-l-4 border-[#00ffff] rounded-none shadow-[0_0_30px_rgba(0,255,255,0.2)] p-6 md:p-16 overflow-y-auto overscroll-contain touch-pan-y"
          >
            <button 
              @click="toggleAboutExpanded"
              class="absolute top-6 right-6 text-neutral-400 hover:text-[#00ffff] transition-colors p-2 z-10"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <h2 class="text-4xl font-black italic tracking-tighter text-[#00ffff] mb-8 mt-2 md:mt-0 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">USER_DOSSIER: MATHEUS</h2>
            
            <div class="space-y-6 text-neutral-300 leading-relaxed font-sans">
              <p>This is where you can write an extensive, detailed history of your career. Because the main page scroll is paused, the user can freely scroll through this panel without losing their spot in the 3D cinematic timeline.</p>
              
              <p>I started my journey exploring how code could intersect with creative visual arts, leading me to specialize in Three.js and WebGL rendering within modern JS frameworks like Vue and React.</p>
              
              <h3 class="text-xl font-bold text-white mt-12 mb-4 uppercase tracking-widest border-b border-neutral-700 pb-2">Core Competencies</h3>
              <ul class="grid grid-cols-2 gap-4">
                <li class="flex items-center text-[#00ffff]"><span class="mr-3 opacity-50">⚡</span> Advanced Vue.js</li>
                <li class="flex items-center text-[#00ffff]"><span class="mr-3 opacity-50">⚡</span> Three.js & WebGL</li>
                <li class="flex items-center text-[#00ffff]"><span class="mr-3 opacity-50">⚡</span> Node & Express</li>
                <li class="flex items-center text-[#00ffff]"><span class="mr-3 opacity-50">⚡</span> Database Architecture</li>
                <li class="flex items-center text-[#00ffff]"><span class="mr-3 opacity-50">⚡</span> GSAP Animation</li>
                <li class="flex items-center text-[#00ffff]"><span class="mr-3 opacity-50">⚡</span> UI/UX Design</li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      
      <div 
        :class="{ 
          'opacity-0 pointer-events-none transition-opacity duration-700': globalState.isAboutExpanded, 
          'opacity-100 transition-opacity duration-700': !globalState.isAboutExpanded 
        }"
        class="w-full flex flex-col pointer-events-boxnone"
      >
        <section class="w-full min-h-screen flex flex-col justify-between p-6 md:p-12 text-white">
        <header class="flex flex-col md:flex-row justify-between items-start w-full mix-blend-difference gap-4">
          <div class="flex flex-col">
            <h1 class="glitch-text text-4xl md:text-5xl font-black tracking-tighter leading-none italic text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" data-text="MATHEUS">MATHEUS</h1>
            <span class="text-xs md:text-sm text-[#00ffff] font-mono mt-2">> SYS_ROLE: CREATIVE FULL-STACK ENGINEER // 3D SPECIALIST</span>
          </div>
          <div class="flex flex-col md:items-end">
            <span class="text-xs uppercase tracking-widest text-[#ff00ff] font-bold">> LOC_TRACKING: ACTIVE</span>
            <span class="text-xs uppercase tracking-widest text-[#00ffff] font-bold mt-1">GOLD COAST // AUS</span>
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
            I am a passionate Full-Stack Developer blending creative design with high-performance engineering. I specialize in building immersive web experiences, modern web applications, and interactive 3D environments that push the boundaries of what the browser can do.
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
            class="self-start"
            title="Nexus E-Commerce" 
            description="A high-performance headless e-commerce platform featuring real-time inventory tracking, AI-driven recommendations, and seamless checkout." 
            :technologies="['Vue 3', 'Nuxt', 'Tailwind', 'Stripe']" 
            link="#" 
          />
          <ProjectCard 
            class="self-end"
            title="Chronos Dashboard" 
            description="Enterprise analytics dashboard with WebGL data visualization, real-time WebSocket streams, and customizable widget layouts." 
            :technologies="['React', 'Three.js', 'Node.js', 'PostgreSQL']" 
            link="#" 
          />
          <ProjectCard 
            class="self-start"
            title="Aura UI Library" 
            description="An open-source glassmorphism UI component library built from the ground up for modern web applications." 
            :technologies="['TypeScript', 'CSS', 'Vite', 'Storybook']" 
            link="#" 
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
            class="group hover:text-white hover:shadow-[0_0_15px_rgba(255,0,255,0.8)] transition-all duration-300 uppercase tracking-wider font-bold pointer-events-auto border border-[#ff00ff] px-4 py-2 hover:bg-[#ff00ff]/10"
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
import { onMounted, onUnmounted, ref } from 'vue';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StudioScene from '../shared/components/StudioScene.vue';
import ProjectCard from '../shared/components/ProjectCard.vue';
import ContactForm from '../shared/components/ContactForm.vue';
import TimeCircuits from '../shared/components/TimeCircuits.vue';
import BootSequence from '../shared/components/BootSequence.vue';
import { globalState } from '../shared/state';

gsap.registerPlugin(ScrollTrigger);

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
  globalState.isAboutExpanded = !globalState.isAboutExpanded;
  if (globalState.isAboutExpanded) {
    lenisEngine?.stop();
  } else {
    lenisEngine?.start();
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
  }, 3000); // 3-second sequence
};

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
