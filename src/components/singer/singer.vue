<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer'
import ListView from '@/base/listview/listview'
import { mapMutations } from 'vuex'
import { playlistMixin } from '@/common/js/mixin'

const HOT_NAME = '热门'
const HOT_INGER_LEN = 10

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(item) {
      // console.log(item);
      this.$router.push({
        path: `/singer/${item.id}`
      })
      // 把歌手数据存到vuex里面去
      this.setSinger(item)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if(res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          // console.log(this.singers);
        }
      })
    },
    // 对拿到的数据进行处理，得到想要的格式
    _normalizeSinger(list) {
       let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_INGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 排序
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    // 把歌手数据存到vuex里面去
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/styles/mixin"
  .singer
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    family()

</style>