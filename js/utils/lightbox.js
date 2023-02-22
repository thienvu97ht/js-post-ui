export function registerLightBox() {
  // handle click for all imgs --> Event Delegation
  // img click --> find all imgs with the same album / gallery
  // determine index of selected img
  // show modal with selected img
  // handle prev / next click

  document.addEventListener('click', (event) => {
    const { target } = event
    if (target.tagName !== 'IMG' || !target.dataset.album) return

    // img with data-album
    let imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
    const index = [...imgList].findIndex((x) => x === target)

    console.log('🏆 ~ document.addEventListener ~ imgList', imgList)
  })
}
