let pubsub = {}

let topics = {} //  回调函数存放数组
let subUid = -1
// 发布方法
pubsub.publish = function (topic, args) {
  if (!topics[topic]) {
    return false
  }
  setTimeout(() => {
    let subscribers = topics[topic]
    let len = subscribers ? subscribers.length : 0
    while (len--) {
      subscribers[len].func(topic, args)
    }
  }, 0)
  return true
}
// 订阅方法
pubsub.subscribe = function (topic, func) {
  if (!topics[topic]) {
    topics[topic] = []
  }
  let token = (++subUid).toString()
  topics[topic].push({
    token: token,
    func: func
  })
  return token
}
//  退订方法
pubsub.unsubscribe = function (token) {
  for (let m in topics) {
    if (topics[m]) {
      for (let i = 0, j = topics[m].length; i < j; i++) {
        if (topics[m][i].token === token) {
          topics[m].splice(i, 1)
          return token
        }
      }
    }
  }
  return false
}
export default pubsub
