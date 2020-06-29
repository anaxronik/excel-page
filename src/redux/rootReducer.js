import { CHANGE_TEXT, TABLE_RESIZE } from "@/redux/types"

export function rootReducer(state, action = {}) {
  let prevState

  if (action.type) {
    switch (action.type) {
      default:
        return state

      case TABLE_RESIZE:
        let stateType = action.data.type === "col" ? "colState" : "rowState"
        let currentState = state[stateType]
        currentState[action.data.id] = action.data.value

        return { ...state }

      case CHANGE_TEXT:
        prevState = state["dataState"] || {}
        prevState[action.data.id] = action.data.value

        return {
          ...state,
          currentText: action.data.value,
          dataState: prevState,
        }
    }
  }

  return state
}
