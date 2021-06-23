import request from './api'


// 拿到首页轮播图数据
export  function getHomeDetail(){
   return request('/homepage/block/page')
}


// 拿到首页推荐歌单数据
export function getTuiJianSon(){
   return request('/personalized',{
      limit:10
   })
}

// 手机号+验证码登录方式
export function getpassword(phone,password){
   return request('/login/cellphone',{
      phone,
      password
   })
}

// 手机号登录处理函数
export function getPhoneText(phone){
   return request('/captcha/sent',{
      phone
   })
}

// 传入验证码和手机号判断是否匹配
export function postPhone(phone,captcha){
   return request('/captcha/verify',{
      phone,
      captcha
   })
}

// 发送请求获取歌单里面的歌曲信息
export function sonDetails(ids){
   return request('/song/detail',{
      ids
   })
}

//获取歌单页面的精品歌单
export function getQualitySonList(before){
   return request('/top/playlist/highquality',{
      before
   })
}

// 默认搜索关键词
function getInputValue(){
   return request('/search/default')
}


// 传入歌名获取对应的歌曲数据

export function getValueSon(keywords){
   return request('/search',{
      keywords,
      limit:50
   })
}
//获取热门歌单分类
export function getHotSonListType(){
   return request('/playlist/hot')
}

//传入歌单分类拿到该分类下的所有歌单
export function getTypeSonList(cat,limit){
   return request ('/top/playlist',{
      cat,
      limit
   })
}

// 获取电台栏目的banner
export function getDjBanner(){
   return request('/dj/banner')
}

// 获取电台栏目分类
export function getDjType(){
   return request('/dj/catelist')
}

// 传入类型获取对应电台数据
export function getDjTypeList(type){
   return request('/dj/recommend/type',{
      type
   })
}

// 获取排行榜所有榜单
export function getRankingList(){
   return request('/toplist')
}

// 传入歌单id（排行榜id） 获取具体歌曲数据
export function getRankingTack(id){
   return request('/playlist/detail',{
      id
   })
}

// 获取要展示歌曲的排行榜的歌曲数据
export function getSonRanking(){
   return request('/toplist/detail')
}

// 传入input的值发起请求获取搜索结果
export function  getValueSonDetail(keywords){
   return request('/cloudsearch',{
      keywords
   })
}

// 获取歌手列表页
export function getGinnerList(area,type,initial){
   return request('/artist/list',{
      area,
      type,
      initial
   })
}

// 获取歌手详情页介绍信息
export function getSingerDetails(id){
   return request('/artist/detail',{
      id
   })
}  


// 传入音乐id获取音乐的url
export function getSongUrl(id){
   return request('/song/url',{
      id
   })
}

// 新歌速递 传入对应type获取对应数据
export function getTopSon(type){
   return request('/top/song',{
      type
   })
}
export default{
   getHomeDetail,
   getTuiJianSon,
   getInputValue
}
