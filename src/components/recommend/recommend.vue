<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommend.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommend" :key="item.id">
              <a :href="item.linkUrl">
                <img
                  @load="loadImage"
                  class="nedsclick"
                  :src="item.picUrl"
                  alt=""
                />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" @click="selectItem(item)" v-for="item in discList" :key="item.dissid">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.creator.name }}</h2>
                <p class="desc">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="hasDiscList">
          <loading></loading>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import Slider from "@/base/slider/slider";
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";
import { playlistMixin } from '@/common/js/mixin'

export default {
  mixins: [playlistMixin],
  components: {
    Slider,
    Scroll,
    Loading,
  },
  data() {
    return {
      recommend: [],
      discList: [],
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  computed: {
    hasDiscList() {
      return !this.discList.length;
    },
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.slider);
          this.recommend = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data);
          this.discList = res.data.list;
        }
      });
    },
    loadImage() {
      if (!this.chekLoaded) {
        this.$refs.scroll.refresh();
        this.chekLoaded = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/styles/variable';
@import '../../common/styles/mixin';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      display: block;

      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
        family();
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 15px 30px 10px 20px;
        background: #333;
        margin-bottom: 2px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
            famiiy();
          }

          .desc {
            color: $color-text-d;
            famiiy();
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>