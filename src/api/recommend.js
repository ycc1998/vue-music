import jsonp from '../common/js/jsonp'
import {options,commonParams} from './config'
import axios from 'axios';
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
	const url = '/getDiscList' //代理转发

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

	return axios.get(url,{
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })

}

export function getSongList(disstid) {
const url = '/getSongList'

const data = Object.assign({}, commonParams, {
  disstid,
  type: 1,
  json: 1,
  utf8: 1,
  onlysong: 0,
  platform: 'yqq',
  hostUin: 0,
  needNewCode: 0
})

//return jsonp(url, data, options1)
return axios.get(url,{
  params: data
}).then((res) => {
  var res = res.data.replace('jsonCallback(','');
  var data = res.replace('})','}');

    return Promise.resolve(JSON.parse(data))
})
}

// 获取vkey
export function getSongVkey () {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 2530384598,
    guid: 9152999990,
    songmid: '003clL2S0lVVSF',
    filename: `C400003clL2S0lVVSF.m4a`
  })

  return jsonp(url, data)
}

