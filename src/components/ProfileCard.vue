<script setup lang="ts">
import type { Profile } from '@/types/state';
import { profileKeyMap } from '@/utils/helpers';

const { profile } = defineProps<{ profile: Profile }>();
</script>


<template>
    <UCard variant="soft">
        <div class="flex items-center gap-4">
            <UAvatar size="2xl" :icon="profileKeyMap[profile.type].icon" />

            <div class="flex flex-col">
                <div class="type text-muted text-xs">
                    {{ profileKeyMap[profile.type].label }}
                    <span v-if="profile.meta.course">• {{ profile.meta.course }} курс</span>
                </div>
                <div class="name text-lg font-bold">{{ profile.name }}</div>
                <div v-if="profile.meta.description" class="description text-muted">{{ profile.meta.description }}</div>
            </div>
        </div>
    </UCard>
</template>