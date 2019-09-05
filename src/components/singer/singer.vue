<template>
	<div class="singer">
		<listview :data="singer" @select="selectSinger"></listview>
    <router-view></router-view>
	</div>
  
</template>

<script>
import {getSingerList, getSingerDetail} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import singer from '@/common/js/singer'
import listview from "@/base/listview/listview"
import { mapMutations } from 'vuex'

const HOT_SINGER_LEN = 10
 const HOT_NAME = '热门'

export default{
	data(){
		return {
			singer:[]
		}
	},
	created(){
		this._getSingerList()
	},
	methods:{
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
		_getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singer = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list){
    	let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };

      //循环数组 先push热门数据，在判断map中是否有key 
      list.forEach((item, index) => {
      	if(index < HOT_SINGER_LEN){
      		map.hot.items.push(new singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
      	}

      	const key = item.Findex
      	if(!map[key]){
      		//判断是否为字母
	      	if (key.match(/[a-zA-Z]/)) {
	      		map[key] = {
		          title: key,
		          items: []
		        }
	      	}else{
	      		map[key] = {
		          title: '#',
		          items: []
		        }
	      	}
      		
      	}      	

      	//new singer 返回处理好的数据
      	map[key].items.push(new singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }));

      });

      // 为了得到有序列表，我们需要处理 map
        let ret = [] //字母
        let hot = [] //热门
        let te = [] //非字母

        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }else{
          	te.push(val)
          }
        }

        //排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(ret,te);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
	},
	components:{
		listview
	}
};

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
