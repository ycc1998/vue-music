<template>
	<transition name="slide">
		<music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import {getSingerDetail} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'

import musicList from '../music-list/music-list'

export default{
	data(){
		return {
			songs:[],
			id:''
		}
	},
	created(){
		this.id = this.$route.params.id
		this._getSingerDetail(this.id)
		
		//如果在歌手详情列表中刷新加返回到歌手列表
		if(!this.singer.name){
			this.$router.back()
		}
	},
	methods:{
		_getSingerDetail(id){
			getSingerDetail(id).then((res) => {
				if (res.code === ERR_OK) {
					console.log(res)
          this.songs = this._normalizeSongs(res.data.list)
        }else{
        	console.log('singer-detail获取数据失败')
        }
        console.log(this.songs)
			})
		},
		//数据处理
		_normalizeSongs(list){
			let ret = []
	      list.forEach((item) => {
	        let {musicData} = item
	        if (musicData.songid && musicData.albummid) {
	          ret.push(createSong(musicData,this.vkey))
	        }
	      })
	      return ret
		}
	},
	computed:{
		...mapGetters([
      'singer',
      'vkey'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
	      return this.singer.avatar
	    },
	},
	components:{
		musicList
	}
};

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

.slide-enter-active, .slide-leave-active
	transition: all 0.3s
.slide-enter, .slide-leave-to
	transform: translate3d(100%, 0, 0)
</style>
