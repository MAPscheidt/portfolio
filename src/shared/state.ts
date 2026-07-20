import { reactive } from 'vue';

export const globalState = reactive({
  isAboutExpanded: false,
  isAboutReturning: false,
  isEasterEggActive: false,
  isDriveInMode: false,
  isDriveInReturning: false,
});
