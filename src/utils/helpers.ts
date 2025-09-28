import type { ProfileType, Lesson } from "@/types/state";

export const profileKeyMap: Record<ProfileType, { label: string, icon: string, lessonKey: keyof Lesson }> = {
    group: { label: 'группа', icon: 'i-lucide-users', lessonKey: 'group' },
    teacher: { label: 'преподаватель', icon: 'i-lucide-user', lessonKey: 'teacher' },
    auditory: { label: 'аудитория', icon: 'i-lucide-map-pin', lessonKey: 'auditory', },
    admin: { label: 'вожак', icon: 'i-lucide-heart', lessonKey: 'group' },
}