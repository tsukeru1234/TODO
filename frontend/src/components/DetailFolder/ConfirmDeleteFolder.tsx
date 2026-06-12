import ReactDOM from "react-dom";
import type { FolderModalProps } from "../../@types/types_components";
import { useDeleteFolder } from "../../api/folders";
import DangerButton from "../Buttons/DangerButton";
import Button from "../Buttons/Button";

interface ConfirmDeleteFolder extends FolderModalProps {
  id: string;
  title: string;
}

const ConfirmDeleteFolder = ({
  isOpen,
  onClose,
  id,
  title,
}: ConfirmDeleteFolder) => {
  const { mutate, isPending } = useDeleteFolder();
  const handleDelete = () => {
    mutate(id);
    onClose();
  };
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 min-w-screen min-h-screen dark-glass grid place-content-center text-4xl font-bold text-my-green-500">
      <div className="w-150 h-70 bg-my-green-600/20 border-my-green-100 border-4 rounded-2xl p-8 flex flex-col justify-between">
        <span className="text-center">
          Вы уверены что хотите удалить папку <br />
          <span className="text-red-600">{title}</span>?
        </span>
        <div className="flex gap-5 justify-center">
          <DangerButton type="button" click={handleDelete}>
            <span>{isPending ? "Удаление..." : "Удалить"}</span>
          </DangerButton>
          <Button type="button" click={onClose}>
            <span>Отмена</span>
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDeleteFolder;
