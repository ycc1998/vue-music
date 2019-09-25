import {playMode} from '@/common/js/config'
import {loadSearch, loadPlay, loadFavorite} from '@/common/js/cache'
const state = {
	singer: {},
	vkey:'', //音乐播放请求key
	playing:false,//播放/暂停
	fullScreen:false,//全屏/小屏
	playlist:[],//歌曲列表
	sequenceList:[],//歌曲顺序列表
	mode:playMode.sequence,//播放模式，默认顺序播放
	currentIndex:-1,//默认索引下标
	disc:{}, //歌单
	topList:{},
	searchHistory:loadSearch(),// 搜索记录
}

export default state