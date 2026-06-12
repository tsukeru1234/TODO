import type { FolderModalProps } from "../../@types/types_components";
import { useFolderRedact } from "../../api/folders";
import ReactDOM from "react-dom";
import DangerButton from "../Buttons/DangerButton";
import Button from "../Buttons/Button";

interface RenameModalProps extends FolderModalProps {
  id: string;
}

const RenameModal = ({ isOpen, onClose, id }: RenameModalProps) => {
  const { mutate, isPending } = useFolderRedact(id);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const cleaned = Object.fromEntries(
      Object.entries(formData).filter(
        ([, v]) => v !== "" && v !== null && v !== undefined,
      ),
    );
    mutate(cleaned, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 min-w-screen min-h-screen dark-glass grid place-content-center text-4xl font-bold">
      <form
        className="w-200 h-120 bg-my-green-600/20 border-my-green-100 border-4 rounded-2xl p-8 flex flex-col justify-between "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 text-my-green-500">
          <label className="flex flex-col gap-2">
            Title
            <input
              type="text"
              name="title"
              placeholder="Название"
              className="border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1"
            />
          </label>
          <label className="flex flex-col gap-2">
            Description
            <textarea
              rows={4}
              name="description"
              placeholder="Описание..."
              className="border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1"
            />
          </label>
        </div>
        <div className="flex gap-5 justify-end">
          <Button type="submit">
            <span>{isPending ? "Изменение..." : "Изменить"}</span>
          </Button>
          <DangerButton type="button" click={onClose}>
            <span>Закрыть</span>
          </DangerButton>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export default RenameModal;
