const fileProgress = document.getElementById('file-progress')
const fileSizeValue = document.getElementById('file-size-value')
const fileSelect = document.getElementById('file-select')
const mimeSelect = document.getElementById('mime-select')
const fileName = document.getElementById('file-name')
const downloadBtn = document.getElementById('download-btn')

const MAX_CHUNK = 1024*10

function getBytes () {
  const size = fileSizeValue.value
  switch (fileSelect.value) {
    case 'B':
      return size
    case 'KB':
      return 1024 * size
    case 'MB':
      return 1024 * 1024 * size
  }
}

downloadBtn.addEventListener('click', event => {
  downloadBtn.classList.add('hide')
  fileProgress.classList.remove('hide')
  const size = getBytes()
  let href = `data:${mimeSelect.value};charset=utf-8,`
  const name = `${encodeURIComponent(fileName.value)}.${mimeSelect.options[mimeSelect.selectedIndex].dataset.ext}`
  let count = 0
  let i = 0;
  let finished = false;
  (function loop() {
    i++
    count += Math.min(MAX_CHUNK, size)
    fileProgress.value = (count * 100) / size
    href += Array(Math.min(MAX_CHUNK, size)).fill('a').join('')
    if (i < size / MAX_CHUNK) {
      try {
        setTimeout(loop, 0)
      } catch (e) {
        alert(e)
        throw e
      }
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
      fileProgress.classList.add('hide')
      downloadBtn.classList.remove('hide')
    } else {
      setTimeout(finish, 100)
    }
  })()
})
