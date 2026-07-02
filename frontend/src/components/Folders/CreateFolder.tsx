import { useFoldersMutation } from "../../api/folders";
import { Link } from "@tanstack/react-router";
import BadButton from "../Buttons/BadButton";
import GoodButton from "../Buttons/GoodButton";

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
        className="create-folder-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="create-folder-input-box">
          <label className="">
            Title
            <input
              type="text"
              name="title"
              placeholder="Folder name"
              className="create-folder-input"
              required
            />
          </label>
          <label className="">
            Description
            <textarea
              rows={4}
              name="description"
              placeholder="Describe your plans (optional)"
              className="create-folder-input"
            />
          </label>
          <div className="create-folder-button-box">
            <GoodButton type="submit">
              <span>{isPending ? "Creating..." : "Create"}</span>
            </GoodButton>
            <Link from="/" to="/todo">
              <BadButton type="button">
                <span>Back</span>
              </BadButton>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateFolder;
