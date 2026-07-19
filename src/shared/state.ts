import { reactive } from 'vue';

export const globalState = reactive({
  isAboutExpanded: false,
  isEasterEggActive: false,
  isDriveInMode: false,
  isDriveInReturning: false,
});
