<template>
  <TresPerspectiveCamera
    ref="cameraRef"
    :fov="50"
    :near="0.1"
    :far="500"
    :position="[8, 5, 8] as any"
  />

  <!-- DeLorean Model from GLTF (Scaled down to fit scene bounds) -->
  <TresGroup ref="easterEggWrapperRef">
    <TresGroup ref="deloreanRef" :position="[0, -0.4, 0] as any">
      <GLTFModel 
        :path="`${baseUrl}models/delorean_-_time_machine_-_low_poly.glb`" 
        draco 
        :scale="[0.4, 0.4, 0.4] as any" 
        @click="onCarClick"
      />
      <TresPointLight ref="overloadLightRef" :position="[0, 1, 0] as any" color="#ffffff" :intensity="0" :distance="50" />
    </TresGroup>
  </TresGroup>

  <!-- Thematic Retro Lighting -->
  <TresAmbientLight :intensity="0.2" color="#4a5568" />
  <TresDirectionalLight :position="[5, 5, 5] as any" :intensity="2" color="#e2e8f0" cast-shadow />
  
  <!-- Neon Point Lights for BTTF Synthwave Vibe -->
  <TresPointLight :position="[2, 1, 3] as any" :intensity="10" color="#00ffff" />
  <TresPointLight :position="[-3, 1, -2] as any" :intensity="10" color="#ff00ff" />
  
  <!-- Glowing Floor Grid -->
  <TresGridHelper :args="[1000, 1000, '#ff00ff', '#4a004a']" :position="[0, 0, 0] as any" />

  <!-- Fire Trails for 88MPH Departure (Oriented along X-axis since car faces -X) -->
  <TresGroup ref="fireTrailsRef" :position="[0, 0.01, 0] as any" :scale="[0.001, 1, 1] as any">
    <!-- Left Fire Trail -->
    <TresMesh :position="[-20, 0, -0.7] as any" :rotation="[-Math.PI / 2, 0, 0] as any">
      <TresPlaneGeometry :args="[40, 0.2]" />
      <TresMeshBasicMaterial ref="fireMatLeftRef" color="#ff5500" :transparent="true" :opacity="0" />
    </TresMesh>
    <!-- Right Fire Trail -->
    <TresMesh :position="[-20, 0, 0.7] as any" :rotation="[-Math.PI / 2, 0, 0] as any">
      <TresPlaneGeometry :args="[40, 0.2]" />
      <TresMeshBasicMaterial ref="fireMatRightRef" color="#ff5500" :transparent="true" :opacity="0" />
    </TresMesh>
  </TresGroup>

  <!-- Fire Trails for Arrival (Spawns at x=40 and grows to x=0) -->
  <TresGroup ref="arrivalFireTrailsRef" :position="[40, 0.01, 0] as any" :scale="[0.001, 1, 1] as any">
    <!-- Left Fire Trail -->
    <TresMesh :position="[-20, 0, -0.7] as any" :rotation="[-Math.PI / 2, 0, 0] as any">
      <TresPlaneGeometry :args="[40, 0.2]" />
      <TresMeshBasicMaterial ref="arrivalFireMatLeftRef" color="#ff5500" :transparent="true" :opacity="0" />
    </TresMesh>
    <!-- Right Fire Trail -->
    <TresMesh :position="[-20, 0, 0.7] as any" :rotation="[-Math.PI / 2, 0, 0] as any">
      <TresPlaneGeometry :args="[40, 0.2]" />
      <TresMeshBasicMaterial ref="arrivalFireMatRightRef" color="#ff5500" :transparent="true" :opacity="0" />
    </TresMesh>
  </TresGroup>

  <!-- HOVERBOARD ZONE -->
  <TresGroup ref="hoverboardGroupRef" :position="[15, 1.5, 0] as any" :visible="globalState.isAboutExpanded">
    <!-- Neon Underglow -->
    <TresPointLight :position="[0, -1, 0] as any" color="#ff00ff" :intensity="5" :distance="10" />
    <TresPointLight :position="[0, 1, 0] as any" color="#00ffff" :intensity="2" :distance="10" />
    
    <!-- Glowing Hoverboard Model -->
    <TresGroup ref="hoverboardMeshRef">
      <GLTFModel :path="`${baseUrl}models/back_to_the_future_ii_-_hover_board_low_poly.glb`" draco :scale="[1, 1, 1] as any" />
    </TresGroup>
  </TresGroup>

  <!-- DRIVE-IN ZONE -->
  <TresGroup :position="[250, 0, -40] as any" :visible="isScreenVisible">
    <!-- The Drive-In Screen -->
    <TresMesh :position="[0, 20, 0] as any" :rotation="[0, -Math.PI / 2, 0] as any" :scale="[2.5, 2.5, 2.5] as any">
      <TresPlaneGeometry :args="[24, 13.5]" />
      <TresMeshBasicMaterial color="#000000" />
      <Html transform wrapper-class="drive-in-html-wrapper" :distance-factor="15">
        <div v-show="isScreenVisible" class="w-[1280px] h-[720px] bg-black/80 flex flex-col items-center justify-center border-4 border-[#00ffff] rounded-xl shadow-[0_0_50px_rgba(0,255,255,0.5)]">
          <p class="text-[#ff00ff] text-5xl font-black italic tracking-widest font-mono drop-shadow-[0_0_15px_rgba(255,0,255,1)]">[ VIDEO ASSET HERE ]</p>
          <p class="text-[#00ffff] text-2xl font-mono mt-8 uppercase font-bold">> Click the car to return <</p>
        </div>
      </Html>
    </TresMesh>
    
    <!-- Neon Lighting for Screen Area -->
    <TresPointLight :position="[-5, 2, 0] as any" color="#ff00ff" :intensity="20" :distance="30" />
    <TresPointLight :position="[0, -2, 0] as any" color="#00ffff" :intensity="10" :distance="20" />
  </TresGroup>

  <!-- Post-processing -->
  <Suspense>
    <EffectComposerPmndrs>
      <ChromaticAberrationPmndrs :offset="[0.003, 0.003] as any" />
      <NoisePmndrs :premultiply="true" />
    </EffectComposerPmndrs>
  </Suspense>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, watch, ref } from 'vue';
