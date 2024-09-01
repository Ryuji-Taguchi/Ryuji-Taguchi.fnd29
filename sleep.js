// 引数に指定した秒数だけ待つsleep関数
// Promiseを返す
function sleep(second) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve()
      }, second * 1000)
  })
}
