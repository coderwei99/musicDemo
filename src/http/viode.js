import request from './api'

// 视频分类list
export function getmvList(){
    return request('/video/category/list')
}

// 视频标签list
export function getmvTar(){
    return request('/video/group/list')
}

export function getListDetail(){
    return request('/video/group',{
        id:58100,
        timestamp:1503019930000
    })
}