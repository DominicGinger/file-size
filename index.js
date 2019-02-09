const fileProgress = document.getElementById('file-progress')
const fileSize = document.getElementById('file-size')
const fileSelect = document.getElementById('file-select')
const mimeSelect = document.getElementById('mime-select')
const fileName = document.getElementById('file-name')

const MAX_CHUNK = 1024*10

function getBytes () {
  const size = fileSize.value
  switch (fileSelect.value) {
    case 'B':
      return size
    case 'KB':
      return 1024 * size
    case 'MB':
      return 1024 * 1024 * size
    case 'GB':
      return 1024 * 1024 * 1024 * size
  }
}
document.querySelector('.download-btn').addEventListener('click', event => {
  const size = getBytes()
  let href = `data:${mimeSelect.value};charset=utf-8,`
  const name = `${fileName.value}.${mimeSelect.options[mimeSelect.selectedIndex].dataset.ext}`
  let count = 0
  let i = 0;
  let finished = false;
  (function loop() {
    i++
    count += Math.min(MAX_CHUNK, size)
    fileProgress.value = (count * 100) / size
    href += Array(Math.min(MAX_CHUNK, size)).fill('a').join('')
    if (i < size / MAX_CHUNK) {
      setTimeout(loop, 0)
    } else {
      finished = true
    }
  })();

  (function finish () {
    if (finished) {
      const a = document.createElement('a')
      a.href = href
      a.download = name
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
      }, 0)
    } else {
      setTimeout(finish, 100)
    }
  })()
})
