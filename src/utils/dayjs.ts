import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.locale('ru');
dayjs.extend(customParseFormat);

export const dateToISO = (date: string): string => {
    return dayjs(date, 'D-MM-YYYY').format();
};

export const djs = dayjs;