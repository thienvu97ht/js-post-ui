import dayjs from 'dayjs'
import postApi from './api/postApi'
import { registerLightBox, setTextContent } from './utils'

function renderPostDetail(post) {
  if (!post) return

  setTextContent(document, '#postDetailTitle', post.title)
  setTextContent(document, '#postDetailDescription', post.description)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updatedAt).format(' - DD/MM/YYYY HH:mm')
  )

  // render hero image (imageUrl)
  const heroImage = document.getElementById('postHeroImage')
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`

    heroImage.addEventListener('error', () => {
      heroImage.style.backgroundImage = 'https://via.placeholder.com/1368x400?text=thumbnail'
    })
  }

  // render edit page link
  const editPageLink = document.getElementById('goToEditPageLink')
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`
    editPageLink.innerHTML = '<i class="fas fa-edit" ></i> Edit Post'
  }
}

;(async () => {
  registerLightBox()

  // get post id from URL
  // fetch post detail API
  // render post detail
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    if (!postId) {
      console.log('Post not found')
      return
    }

    const post = await postApi.getById(postId)
    renderPostDetail(post)
  } catch (error) {
    console.log('🏆 ~ failed to fetch post detail', error)
  }
})()
