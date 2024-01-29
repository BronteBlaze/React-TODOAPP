import { useEffect, useState } from "react";

const ToDo = () => {
  const [time, setTime] = useState("");
  const [work, setWork] = useState("");
  const [timeAndWork, setTimeAndWork] = useState([]);
  const [showTableRow, setTableRow] = useState(false);
  const [updateMode, setUpdateMode] = useState({
    mode: false,
    updateIndex: "",
  });
  const [saveMode, setSaveMode] = useState("insert");
  const [showError, setShowError] = useState({ timeError: "", workError: "" });

  const timeChangeHandler = (event) => {
    setTime(event.target.value);
  };

  const workChangeHandler = (event) => {
    setWork(event.target.value);
  };

  const saveWorkHandler = () => {
    if (time === "") {
      setShowError({ timeError: "Time cannot be empty", workError: "" });
      return;
    } else if (work === "") {
      setShowError({ timeError: "", workError: "Work is mendatory" });
      return;
    }

    if (!updateMode.mode && saveMode !== "update") {
      timeAndWork.push({ time, work });
      setTimeAndWork(timeAndWork);
      setTableRow(true);
      setTime("");
      setWork("");
    } else {
      // Update the array::
      timeAndWork.forEach((eachTimeAndWork, index) => {
        if (index === updateMode.updateIndex) {
          eachTimeAndWork.time = time;
          eachTimeAndWork.work = work;
        }
      });

      setTimeAndWork(timeAndWork);
      setTime("");
      setWork("");
      setSaveMode("insert");
      setUpdateMode(false);
    }

    setShowError({ timeError: "", workError: "" });
  };

  const deleteDataHandler = (indexToBeDelete) => {
    // timeAndWork array => specific time
    let newTimeAndWork = timeAndWork.filter((eachTimeAndWork, index) => {
      return index !== indexToBeDelete;
    });

    setTimeAndWork(newTimeAndWork);
  };

  const updateDataHandler = (timeToBeDeleted, workToBeDeleted, index) => {
    setUpdateMode({ mode: true, updateIndex: index });
    setTime(timeToBeDeleted);
    setWork(workToBeDeleted);
  };

  useEffect(() => {
    if (updateMode.mode) {
      setSaveMode("update");
    }
  }, [updateMode]);

  return (
    <div className="grid grid-cols-6 bg-gray-500 p-12">
      <div className="text-white col-span-2">
        <div>
          <label htmlFor="time">Time</label>
          <div className="mt-2">
            <input
              type="text"
              id="time"
              className={`border ${
                showError.timeError ? "border-red-500" : "border-gray-400"
              } bg-transparent h-10 w-96 p-3`}
              onChange={timeChangeHandler}
              value={time}
            />
          </div>
          {showError.timeError !== "" && (
            <div className="text-red-500 mt-2">{showError.timeError}</div>
          )}
        </div>
        <div className="mt-5">
          <label htmlFor="work">Work</label>
          <div className="mt-2">
            <input
              type="text"
              id="work"
              className={`border ${
                showError.workError ? "border-red-500" : "border-gray-400"
              } bg-transparent h-10 w-96 p-3`}
              onChange={workChangeHandler}
              value={work}
            />
          </div>
          {showError.workError !== "" && (
            <div className="text-red-500 mt-2">{showError.workError}</div>
          )}
        </div>
        <div>
          <button
            type="button"
            className="bg-blue-500 px-6 py-2 rounded-md mt-6 hover:bg-blue-700"
            onClick={saveWorkHandler}
          >
            Save Work
          </button>
        </div>
      </div>

      <div className="col-span-4">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Work</th>
              <th>Delete Work</th>
              <th>Update Work</th>
            </tr>
          </thead>
          <tbody>
            {showTableRow &&
              timeAndWork.length !== 0 &&
              timeAndWork.map((eachTimeAndWork, index) => {
                return (
                  <tr key={index}>
                    <td>{eachTimeAndWork.time}</td>
                    <td>{eachTimeAndWork.work}</td>
                    <td>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500"
                        onClick={() => deleteDataHandler(index)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="px-2 py-2 bg-blue-500"
                        onClick={() =>
                          updateDataHandler(
                            eachTimeAndWork.time,
                            eachTimeAndWork.work,
                            index
                          )
                        }
                      >
                        Update Work
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDo;

// useEffect

// useContext => Context API

// Parent Component => Child Component => Props Pass

// Comp1 => Comp2 => Comp3 => Comp4 => Comp5 => Props Drilling

// store State => context

// steps::

// .jsx or .js => createContext() contextProvider,

// const states = useContext(toDoContext)
