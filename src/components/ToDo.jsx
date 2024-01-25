import { useEffect, useState } from "react";

const ToDo = () => {
  const [time, setTime] = useState("");
  const [work, setWork] = useState("");
  const [timeAndWork, setTimeAndWork] = useState([]);
  const [showTableRow, setTableRow] = useState(false);
  const [updateMode, setUpdateMode] = useState({
    mode: false,
    updateTimeAndWork: {},
  });
  const [saveMode, setSaveMode] = useState("insert");

  const timeChangeHandler = (event) => {
    setTime(event.target.value);
  };

  const workChangeHandler = (event) => {
    setWork(event.target.value);
  };

  const saveWorkHandler = () => {
    console.log();
    if (!updateMode.mode && saveMode !== "update") {
      timeAndWork.push({ time, work });
      setTimeAndWork(timeAndWork);
      setTableRow(true);
      setTime("");
      setWork("");
    } else {
      timeAndWork.forEach((eachTimeAndWork, index) => {
        if (index === updateMode.updateTimeAndWork.index) {
          eachTimeAndWork.time = time;
          eachTimeAndWork.work = work;
        }
      });
      console.log(timeAndWork);
      setTimeAndWork(timeAndWork);
      setTime("");
      setWork("");
      setUpdateMode({ mode: false, updateTimeAndWork: {} });
      setSaveMode("insert");
    }
  };

  const deleteDataHandler = (indexToBeDelete) => {
    // timeAndWork array => specific time
    let newTimeAndWork = timeAndWork.filter((eachTimeAndWork, index) => {
      return index !== indexToBeDelete;
    });

    setTimeAndWork(newTimeAndWork);
  };

  const updateDataHandler = (timeToBeUpdate, workToBeUpdate, index) => {
    setUpdateMode({
      mode: true,
      updateTimeAndWork: { timeToBeUpdate, workToBeUpdate, index },
    });
    setTime(timeToBeUpdate);
    setWork(workToBeUpdate);
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
              className="border border-gray-400 bg-transparent h-10 w-96 p-3"
              onChange={timeChangeHandler}
              value={time}
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="work">Work</label>
          <div className="mt-2">
            <input
              type="text"
              id="work"
              className="border border-gray-400 bg-transparent h-10 w-96 p-3"
              onChange={workChangeHandler}
              value={work}
            />
          </div>
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
