import { Link, useParams } from "@tanstack/react-router";
import { useCreateTasks } from "../../../api/tasks";
import DangerButton from "../../Buttons/BadButton";
import GoodButton from "../../Buttons/GoodButton";
import { useState } from "react";

const CreateTaskComponent = () => {
  const { id } = useParams({ from: "/todo/$id" });
  const [priority, setPriority] = useState<number>(1);
  const { mutate, isPending } = useCreateTasks(id);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutate(data);
  };
  return (
    <div className="create-task-box">
      <form
        className="create-task-input-box"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="create-task-input-box ">
          <label className="create-task-input-box-label">
            Title
            <input
              type="text"
              name="title"
              className="create-task-input"
              placeholder="Название"
              autoFocus={true}
              required
            />
          </label>
          <div className="create-task-input-box-label">
            Priority
            <div className="create-task-priority-box">
              <button
                type="button"
                className={`priority-change-color ${priority === 1 ? "task-color-not-ready-priority-1" : "task-color-ready-priority-1"}`}
                onClick={() => setPriority(1)}
              >
                1
              </button>
              <button
                type="button"
                className={`priority-change-color ${priority === 2 ? "task-color-not-ready-priority-2" : "task-color-ready-priority-2"}`}
                onClick={() => setPriority(2)}
              >
                2
              </button>
              <button
                type="button"
                className={`priority-change-color ${priority === 3 ? "task-color-not-ready-priority-3" : "task-color-ready-priority-3"}`}
                onClick={() => setPriority(3)}
              >
                3
              </button>
              <button
                type="button"
                className={`priority-change-color ${priority === 4 ? "task-color-not-ready-priority-4" : "task-color-ready-priority-4"}`}
                onClick={() => setPriority(4)}
              >
                4
              </button>
              <button
                type="button"
                className={`priority-change-color ${priority === 5 ? "task-color-not-ready-priority-5" : "task-color-ready-priority-5"}`}
                onClick={() => setPriority(5)}
              >
                5
              </button>
              <input
                type="number"
                max="5"
                min="1"
                value={priority}
                name="priority"
                className="num"
              />
            </div>
          </div>
          <div className="create-task-button-box">
            <GoodButton type="submit">
              <span>{isPending ? "Creating..." : "Create"}</span>
            </GoodButton>
            <Link from="/" to={`todo/${id}`}>
              <DangerButton type="button">
                <span>Back</span>
              </DangerButton>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskComponent;
