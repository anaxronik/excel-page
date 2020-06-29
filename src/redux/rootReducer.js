import { TABLE_RESIZE } from "@/redux/types"

export function rootReducer(state, action = {}) {
  let currentState
  let field
  if (action.type) {
    switch (action.type) {
      default:
        return state

      case TABLE_RESIZE:
        field = action.data.type === "col" ? "colState" : "rowState"
        currentState = state[field]
        currentState[action.data.id] = action.data.value
        return { ...state } // id, value
    }
  }

  return state
}
