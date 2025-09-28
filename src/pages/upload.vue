<script setup lang="ts">
import type { ATimetableList } from '@/types/avtor';
import type { State } from '@/types/state';
import { dateToISO } from '@/utils/dayjs';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Octokit } from '@octokit/rest';
import { Base64 } from 'js-base64';

const toast = useToast();
const file = ref(null);
const password = ref<string>()

onMounted(() => {
    const githubToken = localStorage.getItem('githubToken')
    if (githubToken) {
        password.value = githubToken;
    }
});

interface UpdateStateRequest {
    password: string,
    state: State,
    timetableList: ATimetableList,
}

interface UploadStateParams {
    githubToken: string,
    newState: State,
}

const uploadState = async (uploadParams: UploadStateParams) => {
    const octokit = new Octokit({ auth: uploadParams.githubToken });

    const owner = "tsivx";
    const repo = "blink-frontend";
    const path = "public/api/v1/state.json";

    const { data: file } = await octokit.repos.getContent({
        owner,
        repo,
        path,
    });

    const { data } = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: "update state.json",
        content: Base64.encode(JSON.stringify(uploadParams.newState, null, 2)),
        sha: Array.isArray(file) ? file[0].sha : file.sha,
    });

    console.log(data);
};

const updateState = async (updateStateRequest: UpdateStateRequest) => {
    updateStateRequest.state.lessons = [];

    for (const timetableInstance of updateStateRequest.timetableList) {
        for (const timetable of timetableInstance.timetable) {
            updateStateRequest.state.week = {
                number: timetable.week_number,
                dateStart: dateToISO(timetable.date_start),
                dateEnd: dateToISO(timetable.date_end),
            };

            for (const group of timetable.groups) {
                if (!updateStateRequest.state.profiles.find(p => p.name === group.group_name)) {
                    updateStateRequest.state.profiles.push({
                        type: 'group',
                        name: group.group_name,
                        meta: { course: group.course },
                    });
                }

                for (const day of group.days) {
                    if (!day.lessons) continue;

                    for (const lesson of day.lessons) {
                        for (const teacher of lesson.teachers) {
                            if (!updateStateRequest.state.profiles.find(p => p.name === teacher.teacher_name)) {
                                updateStateRequest.state.profiles.push({
                                    type: 'teacher',
                                    name: teacher.teacher_name,
                                    meta: {},
                                });
                            }
                        }

                        for (const auditory of lesson.auditories) {
                            if (!updateStateRequest.state.profiles.find(p => p.name === auditory.auditory_name)) {
                                updateStateRequest.state.profiles.push({
                                    type: 'auditory',
                                    name: auditory.auditory_name,
                                    meta: {},
                                });
                            }
                        }

                        updateStateRequest.state.lessons.push({
                            date: dateToISO(lesson.date),
                            week: updateStateRequest.state.week.number,
                            weekday: day.weekday,
                            subject: lesson.subject,
                            subgroup: lesson.subgroup,
                            number: lesson.time,
                            timeStart: lesson.time_start,
                            timeEnd: lesson.time_end,
                            group: group.group_name,
                            teacher: lesson.teachers[0].teacher_name,
                            auditory: lesson.auditories[0].auditory_name,
                        });
                    }
                }
            }
        }
    }

    const newState = updateStateRequest.state;
    await uploadState({ githubToken: updateStateRequest.password, newState });
}

const onUpload = () => {
    if (file) {
        const reader = new FileReader();

        reader.onloadend = async (ev: ProgressEvent<FileReader>) => {
            try {
                const { data: state } = await axios.get<State>('/api/v1/state.json');
                const timetable = JSON.parse(ev.target?.result as string) as ATimetableList

                await updateState({ state, timetableList: timetable, password: password.value! });

                toast.add({
                    title: 'супер! расписание обновлено',
                    description: 'осталось только обновить страницу',
                    actions: [{
                        label: 'обновить',
                        onClick: () => { location.reload() }
                    }],
                });
            } catch (error) {
                console.error(error);
                toast.add({
                    title: 'произошла ошибка :с',
                    description: 'нажми F12, перейди в console и сообщи об ошибке которая там появилась',
                    color: 'error'
                });
            }
        }

        reader.readAsText(file.value!, 'utf-8');
    }
};
</script>

<template>
    <div class="flex flex-col gap-2 p-2">
        <UFileUpload v-model="file" accept="application/json" color="neutral" icon="i-lucide-calendar"
            label="нажми или брось файл сюда" description="экспортированный файл с программы AVTOR в формате JSON"
            class="cursor-pointer" />

        <UInput type="password" placeholder="пароль" v-model="password" />

        <div class="flex items-center justify-center gap-2">
            <UButton to="/" label="назад" icon="i-lucide-arrow-left" color="neutral" variant="soft" />
            <UButton to="https://tsivx.t.me" label="сообщить об ошибке" color="info" variant="soft" />
            <UButton :disabled="!file || !password" @click="onUpload" label="обновить" color="success" variant="soft" />
        </div>
    </div>
</template>