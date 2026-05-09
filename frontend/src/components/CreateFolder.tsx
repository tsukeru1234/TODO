import { useFoldersMutation } from "../api/folders";

const CreateFolder = () => {
  const { mutate, isPending } = useFoldersMutation();
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutate(data);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input type="text" name="title" placeholder="Название папки" required />
        <input type="text" name="description" placeholder="Описание" />
        <button type="submit">
          {isPending ? "В процессе.." : "Отправить"}
        </button>
      </form>
    </>
  );
};

export default CreateFolder;
