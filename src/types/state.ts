export type ProfileType = 'group' | 'teacher' | 'auditory' | 'admin'; 

export interface Subgroup {
    number: number,
    group: string,
    teacher: string,
    auditory: string,
}

export interface Lesson {
    week: number,
    subject: string,
    number: number,
    date: string,
    weekday: number,
    subgroup: number,
    timeStart: string,
    timeEnd: string,
    teacher: string,
    group: string,
    auditory: string,
    subgroups?: Subgroup[]
}

export interface Profile {
    type: ProfileType,
    name: string,
    meta: {
        course?: number,
        fullName?: string,
        avatar?: string,
        description?: string
    },
}

export interface AppLink {
    title: string,
    description?: string,
    icon: string,
    href: string
}

export interface State {
    week: {
        number: number,
        dateStart: string,
        dateEnd: string,
    },

    lessons: Lesson[],
    profiles: Profile[],
    links: AppLink[],
}