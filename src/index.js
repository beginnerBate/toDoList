
import './common/css/index.css'
import initModule from './components/spa/spa.js'
initModule(document.querySelector('#spa'))
if (module.hot) {
  console.log('starting')
}
