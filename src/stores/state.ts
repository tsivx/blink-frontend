import type { State } from "@/types/state";
import axios from "axios";
import { defineStore } from "pinia";

export const useState = defineStore('app', {
    state: (): State => ({
        week: { number: 0, dateStart: '', dateEnd: '' },
        lessons: [],
        profiles: [],
        links: [],
    }),

    actions: {
        async init() {
            const { data } = await axios.get('https://raw.githubusercontent.com/tsivx/blink-storage/refs/heads/main/v1/state.json');
            this.$state = data;
        }
    }
})