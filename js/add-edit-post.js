import postApi from './api/postApi'
import { initPostForm } from './utils'

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

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: (formValues) => console.log('submit', formValues),
    })
  } catch (error) {
    console.log('🏆 ~ failed to fetch post detail', error)
  }
})()
