import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Drawer, Select, DatePicker } from "antd";
import dynamic from "next/dynamic";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import moment from "moment";
import axios from "axios";
const token = localStorage.getItem("accessToken");

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
  const [content, setContent] = useState("");
  const [contentToSave, setContentToSave] = useState("");
  const [users, setUsers] = useState([]);

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/documents/editor"), { ssr: false }),
    [content]
  );

  const { resolvedTheme } = useTheme();

  const titleRef = useRef(null);
  const assignedRef = useRef(null);
  const [status, setStatus] = useState(selectedTask?.status);
  const [startDate, setStartDate] = useState(
    selectedTask?.startDate ? moment(selectedTask.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    selectedTask?.endDate ? moment(selectedTask.endDate) : null
  );

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

  const getUsers = async () => {
    try {
      const { data } = await axios("http://localhost:3851/api/v1/auth/users", {
        headers: { Authorization: token },
      });
      setUsers(data?.data || []);
    } catch (error) {
      setUsers([]);
    }
  };

  const callUpdateAPI = (values) => {
    axios
      .put(
        `http://localhost:3851/api/v1/kanban/task/${selectedTask?._id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
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
      taskContent: contentToSave,
      group: selectedTask?.group || "",
      kanban: selectedTask?.kanban || "",
    };
    debouncedCallAPI(values);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setContent("");
    setContent(selectedTask?.taskContent || "");
    setContentToSave(selectedTask?.taskContent || "");
    setStatus(selectedTask?.status);
    setStartDate(
      selectedTask?.startDate ? moment(selectedTask.startDate) : null
    );
    setEndDate(selectedTask?.endDate ? moment(selectedTask.endDate) : null);
  }, [selectedTask]);

  useEffect(() => {
    if (titleRef.current)
      titleRef.current.addEventListener("input", handleAutoSave);

    return () => {
      if (titleRef.current)
        titleRef.current.removeEventListener("input", handleAutoSave);
    };
  }, [status, startDate, endDate]);

  useEffect(() => {
    if (selectedTask?._id) {
      handleAutoSave();
    }
  }, [status, startDate, endDate, contentToSave]);

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

  const onChange = (content) => {
    setContentToSave(content);
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
            defaultValue={selectedTask?.assigned.map((user)=>({key: user?._id, value: user?.name}))}
            onChange={handleAssignedChange}
            dropdownStyle={{
              backgroundColor: resolvedTheme === "dark" ? "#1a1a1a" : "#fff",
            }}
          >
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))}
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
            <Editor
              initialContent={content}
              editable={true}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default KanbanDrawer;
