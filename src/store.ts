import axios from 'axios'
import { reactive, readonly } from 'vue'
import { Post } from './types'
import { todayPost, monthPost, weekPost } from './data/mockDatabase'

interface PostsState {
  ids: string[]
  all: Record<string, Post>
  loaded: boolean
}

interface State {
  posts: PostsState
}

const initialPostsState = (): PostsState => ({
  all: {
    [todayPost.id]: todayPost,
    [weekPost.id]: weekPost,
    [monthPost.id]: monthPost
  },
  ids: [
    todayPost.id.toString(),
    weekPost.id.toString(),
    monthPost.id.toString()
  ],
  loaded: false
})

const initialState = (): State => ({
  posts: initialPostsState()
})

class Store {
  protected state: State

  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState() {
    return readonly(this.state)
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')
    const ids: string[] = []
    const all: Record<string, Post> = {}

    for (const post of response.data) {
      ids.push(post.id.toString())
      all[post.id] = post
    }

    this.state.posts = {
      ids,
      all,
      loaded: true
    }
  }
}

const store = new Store(initialState())

export const useStore = () => store
