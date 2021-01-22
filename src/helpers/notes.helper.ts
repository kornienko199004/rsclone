import moment from 'moment';

const getDayTitle = (): string => moment().format('MMMM Do, YYYY').toString();

// eslint-disable-next-line import/prefer-default-export
export { getDayTitle };
