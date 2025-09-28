<script setup lang="ts">
import type { Profile } from '@/types/state';
import type { SelectMenuItem } from '@nuxt/ui';
import { computed } from 'vue';

const { profiles, isLoading } = defineProps<{profiles: Profile[], isLoading: boolean}>();
const currentProfile = defineModel<Profile>();

const items = computed((): SelectMenuItem[] => {
    const selectMenuItems = profiles.map((p) => ({ label: p.name, value: p }));

    return [
        { type: 'label', label: 'группы' },
        ...selectMenuItems.filter((p) => p.value.type === 'group'),
        { type: 'separator' },

        { type: 'label', label: 'преподаватели' },
        ...selectMenuItems.filter((p) => p.value.type === 'teacher'),
        { type: 'separator' },

        { type: 'label', label: 'аудитории' },
        ...selectMenuItems.filter((p) => p.value.type === 'auditory'),
        { type: 'separator' },
    ]
})
</script>

<template>
    <div class="flex items-center gap-2">
        <USelectMenu
            class="w-full"
            variant="subtle"
            v-model="currentProfile"
            value-key="value"
            size="xl"
            :loading="isLoading"
            placeholder="поиск по группам, преподавателям, аудиториям..."
            :items="items"

            :search-input="{
                placeholder: 'например, Раемгулова или ТЭ-1-22...',
                icon: 'i-lucide-search'
            }"        
        />

        <UButton
            v-if="!!currentProfile"
            @click="currentProfile = undefined"
            icon="i-lucide-x"
            size="lg"
            color="neutral"
            variant="subtle"
            class="cursor-pointer bg-elevated/50"
        />
    </div>

</template>