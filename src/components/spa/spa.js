
import './spa.css'
import pubsub from 'common/js/pubsub.js'
import initListModule, { addList} from 'components/list/list.js'
// 常量
const configMap = {
  template_html: `
                <div class="spa-wrapper">
                <div class="spa-head">
                  <div class="spa-head-logo">
                    <span>今</span>
                    <span>日</span>
                    <span>事</span>
                    <span>今</span>
                    <span>日</span>
                    <span>毕</span>
                  </div>
                  <!-- <div class="spa-head-date">今天: <span>2017-11-16</span> 时间: <span>9:24</span></div> -->
                </div>
                <div class="spa-content">
                  <div class="spa-content-todolist">
                    <form action="" class="spa-content-todolist-form">
                      <input type="text" placeholder="请输入今天要完成的任务" id="text">
                    </form>
                  </div>
                  <div class="spa-content-todolist-show">
                    <ul id='list'>
                    </ul>
                  </div>
                </div>
              </div>
              `,
  finished: 'true',
  unfinished: 'false',
  finished_text: '取消完成任务',
  unfinished_text: '设置完成任务',
  delete_text: '删除任务',
  element: {
    ele_input: null,
    ele_list: null,
    ele_form: null,
    ele_text: null
  }
}
let initModule, setElement, submitList, setLocalhostList
let localhostList = []
setElement = function (container) {
  configMap.element.ele_input = container.querySelector('#text')
  configMap.element.ele_list = container.querySelector('#list')
  configMap.element.ele_form = container.querySelector('.spa-content-todolist-form')
  configMap.element.ele_text = container.querySelector('#text')
}
submitList = function (event) {
  if (event.keyCode === 13) {
    event = event || window.event
    event.preventDefault() // 兼容标准浏览器
    event.returnValue = false //  兼容IE6~IE8
    let listText = event.target.value
    setLocalhostList(listText)
    // fillList(listText)
    event.target.value = null
  }
}
setLocalhostList = function (text) {
  if (text) {
    let list = configMap.element.ele_list
    localhostList = JSON.parse(localStorage.getItem('localhostList')) || []
    let li = {
      index: list.getElementsByTagName('li').length + 1,
      flag: false,
      text: text
    }
    localhostList.push(li)
    localStorage.setItem('localhostList', JSON.stringify(localhostList))
    pubsub.publish('addList', addList(text))
  }
}
initModule = function (container) {
  container.innerHTML = configMap.template_html
  setElement(container)
  let submitBtn = configMap.element.ele_text
  submitBtn.addEventListener('keydown', submitList)
  initListModule(container)
}
export default initModule
