export const priorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return {
          bg: "bg-priority-1",
          txt: "text-txt-priority-1 text-shadow-md text-shadow-txt-shadow-priority-1 3xl:text-shadow-2xl",
        };
      case 2:
        return {
          bg: "bg-priority-2",
          txt: "text-txt-priority-2 text-shadow-md text-shadow-txt-shadow-priority-2 3xl:text-shadow-2xl",
        };
      case 3:
        return {
          bg: "bg-priority-3",
          txt: "text-txt-priority-3 text-shadow-md text-shadow-txt-shadow-priority-3 3xl:text-shadow-2xl",
        };
      case 4:
        return {
          bg: "bg-priority-4",
          txt: "text-txt-priority-4 text-shadow-md text-shadow-txt-shadow-priority-4 3xl:text-shadow-2xl",
        };
      default:
        return {
          bg: "bg-priority-5",
          txt: "text-txt-priority-5 text-shadow-md text-shadow-txt-shadow-priority-5 3xl:text-shadow-2xl",
        };
    }
  };