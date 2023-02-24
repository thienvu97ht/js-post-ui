import postApi from './api/postApi'

// MAIN
;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    let defaultValues = {
      title: '',
      description: '',
      author: '',
      imageUrl: '',
    }

    if (postId) {
      defaultValues = await postApi.getById(postId)
    }

    console.log('add edit page', postId)
  } catch (error) {
    console.log('🏆 ~ failed to fetch post detail', error)
  }
})()
