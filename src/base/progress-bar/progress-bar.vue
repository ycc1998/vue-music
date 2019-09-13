<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from '@/common/js/dom'

  const progressBtnWidth = 16  //小圆点宽度
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
    //触摸开始
      progressTouchStart(e) {
        this.touch.initiated = true
        //触摸开始的x轴位置 从最左边计算
        this.touch.startX = e.touches[0].pageX
        //当前进度条的宽度
        this.touch.left = this.$refs.progress.clientWidth
      },
      //触摸中
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        //当前触摸点的位置减去触摸开始的位置
        const deltaX = e.touches[0].pageX - this.touch.startX
        //总宽度减去小球宽度  求出最新进度条宽度
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      //触摸结束
      progressTouchEnd() {
        this.touch.initiated = false
        this._triggerPercent()
      },
      //点击改变进度
      progressClick(e) {
      //返回该元素距离上下左右的宽度
        const rect = this.$refs.progressBar.getBoundingClientRect()
        //当前点击的x轴位置 减去 该元素最左边距离屏幕最左边的距离 算出进度条应在那个位置
        const offsetWidth = e.pageX - rect.left
        //改变进度条位置
        this._offset(offsetWidth)
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
        // this._offset(e.offsetX)
        this._triggerPercent()
      },
      //返回父组件数据
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      _offset(offsetWidth) {
        //改变进度条的宽度
        this.$refs.progress.style.width = `${offsetWidth}px`
        //改变小球的偏移
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch: {
    //算出当前进度的宽度
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
        //获得进度条总宽度
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        //获得当前进度百分比
          const offsetWidth = newPercent * barWidth
        //改变进度条长度
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>