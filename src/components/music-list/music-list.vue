<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" ref="play" v-show="songs.length>0" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll 
    class="list" 
    :data="songs"
    :probeType="probeType"
    :listenScroll="listenScroll"
    @scroll="scroll"
    ref="list"
    >
      <div class="song-list-wrapper"> 
        <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
      </div>
      <div  v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    
  </div>
</template>

<script type="text/ecmascript-6">
import songList from '@/base/song-list/song-list'
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'

import {prefixStyle} from '@/common/js/dom'
import { mapActions } from 'vuex'
import {playMode} from '@/common/js/config'

const RESERVED_HEIGHT = 40
  export default {
    props:{
      bgImage:{
        type:String,
        default:''
      },
      songs:{
        type:Array,
      },
      title:{
        type:String,
        default:''
      },
      rank:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        scrollY:0
      }
    },
    methods:{
      //随机播放全部
      random(){
        let index = Math.floor((Math.random() * this.songs.length))        
        this.selectPlay({
          list: this.songs,
          index,
          mode:playMode.random
        })
      },
      selectItem(item,index){
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      ...mapActions([
        'selectPlay' // 将 `this.selectPlay()` 映射为 `this.$store.dispatch('selectPlay')`
      ]),
      back() {
        this.$router.back()
      },
      scroll(pos){
        this.scrollY = pos.y
      }
    },
    watch:{
     scrollY(newY){
      console.log(newY)
      let tranlateY = Math.max(this.minTranslateY,newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      const percent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1+ percent
        zIndex = 10
      }else{
        blur = Math.min(20 * percent,20)
      }
      this.$refs.filter.style[`${prefixStyle('backdrop-filter')}`] = `blur(${blur}px)` //高斯模糊
      

      this.$refs.layer.style[`${prefixStyle('transform')}`] = `translate3d(0,${tranlateY}px,0)`  //偏移
      
      if(newY < this.minTranslateY){
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.play.style.display = 'none'
      }else{
        this.$refs.bgImage.style.paddingTop = `70%`
        this.$refs.bgImage.style.height = 0
        this.$refs.play.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style[`${prefixStyle('transform')}`] = `scale(${scale})` //放大

     } 
    },
    computed:{
      bgStyle(){
        return `background-image:url(${this.bgImage})`;
      }
    },
    created(){
      this.probeType = 3
      this.listenScroll = true
    },
    mounted(){
      //根据不同浏览器显示不同高度  图片根据宽度决定高度
      this.imageHeight = this.$refs.bgImage.clientHeight;//图片高度
      this.minTranslateY = -this.imageHeight+RESERVED_HEIGHT;
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    components:{
      songList,
      scroll,
      loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
  
</style>