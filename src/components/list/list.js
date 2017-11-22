import pubsub from 'common/js/pubsub.js'
// list 模块
import {
  addClass, removeClass
} from 'common/js/dom'
//  常量
const configMap = {
  finished: 'true',
  unfinished: 'false',
  finished_text: '取消完成任务',
  unfinished_text: '设置完成任务'
}
// dom节点
let DomNode = {
  listNode: null,
  templateHtml: ``
}
let setDomNode, listData, initList, toggleFinished, deleteList, addList, updateList, initListModule
setDomNode = function (container) {
  DomNode.listNode = container.querySelector('#list')
}
initList = function () {
  listData = JSON.parse(localStorage.getItem('localhostList')) || []
  if (Object.keys(listData).length === 0) {
    return false
  } else {
    let list = DomNode.listNode
    let tHtml = DomNode.templateHtml
    for (let [index, value] of listData.entries()) {
      console.log(`${value.flag === 'true' ? 'finished' : ''}`)
      tHtml += `
      <li data-flag = ${value.flag} class=${value.flag === 'true' ? 'finished' : ''}>
      <div>${index + 1}. ${value.text}</div>
      <a href="#" class="btn setFinished" id='setIsFinished'> ${value.flag === 'true' ? '取消完成任务' : '设置完成任务'} </a>
      <a href="#" class="btn setDelete" id="setDelete">删除任务</a>
      </li>
      `
    }
    list.innerHTML = tHtml
    toggleFinished(list)
    deleteList(list)
  }
  console.log('initList.....')
}
toggleFinished = function (target) {
  let arrayLi = Array.from(target.getElementsByTagName('li'))
  arrayLi.forEach((item, index) => {
    item.querySelector('#setIsFinished').addEventListener('click', (event) => {
      console.log('clickBefore', item.dataset.flag)
      if (item.dataset.flag === configMap.finished) {
        item.dataset.flag = configMap.unfinished
        removeClass(item, 'finished')
        event.target.innerHTML = configMap.unfinished_text
        updateList(index, item.dataset.flag)
      } else if (item.dataset.flag === configMap.unfinished) {
        item.dataset.flag = configMap.finished
        addClass(item, 'finished')
        event.target.innerHTML = configMap.finished_text
        updateList(index, item.dataset.flag)
      }
      console.log('afterClick', index, item.dataset.flag)
    })
  })
}
deleteList = function (target) {
  let arrayLi = Array.from(target.getElementsByTagName('li'))
  // let index
  arrayLi.forEach((item, index) => {
    item.querySelector('#setDelete').addEventListener('click', (event) => {
      //  删除dom数据
      item.remove()
      // 删除localstorage数据 根据index寻找数据，然后删除重新存储
      let oldList = JSON.parse(localStorage.getItem('localhostList'))
      oldList.splice(index, 1)
      //  重新存储
      localStorage.setItem('localhostList', JSON.stringify(oldList))
      //  重新渲染
      initList()
    })
  })
}
addList = function (text) {
  if (text) {
    let list = DomNode.listNode
    const indexcurrent = list.getElementsByTagName('li').length + 1
    list.innerHTML += `<li data-flag = false>
    <div>${indexcurrent}. ${text}</div>
    <a href="#" class="btn setFinished" id='setIsFinished'> 设置完成任务 </a>
    <a href="#" class="btn setDelete" id="setDelete">删除任务</a>
    </li>`
    toggleFinished(list)
    deleteList(list)
    return true
  } else {
    return false
  }
}
updateList = function (index, flag) {
  let oldList = JSON.parse(localStorage.getItem('localhostList'))
  oldList[index].flag = flag
  localStorage.setItem('localhostList', JSON.stringify(oldList))
}
initListModule = function (container) {
  setDomNode(container)
  initList()
  pubsub.subscribe('addList', function (topics, data) {
    console.log(topics + '1: ' + data)
  })
}
export default initListModule
export {addList}

