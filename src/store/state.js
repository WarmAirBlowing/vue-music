import { playMode } from '@/common/js/config'
import { loadSearch } from '@/common/js/cache'

const state = {
  singer: {}, 
  playing: false, // 播放状态
  fullScreen: false, // 全屏
  playlist: [], // 播放列表
  sequenceList: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放的歌的索引
  disc: {}, // 推荐歌单详情对象
  topList: {}, // 排行榜歌单列表
  searchHistory: loadSearch(), // 搜索历史
  playHistory: [],
  favoriteList: []
}

export default state