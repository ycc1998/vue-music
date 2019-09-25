<template>
	<div class="rank">
		<scroll class="toplist" :data="TopList">
			<ul>
				<li class="item" v-for="items in TopList" @click="selectItem(items)">
					<div class="icon">
						<img width="100"  height="100" v-lazy="items.picUrl" />
					</div>
					<ul class="songlist">
						<li class="song" v-for="(item,index) in items.songList">
							<span>{{index+1}}</span>
							<span>{{item.songname}}-{{item.singername}}</span>
						</li>
					</ul>
				</li>
			</ul>
			<div class="loading-container" v-show="!TopList.length">
        <loading></loading>
      </div>
		</scroll>
		<router-view></router-view>
	</div>
  
</template>

<script>
import {getTopList} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import {mapMutations} from 'vuex'

export default{
	data(){
		return {
			TopList:[]
		}
	},
	created(){
		this._getTopList();
	},
	methods:{
		_getTopList(){
			getTopList().then((res) => {
				if (res.code === ERR_OK) {
            this.TopList = res.data.topList
          }
			})
		},
		selectItem(item) {
			console.log(item)
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
	},
	
	components: {
    Loading,
    Scroll
  }

};

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
