import axios from '../../src/index'
// 普通对象
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res=>{
  console.log(res)
})

// 普通对象
axios({
  method: 'post',
  url: '/base/post',
  headers:{
    'content-type': 'application/json;charset=utf-8',
  },
  data: {
    a: 1,
    b: 2
  }
})