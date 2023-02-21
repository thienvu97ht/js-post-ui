import postApi from './api/postAPI'
import { getUlPaginationElement, setTextContent, truncateText } from './utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

function createPostElement(post) {
  if (!post) return

  // find and clone template
  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return
  console.log('🏆 ~ createPostElement ~ post', post)

  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  // update title, description, author, thumbnail
  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  setTextContent(liElement, '[data-id="author"]', post.author)

  // calculate timespan
  setTextContent(liElement, '[data-id="timeSpan"]', `- ${dayjs(post.updatedAt).fromNow()}`)

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail'
    })
  }

  // attach event

  return liElement
}

function renderPostList(postList) {
  if (!Array.isArray(postList) || postList.length === 0) return

  const ulElement = document.getElementById('postList')
  if (!ulElement) return

  // clear current list
  ulElement.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}

function renderPagination(pagination) {
  const ulPagination = getUlPaginationElement()
  if (!pagination || !ulPagination) return

  // calc totalPages
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  // save page and totalPages to ulPagination
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  // check if enable/disable prev/next links
  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild.classList.remove('disabled')

  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}

async function handleFilterChange(filterName, filterValue) {
  try {
    // update query params
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)
    history.pushState({}, '', url)

    // fetch API
    const { data, pagination } = await postApi.getAll(url.searchParams)

    // re-render post list, pagination
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('failed to fetch post list', error)
  }
}

function handlePrevClick(e) {
  e.preventDefault()

  const ulPagination = getUlPaginationElement()
  if (!ulPagination) return

  const page = Number.parseInt(ulPagination.dataset.page) || 1
  if (page <= 1) return

  handleFilterChange('_page', page - 1)
}

function handleNextClick(e) {
  e.preventDefault()

  const ulPagination = getUlPaginationElement()
  if (!ulPagination) return

  const page = Number.parseInt(ulPagination.dataset.page) || 1
  const totalPages = ulPagination.dataset.totalPages
  if (page >= totalPages) return

  handleFilterChange('_page', page + 1)
}

function initPagination() {
  // bind click event for prev/next link
  const ulPagination = getUlPaginationElement()
  if (!ulPagination) return

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink) {
    prevLink.addEventListener('click', handlePrevClick)
  }

  // add click event for next link
  const nextLink = ulPagination.lastElementChild?.firstElementChild
  if (nextLink) {
    nextLink.addEventListener('click', handleNextClick)
  }
}

function initURL() {
  const url = new URL(window.location)

  // update search params if needed
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

  history.pushState({}, '', url)
}

;(async () => {
  try {
    // attack click event for links
    initPagination()

    // set default pagination (_page, _limit) on URL
    initURL()

    // render post list based URL params
    const queryParams = new URLSearchParams(window.location.search)
    // set default query params if not existed

    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('🏆 ~ ; ~ error', error)
    // show modal, toast error
  }
})()
