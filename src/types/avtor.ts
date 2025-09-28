export type ATimetableList = ATimetableInstance[];

export interface ATimetableInstance {
    timetable: ATimetable[];
}

export interface ATimetable {
    week_number: number;
    date_start: string;
    date_end: string;
    groups: AGroup[];
}

export interface AGroup {
    group_name: string;
    course: number;
    faculty: string;
    changes: number;
    days: ADay[];
}

export interface ADay {
    weekday: number;
    lessons?: ALesson[];
}

export interface ALesson {
    subject: string;
    type: string;
    subgroup: number;
    time_start: string;
    time_end: string;
    time: number;
    week: number;
    date: string;
    teachers: ATeacher[];
    auditories: AAuditory[];
    Lesson_ID_Num: string;
}

export interface ATeacher {
    teacher_post: string;
    teacher_name: string;
    teacher_id: string;
}

export interface AAuditory {
    auditory_name: string;
}