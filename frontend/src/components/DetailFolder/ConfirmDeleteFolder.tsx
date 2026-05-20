import ReactDOM from "react-dom";
import type { FolderModalProps } from "../../@types/types_components";
import { useDeleteFolder } from "../../api/folders";

const ConfirmDeleteFolder = ({ isOpen, onClose, data }: FolderModalProps) => {
  const { mutate, isPending } = useDeleteFolder();
  const handleDelete = () => {
    mutate(data.id);
    onClose();
  };
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 min-w-screen min-h-screen dark-glass grid place-content-center text-4xl font-bold text-my-green-500">
      <div className="w-150 h-70 bg-my-green-600/20 border-my-green-100 border-4 rounded-2xl p-8 flex flex-col justify-between">
        <span className="text-center">Вы уверены что хотите удалить папку <br /><span className="text-red-600">{data.title}</span>?</span>
        <div className="flex gap-5 justify-center">
          <button onClick={handleDelete} className="px-3 bg-my-green-600 shadow-lg shadow-black/40 border-3 border-my-green-100 outline-0 text-my-green-100 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-green-100 hover:pb-1 active:bg-my-green-100 active:text-my-green-500 active:scale-95">{isPending ? "Удаление..." : "Удалить"}</button>
          <button onClick={onClose} className="px-3 bg-my-dub-600 shadow-lg shadow-black/40 border-3 border-my-dub-100 outline-0 text-my-dub-200 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-dub-100 hover:pb-1 active:bg-my-dub-100 active:text-my-dub-600 active:scale-95">Отмена</button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDeleteFolder;
