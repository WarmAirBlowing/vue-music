<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
        <!-- 轮播图 -->
      </slot>
    </div>
    <div class="dots">
      <span 
        class="dot"
        v-for="(item,index) in dots"
        :key="index"
        :class="{active:currentPageIndex === index}"
      >
      </span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '../../common/js/dom'

export default {
  name: 'slider',
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    // 是否循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔时间
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        // 设置宽度
        child.style.width = sliderWidth + 'px'
        // 轮播总宽度（实例中是5，就是5倍大小）
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        // 如果是循环播放，在首尾各多一个，所以是本例中是（5+2）倍大小
        width += 2 * sliderWidth
      }
      // 设置轮播总宽度
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        // 横向滚动
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    },
    destroyed() {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/styles/variable"
  @import "../../common/styles/mixin"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      top: 130px
      text-align: center
      font-size: 0
      family()
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>