import type { Tasks } from "./types_tasks";

export interface foldersData {
  id: string;
  task_count: number;
  progress: number;
  title: string;
}

export interface folderData {
  id: string;
  title: string;
  description: string;
  progress: number;
  task_count: number;
  tasks: Tasks[];
}

export interface folderCreateData {
  id: string;
  title: string;
  description: string;
  progress: number;
  task_count: number;
}

export interface folderRedact {
  title: string;
  description: string;
}
