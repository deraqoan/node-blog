import Vue from 'vue'

export default {
  getlogin (arr) {
    return Vue.http.post('/api/login', arr)
  },

  resetUser (arr) {
    return Vue.http.post('/api/user', arr)
  },

  getArticleList (tag, caption, id) {
    return Vue.http.get('/api/articles?payload%5Bvalue%5D=' + tag + '&payload%5Bpage%5D=' + id + '&payload%5Blimit%5D=8&payload%5Bcapter%5D=' + caption)
  },

  getDrafts (id) {
    return Vue.http.get('/api/drafts?payload%5Bpage%5D=' + id + '&payload%5Blimit%5D=8')
  },

  delArticle (id) {
    return Vue.http.delete('/api/article/' + id)
  },

  saveArticle (arr) {
    return Vue.http.post('/api/article', arr)
  },

  refleshArticle (aid, arr) {
    return Vue.http.patch('/api/article/' + aid, arr)
  },

  getArticle (aid) {
    return Vue.http.get('/api/article/' + aid)
  },

  saveDraft (arr) {
    return Vue.http.post('/api/draft', arr)
  },

  refleshDraft (aid, arr) {
    return Vue.http.patch('/api/draft/' + aid, arr)
  },

  searchArticles (key, value, id) {
    return Vue.http.get('/api/someArticles?payload%5Bkey%5D=' + key + '&payload%5Bvalue%5D=' + value + '&payload%5Bpage%5D=' + id)
  },

  getAllTags () {
    return Vue.http.get('/api/tags')
  },

  sendMail (arr) {
    return Vue.http.post('/api/mail', arr)
  },

  summitComment (arr) {
    return Vue.http.post('/api/comment', arr)
  },

  getAllComments (aid) {
    return Vue.http.get('/api/comments?payload%5Bid%5D=' + aid)
  },

  updateLike (id, arr) {
    return Vue.http.patch('/api/comments/' + id, arr)
  }

}
