export default {
  namespaced: true,
  state: {
    modalOpen: false
  },
  mutations: {
    setModalOpen (state, bool) {
      state.modalOpen = bool
    }
  }
}