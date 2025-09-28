<script setup lang="ts">
import type { AppLink } from '@/types/state';

const { link } = defineProps<{ link: AppLink }>();
</script>

<template>
    <UCard as="a" :href="link.href" target="_blank" variant="soft" class="hover:bg-elevated transition-colors duration-200">
        <div class="flex items-center gap-4">
            <UIcon :name="link.icon" class="size-6"/>

            <div class="flex flex-col w-full">
                <div class="title text-lg">{{ link.title }}</div>
                <div v-if="link.description" class="description text-muted">{{ link.description }}</div>
            </div>
        </div>
    </UCard>
</template>