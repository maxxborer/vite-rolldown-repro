import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useClock() {
  const now = ref(new Date());
  let timer;
  onMounted(() => { timer = setInterval(() => { now.value = new Date(); }, 30_000); });
  onBeforeUnmount(() => clearInterval(timer));
  return now;
}
