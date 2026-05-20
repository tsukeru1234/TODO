import type { JSX } from "react";
import type { folderData } from "./types_folders";

//props for modal create todo window
export interface propModal {
  isOpen: boolean;
  onClose: () => void;
}

//props for modal rename todo window
export interface modalRenProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface DetailFolderTypes {
  id: string;
  children: JSX.Element;
  path: string;
}

export interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: folderData;
}
