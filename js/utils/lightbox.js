function showModal(modalElement) {
  // make sure bootstrap script is loaded
  if (!window.bootstrap) return

  const modal = new window.bootstrap.Modal(modalElement)
  if (modal) modal.show()
}

export function registerLightBox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId)
  if (!modalElement) return

  // selectors
  const imageElement = document.querySelector(imgSelector)
  const prevButton = document.querySelector(prevSelector)
  const nextButton = document.querySelector(nextSelector)
  if (!imageElement || !prevButton || !nextButton) return

  // lightbox vars
  let imgList = []
  let currentIndex = 0

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src
  }

  // handle click for all imgs --> Event Delegation
  // img click --> find all imgs with the same album / gallery
  // determine index of selected img
  // show modal with selected img
  // handle prev / next click

  document.addEventListener('click', (event) => {
    const { target } = event
    if (target.tagName !== 'IMG' || !target.dataset.album) return

    // img with data-album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
    currentIndex = [...imgList].findIndex((x) => x === target)

    showImageAtIndex(currentIndex)
    showModal(modalElement)
  })

  prevButton.addEventListener('click', () => {
    // show prev image current album
  })

  nextButton.addEventListener('click', () => {
    // show prev image current album
  })
}
