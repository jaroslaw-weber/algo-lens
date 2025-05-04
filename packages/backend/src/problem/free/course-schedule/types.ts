export type CourseScheduleInput = [number, number[][]];

export interface LogExtraInfo {
  current?: number;
  prerequisitesIndex?: number;
  allCoursesTaken?: boolean;
  inDegreeIndex?: number;
  prev?: number[];
  prevIndex?: number;
  course?: number;
  prereq?: number;
  deg?: number;
  graphRow?: number;
  neighbor?: number;
  count?: number;
}
