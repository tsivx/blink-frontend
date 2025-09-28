<script setup lang="ts">
import { onMounted } from 'vue';
import { useState } from './stores/state';
import { djs } from './utils/dayjs';

const state = useState();

onMounted(async () => {
  await state.init();
});
</script>

<template>
  <UApp>
    <div class="flex flex-col justify-center h-screen w-screen gap-2 p-2">
      <div class="flex items-center justify-between text-sm text-muted">
        <div class="blink flex items-center gap-1">
          <UIcon name="i-lucide-graduation-cap" class="size-5" />
          <span>блинк</span>
        </div>
        <div class="date">
          {{ djs().format('D MMMM, dddd') }}
        </div>
      </div>


      <div class="main flex-1 w-full overflow-auto">
        <RouterView /> 
      </div>
    </div>
  </UApp>
</template>
