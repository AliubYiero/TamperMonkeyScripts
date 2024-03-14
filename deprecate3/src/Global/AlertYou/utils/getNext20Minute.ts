/**
 * 获取下一个整数20分钟的时间
 * @example 现在 7:07 ; getNext20Minute() => 20
 * @example 现在 7:47 ; getNext20Minute() => 60
 * */
export const getNext20Minute = () => Math.ceil( ( new Date().getMinutes() ) / 20 ) * 20;
