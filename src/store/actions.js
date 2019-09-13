import * as types from './mutation-types'

export const selectPlay = function({commit,state},{list,index,mode=0}){
	commit(types.SET_SEQUENCE_LIST,list)//歌曲顺序列表
	commit(types.SET_PLAYLIST,list)//播放列表
	commit(types.SET_CURRENT_INDEX,index)//索引下标
	commit(types.SET_FULL_SCREEN,true)//全屏/小屏
	commit(types.SET_PLAYING_STATE,true) //播放/暂停
	commit(types.SET_PLAY_MODE,mode) //播放模式
}