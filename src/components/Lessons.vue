<script setup lang="ts">
import type { Lesson, Profile } from '@/types/state';
import { djs } from '@/utils/dayjs';
import { profileKeyMap } from '@/utils/helpers';
import { computed } from 'vue';

const { lessons, profile, weekday } = defineProps<{ lessons: Lesson[], profile: Profile, weekday: number }>();

const items = computed(() => {
    const { lessonKey } = profileKeyMap[profile.type]!;

    const filteredLessons = lessons.filter((lesson) => {
        const matchProfile = lesson[lessonKey] === profile.name;
        const matchDay = lesson.weekday === weekday + 1;
        return matchProfile && matchDay;
    });

    const grouped: Lesson[] = [];

    filteredLessons.forEach((lesson) => {
        if (lesson.subgroup === 0) {
            grouped.push(lesson);
        } else {
            const existingLesson = grouped.find(
                (l) => l.number === lesson.number && l.date === lesson.date
            );

            if (existingLesson) {
                if (!existingLesson.subgroups) {
                    existingLesson.subgroups = [];
                }
                existingLesson.subgroups.push({
                    number: lesson.subgroup,
                    teacher: lesson.teacher,
                    auditory: lesson.auditory,
                    group: lesson.group,
                });
            } else {
                grouped.push({
                    ...lesson,
                    subgroups: [
                        {
                            number: lesson.subgroup,
                            teacher: lesson.teacher,
                            auditory: lesson.auditory,
                            group: lesson.group,
                        },
                    ],
                });
            }
        }
    });

    return grouped.sort((a, b) => a.number - b.number);
});

</script>

<template>
    <div class="flex flex-col gap-2">
        <div v-if="!items.length" class="h-full flex flex-col items-center">
            <div class="text-muted">занятий нет</div>
        </div>

        <div v-for="lesson of items" :key="lesson.number"
            class="lesson flex items-center gap-4 bg-elevated/50 py-3 px-4 rounded-lg">
            <div class="number text-lg font-bold">{{ lesson.number }}</div>

            <div class="flex flex-col gap-1">
                <div class="time text-muted text-xs">{{ lesson.timeStart }} - {{ lesson.timeEnd }}</div>
                <div class="subject">{{ lesson.subject }}</div>

                <div v-if="lesson.subgroups" class="flex flex-col gap-2">
                    <div v-for="subgroup of lesson.subgroups" class="flex flex-col gap-1">
                        <div class="text-xs text-muted">Подгруппа {{ subgroup.number }}</div>
                        <div class="blobs flex items-center gap-1 flex-wrap">
                            <UBadge color="neutral" variant="soft" :label="subgroup.group" />
                            <UBadge color="neutral" variant="soft" :label="subgroup.teacher" />
                            <UBadge color="neutral" variant="soft" :label="subgroup.auditory" />
                        </div>
                    </div>
                </div>

                <div v-else class="blobs flex items-center gap-1 flex-wrap">
                    <UBadge color="neutral" variant="soft" :label="lesson.group" />
                    <UBadge color="neutral" variant="soft" :label="lesson.teacher" />
                    <UBadge color="neutral" variant="soft" :label="lesson.auditory" />
                </div>
            </div>
        </div>
    </div>
</template>