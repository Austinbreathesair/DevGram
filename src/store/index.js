import { get } from 'core-js/fn/dict'
import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

fb.postCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      dispatch('fecthUserProfile', user)
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      dispatch('fecthUserProfile', user)
    },
    async fecthUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      commit('setUserProfile', userProfile.data())

      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      awaitfb.auth.signOut()

      commit('setUserProfile', {})

      router.push('/login')
    },
    async createPost({ state, commit }, post) {
      await fb.postCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.id,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      fb.postCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid

      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fecthUserProfile', { uid: userId })

      const postDocs = await fb.postCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postCollection.doc(doc.id).update({
          userName: user.name 
        })
      })

      const postDocs = await fb.postCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  }
})

export default store
