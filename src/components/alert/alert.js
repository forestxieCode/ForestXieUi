import Notification from './notification'

let messageInstance

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

function notice ({ duration = 1.5, contect = '' }) {
  let instance = getMessageInstance()
  instance.add({
    contect,
    duration
  })
}

export default {
  info (options) {
    return notice(options)
  }
}
