import { Problem } from "../../schemas";

export const meetingRooms: Problem = {
  id: "meeting-rooms",
  title: "Meeting Rooms",
  isBookmarked: false,
  difficulty: "Easy",
  category: "Arrays",
  tags: ["Array", "Sorting", "Interval"],
  repl: {
    args: [{ name: "intervals", type: "number[][]" }],
    returns: { type: "boolean" },
  },
  tests: [
    {
      id: "test1",
      argValues: [
        [
          [0, 30],
          [5, 10],
          [15, 20],
        ],
      ],
      expectedResult: false,
    },
    {
      id: "test2",
      argValues: [
        [
          [7, 10],
          [2, 4],
        ],
      ],
      expectedResult: true,
    },
  ],
};
