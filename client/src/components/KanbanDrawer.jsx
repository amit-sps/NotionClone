import { Drawer, Select, DatePicker } from "antd";
import React, { useEffect, useRef } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import moment from 'moment'; // Make sure moment is installed

const { Option } = Select;

const KanbanDrawer = ({ closeDrawer, isDrawerOpen, users, taskData, onUpdate }) => {
  const editor = useBlockNote();

  const titleRef = useRef(null);
  const statusRef = useRef(null);
  const assignedRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    const handleAutoSave = () => {
      const values = {
        title: titleRef.current?.innerText || '',
        status: statusRef.current?.getAttribute("data-value") || '',
        assigned: Array.from(assignedRef.current?.selectedOptions || []).map(option => option.value),
        startDate: startDateRef.current?.input?.value || '',
        endDate: endDateRef.current?.input?.value || '',
        taskContent: editor.getValue(),
      };
      onUpdate(values);
    };

    if (titleRef.current) titleRef.current.addEventListener("input", handleAutoSave);
    if (statusRef.current) statusRef.current.addEventListener("change", handleAutoSave);
    if (assignedRef.current) assignedRef.current.addEventListener("change", handleAutoSave);
    if (startDateRef.current) startDateRef.current.addEventListener("change", handleAutoSave);
    if (endDateRef.current) endDateRef.current.addEventListener("change", handleAutoSave);

    return () => {
      if (titleRef.current) titleRef.current.removeEventListener("input", handleAutoSave);
      if (statusRef.current) statusRef.current.removeEventListener("change", handleAutoSave);
      if (assignedRef.current) assignedRef.current.removeEventListener("change", handleAutoSave);
      if (startDateRef.current) startDateRef.current.removeEventListener("change", handleAutoSave);
      if (endDateRef.current) endDateRef.current.removeEventListener("change", handleAutoSave);
    };
  }, [editor, onUpdate]);

  return (
    <Drawer
      placement="right"
      onClose={closeDrawer}
      open={isDrawerOpen}
      width={600}
      className="dark:bg-gray-800 dark:text-white p-6"
    >
      <div className="flex flex-col space-y-6">
        {/* Task Title */}
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          className="text-4xl font-bold dark:bg-gray-800 dark:text-white focus:outline-none p-4 rounded-lg border border-gray-700 hover:bg-gray-700"
        >
          {taskData?.title || 'Untitled Task'}
        </div>

        {/* Task Status */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 dark:text-gray-400 font-medium">Status:</span>
          <Select
            ref={statusRef}
            className="w-32 dark:bg-gray-700 dark:text-white rounded-lg"
            defaultValue={taskData?.status || "Todo"}
            onChange={(value) => statusRef.current?.setAttribute("data-value", value)}
          >
            <Option value="Todo">Todo</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Testing">Testing</Option>
            <Option value="Done">Done</Option>
          </Select>
        </div>

        {/* Assigned Users */}
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500 dark:text-gray-400 font-medium">Assigned To:</span>
          <Select
            ref={assignedRef}
            mode="multiple"
            className="dark:bg-gray-700 dark:text-white rounded-lg"
            placeholder="Select users"
            defaultValue={taskData?.assigned || []}
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
          <div className="flex flex-col space-y-2">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Start Date:</span>
            <DatePicker
              ref={startDateRef}
              className="dark:bg-gray-700 dark:text-white rounded-lg"
              style={{ width: '100%' }}
              defaultValue={taskData?.startDate ? moment(taskData.startDate) : null}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-gray-500 dark:text-gray-400 font-medium">End Date:</span>
            <DatePicker
              ref={endDateRef}
              className="dark:bg-gray-700 dark:text-white rounded-lg"
              style={{ width: '100%' }}
              defaultValue={taskData?.endDate ? moment(taskData.endDate) : null}
            />
          </div>
        </div>

        {/* Task Content */}
        <div className="mt-6">
          <BlockNoteView editor={editor} className="dark:bg-gray-800 dark:text-white border-none p-4 rounded-lg" />
        </div>
      </div>
    </Drawer>
  );
};

export default KanbanDrawer;
