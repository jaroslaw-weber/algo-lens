import { ListNode } from "algo-lens-core";
import { ReverseListInput } from "./types";

export const getInput = (): ReverseListInput => {
  const head: ListNode = {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 4,
          next: {
            val: 5,
            next: {
              val: 6,
              next: {
                val: 7,
                next: null,
              }
            }
          }
        },
      },
    },
  };
  return { head:head };
};
