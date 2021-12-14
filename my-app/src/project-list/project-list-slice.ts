import { createSlice } from "@reduxjs/toolkit"

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  // 这里直接修改state是因为redux-TOOKIT 底层是用了immer库
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})


// projectListSlice.actions就是Reducer中定义的一个一个的方法
export const projectListActions = projectListSlice.actions