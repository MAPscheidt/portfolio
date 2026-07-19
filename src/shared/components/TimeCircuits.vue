<template>
  <div class="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-4 gap-4 md:gap-8 font-mono pointer-events-none overflow-hidden">
    
    <!-- Lightning and Flash Effects -->
    <div ref="lightningOverlay" class="fixed inset-0 bg-[#00ffff] z-[190] opacity-0 pointer-events-none mix-blend-color-dodge"></div>
    <div ref="flashOverlay" class="fixed inset-0 bg-white z-[200] opacity-0 pointer-events-none mix-blend-screen"></div>

    <!-- DESTINATION TIME (RED) -->
    <div class="flex flex-col items-center transform scale-[0.6] sm:scale-75 md:scale-100">
      <div class="bg-neutral-400 p-2 md:p-4 rounded flex space-x-1 md:space-x-2 border-b-[12px] border-neutral-600 shadow-2xl">
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">MONTH</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[100px] h-[80px]">
            <span class="text-5xl text-[#ff0000] drop-shadow-[0_0_15px_#ff0000] uppercase">{{ dest.month }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">DAY</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#ff0000] drop-shadow-[0_0_15px_#ff0000]">{{ dest.day }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">YEAR</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[140px] h-[80px]">
            <span class="text-5xl text-[#ff0000] drop-shadow-[0_0_15px_#ff0000]">{{ dest.year }}</span>
          </div>
        </div>
        <!-- AM PM -->
        <div class="flex flex-col justify-center space-y-4 px-2 pt-4">
          <div class="flex items-center space-x-1">
            <span class="text-red-800 font-sans text-[10px] font-black">AM</span>
            <div class="w-3 h-3 rounded-full bg-[#ff0000] shadow-[0_0_10px_#ff0000]"></div>
          </div>
          <div class="flex items-center space-x-1">
            <span class="text-red-800 font-sans text-[10px] font-black">PM</span>
            <div class="w-3 h-3 rounded-full bg-red-950"></div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">HOUR</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#ff0000] drop-shadow-[0_0_15px_#ff0000]">{{ dest.hour }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-end text-6xl text-[#ff0000] opacity-80 pb-2 drop-shadow-[0_0_10px_#ff0000]">:</div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">MIN</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#ff0000] drop-shadow-[0_0_15px_#ff0000]">{{ dest.min }}</span>
          </div>
        </div>
      </div>
      <div class="mt-2 px-6 py-1 bg-black text-white text-sm md:text-base border-2 border-neutral-500 font-sans font-black tracking-[0.3em] uppercase">
        DESTINATION TIME
      </div>
    </div>

    <!-- PRESENT TIME (GREEN) -->
    <div class="flex flex-col items-center transform scale-[0.6] sm:scale-75 md:scale-100">
      <div class="bg-neutral-400 p-2 md:p-4 rounded flex space-x-1 md:space-x-2 border-b-[12px] border-neutral-600 shadow-2xl">
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">MONTH</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[100px] h-[80px]">
            <span class="text-5xl text-[#00ff00] drop-shadow-[0_0_15px_#00ff00] uppercase">{{ present.month }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">DAY</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#00ff00] drop-shadow-[0_0_15px_#00ff00]">{{ present.day }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">YEAR</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[140px] h-[80px]">
            <span class="text-5xl text-[#00ff00] drop-shadow-[0_0_15px_#00ff00]">{{ present.year }}</span>
          </div>
        </div>
        <!-- AM PM -->
        <div class="flex flex-col justify-center space-y-4 px-2 pt-4">
          <div class="flex items-center space-x-1">
            <span class="text-red-800 font-sans text-[10px] font-black">AM</span>
            <div :class="['w-3 h-3 rounded-full', present.isAm ? 'bg-[#00ff00] shadow-[0_0_10px_#00ff00]' : 'bg-red-950']"></div>
          </div>
          <div class="flex items-center space-x-1">
            <span class="text-red-800 font-sans text-[10px] font-black">PM</span>
            <div :class="['w-3 h-3 rounded-full', !present.isAm ? 'bg-[#00ff00] shadow-[0_0_10px_#00ff00]' : 'bg-red-950']"></div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">HOUR</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#00ff00] drop-shadow-[0_0_15px_#00ff00]">{{ present.hour }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-end text-6xl text-[#00ff00] opacity-80 pb-2 drop-shadow-[0_0_10px_#00ff00]">:</div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">MIN</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#00ff00] drop-shadow-[0_0_15px_#00ff00]">{{ present.min }}</span>
          </div>
        </div>
      </div>
      <div class="mt-2 px-6 py-1 bg-black text-white text-sm md:text-base border-2 border-neutral-500 font-sans font-black tracking-[0.3em] uppercase">
        PRESENT TIME
      </div>
    </div>

    <!-- LAST TIME DEPARTED (YELLOW) -->
    <div class="flex flex-col items-center transform scale-[0.6] sm:scale-75 md:scale-100">
      <div class="bg-neutral-400 p-2 md:p-4 rounded flex space-x-1 md:space-x-2 border-b-[12px] border-neutral-600 shadow-2xl">
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">MONTH</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[100px] h-[80px]">
            <span class="text-5xl text-[#ffcc00] drop-shadow-[0_0_15px_#ffcc00] uppercase">{{ last.month }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">DAY</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#ffcc00] drop-shadow-[0_0_15px_#ffcc00]">{{ last.day }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">YEAR</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[140px] h-[80px]">
            <span class="text-5xl text-[#ffcc00] drop-shadow-[0_0_15px_#ffcc00]">{{ last.year }}</span>
          </div>
        </div>
        <!-- AM PM -->
        <div class="flex flex-col justify-center space-y-4 px-2 pt-4">
          <div class="flex items-center space-x-1">
            <span class="text-red-800 font-sans text-[10px] font-black">AM</span>
            <div class="w-3 h-3 rounded-full bg-[#ffcc00] shadow-[0_0_10px_#ffcc00]"></div>
          </div>
          <div class="flex items-center space-x-1">
            <span class="text-red-800 font-sans text-[10px] font-black">PM</span>
            <div class="w-3 h-3 rounded-full bg-red-950"></div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">HOUR</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#ffcc00] drop-shadow-[0_0_15px_#ffcc00]">{{ last.hour }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-end text-6xl text-[#ffcc00] opacity-80 pb-2 drop-shadow-[0_0_10px_#ffcc00]">:</div>
        <div class="flex flex-col items-center">
          <span class="bg-red-800 text-white text-[10px] px-2 py-0.5 mb-1 font-sans font-bold tracking-widest border border-red-900 shadow-md">MIN</span>
          <div class="bg-black p-2 border-4 border-neutral-900 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center w-[80px] h-[80px]">
            <span class="text-5xl text-[#ffcc00] drop-shadow-[0_0_15px_#ffcc00]">{{ last.min }}</span>
          </div>
        </div>
      </div>
      <div class="mt-2 px-6 py-1 bg-black text-white text-sm md:text-base border-2 border-neutral-500 font-sans font-black tracking-[0.3em] uppercase">
        LAST TIME DEPARTED
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const pad = (num: number, size: number) => num.toString().padStart(size, '0');

// Get actual current local time
const now = new Date();
const currentMonth = months[now.getMonth()];
const currentDay = pad(now.getDate(), 2);
const currentYear = pad(now.getFullYear(), 4);
const currentMin = pad(now.getMinutes(), 2);
let hours = now.getHours();
const isAm = hours < 12;
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
const currentHour = pad(hours, 2);

// Initial random scramble state
const dest = reactive({ month: '---', day: '--', year: '----', hour: '--', min: '--' });
const present = reactive({ 
  month: currentMonth, 
  day: currentDay, 
  year: currentYear, 
  hour: currentHour, 
  min: currentMin,
  isAm: isAm 
});
const last = reactive({ month: 'NOV', day: '05', year: '1955', hour: '06', min: '00' });

const lightningOverlay = ref<HTMLElement | null>(null);
const flashOverlay = ref<HTMLElement | null>(null);

let intervalId: any = null;

onMounted(() => {
  // Scramble animation for 1.5 seconds
  intervalId = setInterval(() => {
    dest.month = months[Math.floor(Math.random() * months.length)];
    dest.day = pad(Math.floor(Math.random() * 31) + 1, 2);
    dest.year = pad(Math.floor(Math.random() * 9000) + 1000, 4);
    dest.hour = pad(Math.floor(Math.random() * 12) + 1, 2);
    dest.min = pad(Math.floor(Math.random() * 60), 2);
  }, 50);

  setTimeout(() => {
    clearInterval(intervalId);
    // Lock into Destination
    dest.month = 'OCT';
    dest.day = '26';
    dest.year = '1985';
    dest.hour = '01';
    dest.min = '21';

    // Lightning effect starting shortly after lock-in
    if (lightningOverlay.value) {
      gsap.to(lightningOverlay.value, {
        opacity: 0.8,
        duration: 0.05,
        repeat: 15,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5 // Start around 2.0s total time
      });
    }

    // Blinding white flash peaking at exactly 3.0s total time
    if (flashOverlay.value) {
      gsap.to(flashOverlay.value, {
        opacity: 1,
        duration: 0.2,
        delay: 1.3 // Starts at 2.8s total time
      });
    }
  }, 1500);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