import { EffectComposerPmndrs, ChromaticAberrationPmndrs, NoisePmndrs } from '@tresjs/post-processing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PerspectiveCamera } from 'three';
import { useLoop } from '@tresjs/core';
import { GLTFModel, Html } from '@tresjs/cientos';
import { Box3, Vector3 } from 'three';
import { globalState } from '../state';

const baseUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

const cameraRef = shallowRef<PerspectiveCamera | null>(null);
const deloreanRef = shallowRef<any>(null);
const fireTrailsRef = shallowRef<any>(null);
const fireMatLeftRef = shallowRef<any>(null);
const fireMatRightRef = shallowRef<any>(null);
const arrivalFireTrailsRef = shallowRef<any>(null);
const arrivalFireMatLeftRef = shallowRef<any>(null);
const arrivalFireMatRightRef = shallowRef<any>(null);
const hoverboardGroupRef = shallowRef<any>(null);
const hoverboardMeshRef = shallowRef<any>(null);
const overloadLightRef = shallowRef<any>(null);
const easterEggWrapperRef = shallowRef<any>(null);
const isScreenVisible = ref(false);

const onCarClick = () => {
  if (easterEggWrapperRef.value && !gsap.isTweening(easterEggWrapperRef.value.position) && !globalState.isEasterEggActive) {
    globalState.isDriveInMode = !globalState.isDriveInMode;
  }
};

let scrollTimeline: gsap.core.Timeline | null = null;
let isCentered = false;
let baseHeight = 0;

const { onBeforeRender } = useLoop();
onBeforeRender(({ elapsed }: { elapsed: number }) => {
  if (deloreanRef.value) {
    // 1. Center the model dynamically on the first valid frame
    if (!isCentered) {
      const box = new Box3().setFromObject(deloreanRef.value);
      if (!box.isEmpty() && box.max.x !== Infinity) {
        const center = box.getCenter(new Vector3());
        
        // Offset the group to center X and Z
        deloreanRef.value.position.x = -center.x;
        deloreanRef.value.position.z = -center.z;
        
        // Place the bottom of the wheels precisely on the ground (Y = 0)
        baseHeight = -box.min.y - 0.5;
        deloreanRef.value.position.y = baseHeight;
        
        isCentered = true;
      }
    }

    // 2. Apply hover effect on top of the calculated base height
    if (isCentered) {
      deloreanRef.value.position.y = baseHeight + (Math.sin(elapsed * 2) * 0.05);
    }
  }

  // 3. Apply hoverboard animation
  if (hoverboardGroupRef.value && hoverboardMeshRef.value) {
    // Bobbing up and down around baseline Y=1.5
    hoverboardGroupRef.value.position.y = 1.5 + Math.sin(elapsed * 2) * 0.2;
    // Spinning slowly on Y
    hoverboardMeshRef.value.rotation.y = elapsed * 0.5;
    // Slight tilt on Z
    hoverboardMeshRef.value.rotation.z = Math.sin(elapsed * 1.5) * 0.1;
  }
});

