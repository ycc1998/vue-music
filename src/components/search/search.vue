<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box @query="onQueryChange" ref="searchBox"></search-box>
		</div>
		<div class="shortcut-wrapper" v-show="!query">
      <scroll :data="shortcut" class="shortcut" ref="shortcut">
  			<div >
  				<div class="hot-key">
  					<h1 class="title">热门搜索</h1>
  					<ul>
  						<li class="item" v-for="item in hotKey">
  							<span @click="addQuery(item.k)">{{item.k}}</span>
  						</li>
  					</ul>
  				</div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="_deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div>
  			</div>
      </scroll>
  	</div>
    
		<div class="search-result" v-show="query">
			<Suggest :query="query"></Suggest>
		</div>
    <confirm ref="confirm" @confirm="_clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
	</div>
  
</template>

<script>
import SearchBox from "@/base/search-box/search-box"
import {getHotKey} from "@/api/search.js"
import {ERR_OK} from '@/api/config'
import Suggest from "../suggest/suggest"
import {mapGetters, mapMutations, mapActions} from 'vuex'
import searchList from '@/base/search-list/search-list'
import Scroll from '@/base/scroll/scroll'
import Confirm from '@/base/confirm/confirm'

export default{
	data(){
		return {
			hotKey:[],
			query:''
		}
	},
	created(){
		this._getHotKey();
	},
	methods:{
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ]),
    //删除一条搜索记录
    _deleteSearchHistory(item){
      this.deleteSearchHistory(item)
    },
    
    showConfirm(){
      this.$refs.confirm.showFlag = true
    },
    //删除所有历史记录
    _clearSearchHistory(){
      this.clearSearchHistory()
    },
		onQueryChange(query){
			this.query = query
      //记录搜索
      if(query){
        this.saveSearchHistory(query)
      }

		},
		addQuery(query){
			this.$refs.searchBox.setQuery(query);
		},
		_getHotKey(){
			getHotKey().then(res=>{
				if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0,10)
          }
			})
		}
	},
  computed: {
    shortcut(){
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory',
    ]),
  },
	components:{
		SearchBox,
		Suggest,
    searchList,
    Scroll,
    Confirm
	},
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
};

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
