export function rootReducer(state, action = {}) {
  if (action.type) {
    switch (action.type) {
      default:
        return state

      case "TABLE_RESIZE":
        let colState = state.colState
        colState[action.id] = action.value
        return { ...state } // id, value
    }
  }

  return state
}
