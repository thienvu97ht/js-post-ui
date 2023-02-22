import dayjs from 'dayjs'
import postApi from './api/postApii'
import { setTextContent } from './utils'

// id="goToEditPageLink"
// id="postHeroImage"
// id="postDetailTitle"
// id="postDetailAuthor"
// id="postDetailTimeSpan"
// id="postDetailDescription"

// author: 'Issac Rolfson'
// createdAt: 1662885819124
// description: 'ut eum iure aut rerum eaque dignissimos sed sed ab corporis et ad eaque soluta atque ut quasi est odio eum quia voluptatem quia est est dolorem est velit et aut quam dolore vitae deserunt aperiam voluptatem reiciendis non iusto dolor id sed velit et rerum possimus occaecati unde molestiae'
// id: 'lea2aa9l7x3a5ti'
// imageUrl: 'https://picsum.photos/id/559/1368/400'
// title: 'Officia recusandae ad'
// updatedAt: 1662885819124

function renderPostDetail(post) {
  if (!post) return

  // render title
  // render description
  // render author
  // render updatedAt
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
