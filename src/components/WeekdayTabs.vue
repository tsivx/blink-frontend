<script setup lang="ts">
import { djs } from '@/utils/dayjs';
import type { TabsItem } from '@nuxt/ui';
import { computed } from 'vue';

interface WeekdayTabItem {
    weekday: number,
    weekdayString: string,
    weekdayStringShort: string,
    day: string,
    fullDate: string,
}

interface WeekdayTabsProps {
    dateEnd: string,
    dateStart: string,
}

const props = defineProps<WeekdayTabsProps>()
const currentIdx = defineModel<string>();

const items = computed((): TabsItem[] => {
  const start = djs(props.dateStart);
  const end = djs(props.dateEnd);

  const days: WeekdayTabItem[] = [];

  for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
    days.push({
      weekday: d.day() + 1,
      weekdayString: d.format('dddd'),
      weekdayStringShort: d.format('dd'),
      day: d.format('D'),
      fullDate: d.format('YYYY-MM-DD'),
    });
  }

  return days;
});
</script>

<template>
    <UTabs
        size="xl"
        variant="link"
        color="neutral"
        default-value="2"
        v-model="currentIdx"
        :unmount-on-hide="true"
        :items="items"
        :ui="{ trigger: 'grow', list: 'bg-elevated/50 rounded-lg' }"
        class="w-full"
    >
        <template #content>
            <slot />
        </template>

        <template #default="{ item }">
            <div class="flex flex-col">
                <div class="weekday">{{ item.weekdayStringShort }}</div>
                <div class="day">{{ item.day }}</div>
            </div>
        </template>
    </UTabs>
</template>