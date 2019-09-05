<template>
	<div class="list-view" >
		<scroll @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          :data="data"
          class="listview"
          ref="listview">
			<ul>
				<li  v-for="group in data" class="list-group" ref="listGroup">
					<h2 class="title">{{group.title}}</h2>
					<ul>
						<li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
	            <img class="avatar" v-lazy="item.avatar">
	            <span class="name">{{item.name}}</span>
	          </li>
					</ul>
				</li>
			</ul>
			<div class="loading-container" v-show="!data.length">
        <loading></loading>
      </div>

      <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
	      <ul>
	        <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex===index}">{{item}}
	        </li>
	      </ul>
	    </div>
	    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
		    <div class="fixed-title">{{fixedTitle}} </div>
		  </div>

		</scroll>
	</div>
</template>

<script>
import scroll from "@/base/scroll/scroll"
import loading from '@/base/loading/loading'
import {getData} from '@/common/js/dom'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

export default{
	created(){
		this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
	},
	data(){
		return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
	},
	props: {
    data: {
      type: Array,      
    }
  },
  computed: {
	  shortcutList() {
	    return this.data.map((group) => {
	      return group.title.substr(0, 1)
	    })
	  },
	  fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods:{
	  selectItem(item) {
      this.$emit('select', item)
    },
  	//点击
  	onShortcutTouchStart(e){
  	//target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口
  	let anchorIndex = getData(e.target,'index');
		this.touch.anchorIndex = anchorIndex
  	let firstTouch = e.touches[0];
  	this.touch.y1 = firstTouch.pageY;

		this._scrollTo(anchorIndex);

  	},
  	//滑动事件
  	onShortcutTouchMove(e){
	  	let firstTouch = e.touches[0];
	  	this.touch.y2 = firstTouch.pageY;
	  	let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
	  	let anchorIndex = parseInt(this.touch.anchorIndex)+parseInt(delta);
	  	this._scrollTo(anchorIndex);

  	},

  	_scrollTo(index){
  		if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
  		this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0);
  	},
  	_calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
  	scroll(pos) {  	
      this.scrollY = pos.y
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
    console.log(newY)
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          //console.log(this.currentIndex)
          this.diff = height2 + newY
          return
        }
      }

      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
	components:{
		scroll,
		loading
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
.list-view
		position: fixed
		width: 100%
		top: 88px
		bottom: 0	
		overflow: hidden
		.listview
			position: relative
			width: 100%
			height: 100%
			overflow: hidden
			background: $color-background
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
			.list-group
				padding-bottom: 30px;
				.title
					eight: 30px
					line-height: 30px
					padding-left: 20px
					font-size: 12px
					color: hsla(0,0%,100%,.5)
					background: #333
			.list-group-item
				display: flex
				align-items: center
				padding: 20px 0 0 30px
				.avatar
					width: 50px
					height: 50px
					border-radius: 50%
				.name
					margin-left: 20px
					color: hsla(0,0%,100%,.5)
					font-size: 14px
			.list-shortcut
				position: absolute
				z-index: 30
				right: 0
				top: 50%
				-webkit-transform: translateY(-50%)
				transform: translateY(-50%)
				width: 20px
				padding: 20px 0
				border-radius: 10px
				text-align: center
				background: rgba(0,0,0,.3)
				font-family: Helvetica
				.item
					padding: 3px
					line-height: 1
					color: hsla(0,0%,100%,.5)
					font-size: 12px
				.current
					color: $color-theme
			.list-fixed
				position: absolute
				top: 0
				left: 0
				width: 100%
				.fixed-title
					height: 30px
					line-height: 30px
					padding-left: 20px
					font-size: $font-size-small
					color: $color-text-l
					background: $color-highlight-background



</style>