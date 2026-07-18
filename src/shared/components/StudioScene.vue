<template>
  <TresCanvas 
    clear-color="#0b0b0b" 
    window-size 
    power-preference="high-performance"
    :alpha="false"
  >
    <Suspense>
      <SceneContent />
    </Suspense>
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import SceneContent from './SceneContent.vue';
</script>
