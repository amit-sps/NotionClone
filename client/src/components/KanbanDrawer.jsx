import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Drawer, Select, DatePicker } from "antd";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import dynamic from "next/dynamic";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import moment from "moment";
import axios from "axios";


const { Option } = Select;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 cursor-pointer text-gray-500 dark:text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const KanbanDrawer = ({
  closeDrawer,
  isDrawerOpen,
  getTaskListByGroupId,
  selectedTask,
}) => {

  const [content, setContent] = useState("")

  const changeContent  = async(value)=> {
    setContent(JSON.stringify(value.topLevelBlocks, null, 2))
   }

   const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/documents/editor"), { ssr: false }),
    [selectedTask?.taskContent]
  );

  const editor = useBlockNote({
    initialContent: selectedTask?.taskContent && JSON.parse(selectedTask?.taskContent || ""),
    onEditorContentChange: changeContent
  });
  const { resolvedTheme } = useTheme();
  console.log(selectedTask)

  const titleRef = useRef(null);
  const assignedRef = useRef(null);
  const [status, setStatus] = useState(selectedTask?.status);
  const [startDate, setStartDate] = useState(
    selectedTask?.startDate ? moment(selectedTask.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    selectedTask?.endDate ? moment(selectedTask.endDate) : null
  );

  useEffect(()=>{
    setStatus(selectedTask?.status);
    setStartDate(selectedTask?.startDate ? moment(selectedTask.startDate) : null)
    setEndDate(selectedTask?.endDate ? moment(selectedTask.endDate) : null)

  }, [selectedTask])

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };



  const callUpdateAPI = (values) => {
    axios
      .put(
        `http://localhost:3851/api/v1/kanban/task/${selectedTask?._id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Cookie:
              "connect.sid=s%3AqVXEUqJF2VEM-4K300V7CAiApctCb0AB.sC%2FnZad4mIc2w%2FEC8415c7nrC18PUuLZplWz3K5GtIo",
          },
        }
      )
      .then(async (response) => {
        console.log("API called successfully:", response.data);
        await getTaskListByGroupId(response?.data?.data?.group);
      })
      .catch((error) => {
        console.error("API call error:", error);
      });
  };

  // Debounced API call
  const debouncedCallAPI = useCallback(debounce(callUpdateAPI, 500), [
    selectedTask?._id,
  ]);

  const handleAutoSave = () => {
    const values = {
      title: titleRef.current?.innerText || "",
      status: status,
      assigned: assignedRef.current || [],
      startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
      endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
      taskContent: content,
      group: selectedTask?.group || "",
      kanban: selectedTask?.kanban || "",
    };
    debouncedCallAPI(values);
  };

  useEffect(() => {
    if (titleRef.current)
      titleRef.current.addEventListener("input", handleAutoSave);

    return () => {
      if (titleRef.current)
        titleRef.current.removeEventListener("input", handleAutoSave);
    };
  }, [status, startDate, endDate, editor.topLevelBlocks]);

  useEffect(() => {
    handleAutoSave();
  }, [ status, startDate, endDate, content]);

  const handleStatusChange = (value) => {
    setStatus(value);
    handleAutoSave();
  };

  const handleAssignedChange = (value) => {
    assignedRef.current = value;
    handleAutoSave();
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    handleAutoSave();
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    handleAutoSave();
  };

  return (
    <Drawer
      placement="right"
      onClose={closeDrawer}
      open={isDrawerOpen}
      width={600}
      className="dark:bg-gray-900 dark:text-white p-0 overflow-auto"
      closeIcon={<CloseIcon />}
    >
      <div className="flex flex-col space-y-6 h-full">
        {/* Task Title */}
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          className="text-3xl font-semibold dark:bg-transparent dark:text-white focus:outline-none p-1 rounded-lg border-none placeholder-gray-500 hover:bg-gray-800/20 transition-colors duration-200 ease-in-out"
          style={{ borderBottom: "1px solid transparent" }}
        >
          {selectedTask?.title || "Untitled Task"}
        </div>

        {/* Task Status */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Status:
          </span>
          <Select
            className="w-32 dark:bg-transparent dark:text-white border-none shadow-none hover:border-none focus:ring-0 p-0"
            value={status}
            onChange={handleStatusChange}
            dropdownStyle={{
              backgroundColor: resolvedTheme === "dark" ? "#1a1a1a" : "#fff",
            }}
          >
            <Option value="Todo">Todo</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Testing">Testing</Option>
            <Option value="Done">Done</Option>
          </Select>
        </div>

        {/* Assigned Users */}
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Assigned To:
          </span>
          <Select
            mode="multiple"
            className="dark:bg-transparent dark:text-white border-none shadow-none hover:border-none focus:ring-0 p-0"
            placeholder="Select users"
            defaultValue={[]}
            onChange={handleAssignedChange}
            dropdownStyle={{
              backgroundColor: resolvedTheme === "dark" ? "#1a1a1a" : "#fff",
            }}
          >
            {/* {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))} */}
          </Select>
        </div>

        {/* Task Dates */}
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-2 flex-1">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Start Date:
              </span>
              <DatePicker
                className="flex-1 p-1 dark:bg-transparent dark:text-white dark:border-gray-700 dark:placeholder-gray-500 border border-blue-300 shadow-lg ring-0 ring-blue-300"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Start date"
                dropdownClassName={resolvedTheme === "dark" ? "dark-theme" : ""}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 flex-1">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                End Date:
              </span>
              <DatePicker
                className="flex-1 p-1 dark:bg-transparent dark:text-white dark:border-gray-700 dark:placeholder-gray-500 border border-blue-300 shadow-lg ring-0 ring-blue-300"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End date"
                dropdownClassName={resolvedTheme === "dark" ? "dark-theme" : ""}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Task Content Editor */}
        <div className="flex-grow overflow-hidden mt-6">
          <div className="dark:bg-transparent dark:text-white border-none rounded-lg p-4 h-full overflow-y-auto">
          <Editor initialContent={selectedTask?.taskContent} editable={true} onChange={setContent}/>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default KanbanDrawer;
