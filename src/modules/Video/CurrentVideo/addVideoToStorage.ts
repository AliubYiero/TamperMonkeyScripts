import { getVideoId } from './getVideoId.ts';
import {
	useWatchedVideoIdListStorage,
} from '../../../utils/Storage/useWatchedVideoIdListStorage.ts';

/**
 * 将当前视频添加到本地储存
 * */
export const addVideoToStorage = () => {
	const videoId = getVideoId();
	useWatchedVideoIdListStorage.add( videoId );
};