onMounted(() => {
  setTimeout(() => {
    if (!cameraRef.value) return;
    
    const camera = cameraRef.value;

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#app-scroll-viewport',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // Ensure camera always looks at the car body
    scrollTimeline.eventCallback('onUpdate', () => {
      camera.lookAt(0, 1, 0);
    });

    // 1. Initial State -> About Me (Swoop low towards driver side door)
    scrollTimeline.to(camera.position, {
      x: 0,
      y: 2.5,
      z: 7.5,
      ease: 'power2.inOut',
    }, 0);

    // 2. About Me -> Projects Top (Sweep to front view of the car)
    scrollTimeline.to(camera.position, {
      x: 6,
      y: 4,
      z: 3,
      ease: 'power2.inOut',
    }, 1);

    // 3. Projects Top -> Projects Bottom (Orbit to rear thrusters over 1 screen)
    scrollTimeline.to(camera.position, {
      x: -7,
      y: 3.5,
      z: -6,
      ease: 'power2.inOut',
    }, 2);

    // 4. Contact & Departure! (Driving forward along -X as contact form reveals)
    scrollTimeline.to(deloreanRef.value.position, {
      x: -40,
      ease: 'power3.in',
    }, 3);
    
    // Scale fire trails along X as car drives away
    scrollTimeline.to(fireTrailsRef.value.scale, {
      x: 1,
      ease: 'power3.in',
    }, 3);

    // Fade in the fire trails
    scrollTimeline.to([fireMatLeftRef.value, fireMatRightRef.value], {
      opacity: 0.9,
      ease: 'power3.in',
    }, 3);

    // Make the camera watch the car speed away
    scrollTimeline.to(camera.position, {
      x: -8,
      y: 4,
      z: 10,
      ease: 'power2.inOut',
    }, 3);

    // Ensure camera always looks at the car body
    scrollTimeline.eventCallback('onUpdate', () => {
      camera.lookAt(0, 1, 0);
    });
    
    // Initial look at
    camera.lookAt(0, 1, 0);

    // --- Camera Hijack Logic for Expanded Panel ---
    let preHijackPos = { x: 0, y: 0, z: 0 };
    const currentLookAt = { x: 0, y: 1, z: 0 }; // Track current look target for smooth rotation
    
    watch(() => globalState.isAboutExpanded, (expanded) => {
      if (expanded) {
        // Save current position
        preHijackPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
        
        const isMobile = window.innerWidth < 768;
        // Position camera behind the hoverboard (x: 15) to see the DeLorean (x: 0)
        // Raised Y to 3.5 for a "from the top" perspective.
        // Mobile looks steeply down (-7.6) to push subjects to the top 50% of the screen.
        // Desktop looks moderately down (-2.4) to vertically balance subjects.
        const camTargetPos = isMobile ? { x: 19.5, y: 3.5, z: 0 } : { x: 19.5, y: 3.5, z: -2 };
        const camLookTarget = isMobile ? { x: 0, y: -7.6, z: 0 } : { x: 0, y: -2.4, z: -2 };
        
        // Fly camera to the dedicated Hoverboard Zone
        gsap.to(camera.position, {
          x: camTargetPos.x, 
          y: camTargetPos.y, 
          z: camTargetPos.z,
          duration: 1.5,
          ease: 'power3.inOut',
        });

        // Smoothly rotate the camera instead of snapping
        gsap.to(currentLookAt, {
          x: camLookTarget.x,
          y: camLookTarget.y,
          z: camLookTarget.z,
          duration: 1.5,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
          }
        });
      } else if (!globalState.isDriveInMode) { // Ensure we don't return if switching modes
        // Return camera to exact timeline position
        gsap.to(camera.position, {
          x: preHijackPos.x,
          y: preHijackPos.y,
          z: preHijackPos.z,
          duration: 1.2,
          ease: 'power3.inOut',
        });

        // Return rotation to original timeline state
        gsap.to(currentLookAt, {
          x: 0,
          y: 1,
          z: 0,
          duration: 1.2,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
          }
        });
      }
    });

    // --- Camera & Car Hijack Logic for Drive-In Mode ---
    const camState = { blend: 0 };
    
    watch(() => globalState.isDriveInMode, (isDriveIn) => {
      if (isDriveIn) {
        isScreenVisible.value = true;
        preHijackPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
        camState.blend = 0;
        
        const startLookX = currentLookAt.x;
        const startLookY = currentLookAt.y;
        const startLookZ = currentLookAt.z;

        const updateCameraGTA = () => {
          if (!camera || !easterEggWrapperRef.value || globalState.isAboutExpanded) return;
          
          const carPos = easterEggWrapperRef.value.position;
          const carRotY = easterEggWrapperRef.value.rotation.y;
          
          const distance = 15;
          const height = 5;
          
          const gtaCamX = carPos.x + Math.cos(carRotY) * distance;
          const gtaCamZ = carPos.z - Math.sin(carRotY) * distance;
          const gtaCamY = carPos.y + height;
          
          const gtaLookX = carPos.x;
          const gtaLookY = carPos.y + 2;
          const gtaLookZ = carPos.z;

          if (camState.blend < 1) {
             camera.position.set(
               preHijackPos.x + (gtaCamX - preHijackPos.x) * camState.blend,
               preHijackPos.y + (gtaCamY - preHijackPos.y) * camState.blend,
               preHijackPos.z + (gtaCamZ - preHijackPos.z) * camState.blend
             );
             currentLookAt.x = startLookX + (gtaLookX - startLookX) * camState.blend;
             currentLookAt.y = startLookY + (gtaLookY - startLookY) * camState.blend;
             currentLookAt.z = startLookZ + (gtaLookZ - startLookZ) * camState.blend;
             camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
          } else {
             camera.position.set(gtaCamX, gtaCamY, gtaCamZ);
             currentLookAt.x = gtaLookX;
             currentLookAt.y = gtaLookY;
             currentLookAt.z = gtaLookZ;
             camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
          }
        };

        const tl = gsap.timeline({ onUpdate: updateCameraGTA });

        // 1. Blend Camera In
        tl.to(camState, { blend: 1, duration: 1.5, ease: 'power2.inOut' }, 0);

        // 2. Drive to Screen (Perfect Circular Arcs)
        // Leg 1: Drive straight to x: -10
        tl.to(easterEggWrapperRef.value.position, { x: -10, duration: 1, ease: 'power2.in' }, "leg1");
        
        // Corner 1: Arc from (-10, 0) to (-20, -10). Rotates to -90 deg.
        tl.to(easterEggWrapperRef.value.position, { x: -20, duration: 1, ease: 'sine.out' }, "corner1");
        tl.to(easterEggWrapperRef.value.position, { z: -10, duration: 1, ease: 'sine.in' }, "corner1");
        tl.to(easterEggWrapperRef.value.rotation, { y: -Math.PI / 2, duration: 1, ease: 'none' }, "corner1");
        
        // Leg 2: Drive straight to z: -30
        tl.to(easterEggWrapperRef.value.position, { z: -30, duration: 1, ease: 'none' }, "leg2");
        
        // Corner 2: Arc from (-20, -30) to (-10, -40). Rotates to -180 deg.
        tl.to(easterEggWrapperRef.value.position, { x: -10, duration: 1, ease: 'sine.in' }, "corner2");
        tl.to(easterEggWrapperRef.value.position, { z: -40, duration: 1, ease: 'sine.out' }, "corner2");
        tl.to(easterEggWrapperRef.value.rotation, { y: -Math.PI, duration: 1, ease: 'none' }, "corner2");
        
        // Leg 3: Drive straight and park at x: 5
        tl.to(easterEggWrapperRef.value.position, { x: 5, duration: 1.5, ease: 'power2.out' }, "leg3");

      } else {
        globalState.isDriveInReturning = true;
        
        const updateCameraGTAReturn = () => {
          if (!camera || !easterEggWrapperRef.value || globalState.isAboutExpanded) return;
          
          const carPos = easterEggWrapperRef.value.position;
          const carRotY = easterEggWrapperRef.value.rotation.y;
          
          const distance = 15;
          const height = 5;
          
          const gtaCamX = carPos.x + Math.cos(carRotY) * distance;
          const gtaCamZ = carPos.z - Math.sin(carRotY) * distance;
          const gtaCamY = carPos.y + height;
          
          const gtaLookX = carPos.x;
          const gtaLookY = carPos.y + 2;
          const gtaLookZ = carPos.z;

          if (camState.blend > 0) {
             camera.position.set(
               preHijackPos.x + (gtaCamX - preHijackPos.x) * camState.blend,
               preHijackPos.y + (gtaCamY - preHijackPos.y) * camState.blend,
               preHijackPos.z + (gtaCamZ - preHijackPos.z) * camState.blend
             );
             currentLookAt.x = 0 + (gtaLookX - 0) * camState.blend;
             currentLookAt.y = 1 + (gtaLookY - 1) * camState.blend;
             currentLookAt.z = 0 + (gtaLookZ - 0) * camState.blend;
             camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
          } else {
             camera.lookAt(0, 1, 0);
          }
        };

        const tl = gsap.timeline({ onUpdate: updateCameraGTAReturn });

        // Phase 3: Return to origin (Perfect Circular Arcs)
        // Leg 4: Drive straight to x: 15
        tl.to(easterEggWrapperRef.value.position, { x: 15, duration: 1, ease: 'power2.in' }, "leg4");
        
        // Corner 3: Arc from (15, -40) to (25, -30). Rotates to -270 deg.
        tl.to(easterEggWrapperRef.value.position, { x: 25, duration: 1, ease: 'sine.out' }, "corner3");
        tl.to(easterEggWrapperRef.value.position, { z: -30, duration: 1, ease: 'sine.in' }, "corner3");
        tl.to(easterEggWrapperRef.value.rotation, { y: -Math.PI * 1.5, duration: 1, ease: 'none' }, "corner3");
        
        // Leg 5: Drive straight to z: -10
        tl.to(easterEggWrapperRef.value.position, { z: -10, duration: 1, ease: 'none' }, "leg5");
        
        // Corner 4: Arc from (25, -10) to (15, 0). Rotates to -360 deg.
        tl.to(easterEggWrapperRef.value.position, { x: 15, duration: 1, ease: 'sine.in' }, "corner4");
        tl.to(easterEggWrapperRef.value.position, { z: 0, duration: 1, ease: 'sine.out' }, "corner4");
        tl.to(easterEggWrapperRef.value.rotation, { y: -Math.PI * 2, duration: 1, ease: 'none' }, "corner4");
        
        // Leg 6: Drive straight and park at x: 0
        tl.to(easterEggWrapperRef.value.position, { x: 0, duration: 1.5, ease: 'power2.out' }, "leg6");
        
        // Blend the camera back to scroll state as it parks
        tl.to(camState, { blend: 0, duration: 1.5, ease: 'power2.inOut' }, "leg6");
        
        // Hide screen after animation is fully complete and normalize rotation
        tl.call(() => {
          isScreenVisible.value = false;
          globalState.isDriveInReturning = false;
          if (easterEggWrapperRef.value) {
            // Reset rotation from -2PI to 0 to prevent 270-degree spin on next drive
            easterEggWrapperRef.value.rotation.y = 0;
          }
        }, undefined, 5.0);
      }
    });

    // --- Easter Egg Logic: Temporal Displacement ---
    watch(() => globalState.isEasterEggActive, (active) => {
      if (active) {
        // Ramp up the blinding overload light
        gsap.to(overloadLightRef.value, { intensity: 100, duration: 1.5, ease: 'power2.in' });
        
        // While the user is completely blinded by the opaque UI, preemptively move 
        // the wrapper to x=40 so it doesn't flicker when the scroll snaps to 0.
        setTimeout(() => {
          if (easterEggWrapperRef.value) {
            easterEggWrapperRef.value.position.x = 40;
          }
        }, 1500);
      } else {
        // Reset light instantly when flash is over
        overloadLightRef.value.intensity = 0;
        
        // Drive in from the right (opposite of departure)
        if (easterEggWrapperRef.value) {
          gsap.to(easterEggWrapperRef.value.position, {
            x: 0,
            duration: 1.5,
            ease: 'power3.out', // Fast in, slow down to a stop
          });
          
          // Animate arrival fire trails perfectly synced with the car
          if (arrivalFireTrailsRef.value && arrivalFireMatLeftRef.value && arrivalFireMatRightRef.value) {
            arrivalFireTrailsRef.value.scale.x = 0.001;
            arrivalFireMatLeftRef.value.opacity = 0.9;
            arrivalFireMatRightRef.value.opacity = 0.9;
            
            // 1. Scale the trail as the car moves
            gsap.to(arrivalFireTrailsRef.value.scale, {
              x: 1,
              duration: 1.5,
              ease: 'power3.out',
            });
            
            // 2. Fade the fire trails out slowly after the car arrives
            gsap.to([arrivalFireMatLeftRef.value, arrivalFireMatRightRef.value], {
              opacity: 0,
              duration: 3,
              delay: 1.5,
              ease: 'power2.out',
            });
          }
        }
      }
    });

  }, 100);
});

onUnmounted(() => {
  if (scrollTimeline) {
    scrollTimeline.scrollTrigger?.kill();
    scrollTimeline.kill();
  }
});
</script>
