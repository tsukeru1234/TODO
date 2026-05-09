import { useFolderRedact } from "../api/folders";
import ReactDOM from "react-dom";

interface Tasks {
  id: string;
  title: string;
  priority: number;
}

interface folderData {
  id: string;
  title: string;
  description: string;
  progress: number;
  task_count: number;
  tasks: Tasks[];
}

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: folderData;
}

const RenameModal = ({ isOpen, onClose, data }: RenameModalProps) => {
  const { mutate, isPending } = useFolderRedact(data.id);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    console.log(formData);
    mutate(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 min-w-screen min-h-screen dark-glass">
      <form className="text-my-violet-100" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          title
          <input type="text" name="title" />
        </label>
        <input type="text" name="description" />
        <button type="submit">{isPending ? "Изменение..." : "Изменить"}</button>
        <button type="button" onClick={onClose}>
          Закрыть
        </button>
      </form>
    </div>,
    document.body,
  );
};

export default RenameModal;
