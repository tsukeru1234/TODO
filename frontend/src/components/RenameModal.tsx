import type { RenameModalProps } from "../@types/types_components";
import { useFolderRedact } from "../api/folders";
import ReactDOM from "react-dom";

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
    <div className="fixed inset-0 min-w-screen min-h-screen dark-glass grid place-content-center text-4xl font-bold">
      <form className="text-my-violet-100 w-200 h-120 bg-my-green-600/20 border-my-green-100 border-4 rounded-2xl p-8 flex flex-col justify-between" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 text-my-green-500">
          <label className="flex flex-col gap-2">
            Title
            <input type="text" name="title" placeholder="Название" className="border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1" />
          </label>
          <label className="flex flex-col gap-2">
            Description
            <textarea rows={4} name="description" placeholder="Описание..." className="border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1" />
          </label>
        </div>
        <div className="flex gap-5 justify-end">
          <button type="submit" className="px-3 bg-my-green-600 shadow-lg shadow-black/40 border-3 border-my-green-100 outline-0 text-my-green-100 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-green-100 hover:pb-1 active:bg-my-green-100 active:text-my-green-500 active:scale-95">{isPending ? "Изменение..." : "Изменить"}</button>
          <button type="button" onClick={onClose} className="px-3 bg-my-dub-600 shadow-lg shadow-black/40 border-3 border-my-dub-100 outline-0 text-my-dub-200 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-dub-100 hover:pb-1 active:bg-my-dub-100 active:text-my-dub-600 active:scale-95">
            Закрыть
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export default RenameModal;
