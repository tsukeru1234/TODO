import type { Tasks } from "./types_tasks";

export interface foldersData {
  id: string;
  task_count: number;
  progress: number;
  title: string;
  ready_tasks: number;
}

export interface folderData {
  id: string;
  title: string;
  description: string;
  progress: number;
  task_count: number;
  ready_tasks: number;
  tasks: Tasks[];
}

export interface folderCreateData {
  id: string;
  title: string;
  description: string;
  progress: number;
  task_count: number;
  ready_tasks: number;
}

export interface folderRedact {
  title: string;
  description: string;
}
