//props for modal create todo window
export type propModal = {
  isOpen: boolean;
  onClose: () => void;
};

//props for modal rename todo window
export type modalRenProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};
