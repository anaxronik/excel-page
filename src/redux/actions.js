import { TABLE_RESIZE } from "@/redux/types"

// action creators

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}
