export const addClass = function (element, oClass) {
  if (!hasClass(element, oClass)) {
    element.className += ' ' + oClass
  }
}

var hasClass = function (element, oClass) {
  return element.className.match(new RegExp('(^|\\s)' + oClass + '(\\s|$)'))
}

export const removeClass = function (element, oClass) {
  var cls = new RegExp('(^|\\s)' + oClass + '(\\s|$)')
  if (hasClass(element, oClass)) {
    element.className = element.className.replace(cls, '')
  }
}
export const toggleClass = function (element, oClass) {
  if (!hasClass(element, oClass)) {
    addClass(element, oClass)
  } else {
    removeClass(element, oClass)
  }
}
