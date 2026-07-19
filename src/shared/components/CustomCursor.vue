<template>
  <div v-if="isHoverSupported" class="fixed inset-0 pointer-events-none z-[9999]">
    <div 
      ref="cursorDot" 
      class="fixed top-0 left-0 w-2 h-2 bg-[#00ffff] rounded-full mix-blend-difference shadow-[0_0_10px_#00ffff] pointer-events-none"
    ></div>
    <div 
      ref="cursorOutline" 
      class="fixed top-0 left-0 w-8 h-8 border border-[#00ffff] rounded-full mix-blend-difference opacity-50 pointer-events-none flex items-center justify-center"
    >
       <div class="absolute w-full h-[1px] bg-[#00ffff] opacity-30"></div>
       <div class="absolute w-[1px] h-full bg-[#00ffff] opacity-30"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const cursorDot = ref<HTMLElement | null>(null);
const cursorOutline = ref<HTMLElement | null>(null);
const isHoverSupported = ref(true);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let outlineX = mouseX;
let outlineY = mouseY;
let reqFrame: number;

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (cursorDot.value) {
    gsap.set(cursorDot.value, {
      x: mouseX - 4, // 8px width / 2
      y: mouseY - 4
    });
  }
};

const animateOutline = () => {
  // LERP for smooth trailing effect
  outlineX += (mouseX - outlineX) * 0.2;
  outlineY += (mouseY - outlineY) * 0.2;
  
  if (cursorOutline.value) {
    gsap.set(cursorOutline.value, {
      x: outlineX - 16, // 32px width / 2
      y: outlineY - 16
    });
  }
  
  reqFrame = requestAnimationFrame(animateOutline);
};

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const isInteractive = target.closest('a, button, input, textarea, select');
  
  if (cursorOutline.value && cursorDot.value) {
    if (isInteractive) {
      gsap.to(cursorOutline.value, { scale: 1.5, borderColor: '#ff00ff', opacity: 0.8, duration: 0.3 });
      gsap.to(cursorDot.value, { scale: 1.5, backgroundColor: '#ff00ff', boxShadow: '0 0 10px #ff00ff', duration: 0.3 });
      
      // Update crosshairs color
      const crosshairs = cursorOutline.value.children;
      for(let i=0; i<crosshairs.length; i++) {
        (crosshairs[i] as HTMLElement).style.backgroundColor = '#ff00ff';
      }
    } else {
      gsap.to(cursorOutline.value, { scale: 1, borderColor: '#00ffff', opacity: 0.5, duration: 0.3 });
      gsap.to(cursorDot.value, { scale: 1, backgroundColor: '#00ffff', boxShadow: '0 0 10px #00ffff', duration: 0.3 });
      
      const crosshairs = cursorOutline.value.children;
      for(let i=0; i<crosshairs.length; i++) {
        (crosshairs[i] as HTMLElement).style.backgroundColor = '#00ffff';
      }
    }
  }
};

onMounted(() => {
  // Check if device supports hover
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    isHoverSupported.value = false;
    return;
  }

  // Hide default cursor on mount
  document.documentElement.style.cursor = 'none';
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseover', onMouseOver);
  reqFrame = requestAnimationFrame(animateOutline);
});

onUnmounted(() => {
  if (!isHoverSupported.value) return;
  document.documentElement.style.cursor = 'auto';
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseover', onMouseOver);
  cancelAnimationFrame(reqFrame);
});
</script>
