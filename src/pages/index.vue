<script setup lang="ts">
import { useState } from '@/stores/state';
import { ref } from 'vue';
import type { Profile } from '@/types/state';

const state = useState();
const currentWeekday = ref<string>("0");
const currentProfile = ref<Profile>();
</script>

<template>
    <div v-if="state" class="flex flex-col gap-2">
        <ProfileSelectMenu :profiles="state.profiles" :is-loading="false" v-model="currentProfile" />

        <div v-if="currentProfile" class="flex flex-col gap-2">
            <ProfileCard :profile="currentProfile"  />
            <WeekdayTabs v-model="currentWeekday" :date-start="state.week.dateStart" :date-end="state.week.dateEnd">
                <Lessons :lessons="state.lessons" :profile="currentProfile" :weekday="+currentWeekday!" />
            </WeekdayTabs>
        </div>

        <div v-else class="flex flex-col gap-2">
            <LinkCard v-for="link in state.links" :link="link" />
        </div>
    </div>
</template>
