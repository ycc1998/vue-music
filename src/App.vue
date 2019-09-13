<template>
	<div id="app">
		<Mheader/>
		<Tab/>
		<keep-alive>
			<router-view />
		</keep-alive>
		<Player></Player>
	</div>
  
</template>

<script>
import Mheader from './components/m-header/m-header';
import Tab from './components/tab/tab';
import Player from './components/player/player';
import { mapMutations } from 'vuex'
import {getSongVkey} from '@/api/recommend.js'

export default{
	components:{
		Mheader,
		Tab,
		Player
	},
	created(){
	//音乐播放请求key
		getSongVkey().then((res) => {
			let key = res.data.items[0].vkey;
			if(key){
				this.setVkey(key)
				console.log('vkey获取成功')
			}else{
				console.log('vkey获取失败')
			}
		})
	},
	methods:{
		...mapMutations([
	    'setVkey' 
	  ])
	}
	
};

</script>
<style lang="stylus">

</style>
