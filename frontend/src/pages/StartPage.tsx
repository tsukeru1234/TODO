import { Link } from "@tanstack/react-router";
import Button from "../components/Buttons/Button";
import { useState } from "react";
import GoodButton from "../components/Buttons/GoodButton";
import BadButton from "../components/Buttons/BadButton";

export const StartPage = () => {
  const [ready, setReady] = useState<boolean>(true);
  const [ready2, setReady2] = useState<boolean>(false);
  return (
    <>
      <div className="bg-padding-start-page">
        <div className="title-starting-page">
          <span className="title-starting-page-1">Welcome!</span>
          <span className="title-starting-page-2">
            TRF, track plans, finance and events
          </span>
        </div>
        <div className="buttons-start-page open-start-page">
          <div className="starting-page-links">
            <Link from="/" to="/todo">
              <Button type="button">
                <span>Todo</span>
              </Button>
            </Link>
            <div className="start-page-demonstration-todo-outside open-start-page-demonstrations">
              <div className="start-page-demonstration-todo-tasks">
                <div className={`start-page-demonstration-task ${ready ? "color-ready" : "color-not-ready"}`}>
                  <span>Task1</span>
                  <label className={`task-bg ${ready ? "ready" : "not-ready"}`}>
                    <button
                      onClick={() => setReady((prev) => !prev)}
                      className={`task-slider ${ready ? "task-ready" : "task-not-ready"}`}
                    >
                      {ready ? "✓" : "✗"}
                    </button>
                  </label>
                </div>
                <div className={`start-page-demonstration-task ${ready2 ? "color-ready" : "color-not-ready"}`}>
                  <span>Task2</span>
                  <label
                    className={`task-bg ${ready2 ? "ready" : "not-ready"}`}
                  >
                    <button
                      onClick={() => setReady2((prev) => !prev)}
                      className={`task-slider ${ready2 ? "task-ready" : "task-not-ready"}`}
                    >
                      {ready2 ? "✓" : "✗"}
                    </button>
                  </label>
                </div>
              </div>
              <div className="task-buttons">
                <GoodButton type="button">
                  <span>add</span>
                </GoodButton>
                <BadButton type="button">
                  <span>del</span>
                </BadButton>
              </div>
            </div>
          </div>
          <div className="starting-page-links">
            <Button type="button">
              <span>Finance</span>
            </Button>
            <div className="start-page-demonstration-todo-outside open-start-page-demonstrations"></div>
          </div>
          <div className="starting-page-links">
            <Button type="button">
              <span>Calendar</span>
            </Button>
            <div className="start-page-demonstration-todo-outside open-start-page-demonstrations"></div>
          </div>
        </div>
      </div>
    </>
  );
};
