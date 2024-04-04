/**
 * 视频IdMap
 * key: 视频Id前缀 (有效id的第一位)
 * value: 视频Id集合
 * */
export type VideoIdMap = Map<string, Set<string>>;
