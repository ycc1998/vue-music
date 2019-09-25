import * as types from './mutation-types'

const matutaions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },



  //播放/暂停
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },

//全屏/小屏
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },

  //播放列表
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },

    //歌曲顺序列表
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },

  //播放模式，默认顺序播放
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },

  //索引下标
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  //音乐播放请求key
  setVkey(state, key) {
    state.vkey = key
  }
}

export default matutaions