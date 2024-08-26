import React, { useEffect, useState } from "react";
import { PlusOutlined, MoreOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip, Modal, Input, Form } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import KanbanDrawer from "@/components/KanbanDrawer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const KanbanTaskStatus = Object.freeze({
  Todo: "Todo",
  IN_PROGRESS: "In Progress",
  TESTING: "Testing",
  DONE: "Done",
});

const taskBackground = Object.freeze({
  [KanbanTaskStatus.Todo]: "bg-yellow-300 dark:bg-yellow-600",       // Softer yellow for Todo in light mode, richer yellow in dark mode
  [KanbanTaskStatus.IN_PROGRESS]: "bg-blue-300 dark:bg-blue-600",    // Softer blue for In Progress in light mode, richer blue in dark mode
  [KanbanTaskStatus.TESTING]: "bg-purple-300 dark:bg-purple-600",    // Softer purple for Testing in light mode, richer purple in dark mode
  [KanbanTaskStatus.DONE]: "bg-green-300 dark:bg-green-600",         // Softer green for Done in light mode, richer green in dark mode
});

const statusGroupShadow = Object.freeze({
  [KanbanTaskStatus.Todo]: "border border-yellow-400 shadow-lg shadow-yellow-400 dark:border-yellow-500 dark:shadow-yellow-700",       // Enhanced yellow shadow and border for Todo
  [KanbanTaskStatus.IN_PROGRESS]: "border border-blue-400 shadow-lg shadow-blue-400 dark:border-blue-500 dark:shadow-blue-700",    // Enhanced blue shadow and border for In Progress
  [KanbanTaskStatus.TESTING]: "border border-purple-400 shadow-lg shadow-purple-400 dark:border-purple-500 dark:shadow-purple-700",    // Enhanced purple shadow and border for Testing
  [KanbanTaskStatus.DONE]: "border border-green-400 shadow-lg shadow-green-400 dark:border-green-500 dark:shadow-green-700",         // Enhanced green shadow and border for Done
});




function KanbanDetails() {
  const token = localStorage.getItem("accessToken");
  const [groups, setGroups] = useState([]);
  const [taskList, setTaskList] = useState({});
  const [taskStatus, setTaskStatus] = useState([]);
  const [kanbanBoard, setKanbanBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form] = Form.useForm();
  const { kanbanId } = useParams();

  useEffect(() => {
    scrollTo({ top: 0 });
    getTaskStatus();
    getKanbanBoardById(kanbanId);
  }, [kanbanId]);

  const getTaskStatus = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3851/api/v1/kanban/task/status/list`,
        {
          headers: { Authorization: token },
        }
      );
      setTaskStatus(data?.data || []);
    } catch (error) {
      console.error("Error fetching task status", error);
      setTaskStatus([]);
    }
  };

  const getKanbanBoardById = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3851/api/v1/kanban/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      setKanbanBoard(data?.data);
      getKanbanGroups(id);
    } catch (error) {
      console.error("Error fetching Kanban board", error);
      setKanbanBoard(null);
    }
  };

  const getKanbanGroups = async (kanbanId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3851/api/v1/kanban/group/${kanbanId}`,
        {
          headers: { Authorization: token },
        }
      );
      setGroups(data?.data || []);
      data?.data?.forEach((group) => getTaskListByGroupId(group._id));
    } catch (error) {
      console.error("Error fetching Kanban groups", error);
      setGroups([]);
    }
  };

  const getTaskListByGroupId = async (group) => {
    try {
      const { [group]: removedGroup, ...rest } = taskList;
      setTaskList(rest);

      const { data } = await axios.get(
        `http://localhost:3851/api/v1/kanban/task/${group}`,
        {
          headers: { Authorization: token },
        }
      );

      setTaskList((prevTaskList) => ({
        ...prevTaskList,
        [group]: data?.data,
      }));
    } catch (error) {
      console.error("Error fetching task list", error);
    }
  };

  const createKanbanGroup = async (e) => {
    try {
      const groupData = {
        ...e,
        kanban: kanbanBoard?._id,
        teamspace: kanbanBoard?.teamspace,
      };
      await axios.post("http://localhost:3851/api/v1/kanban/group", groupData, {
        headers: { Authorization: token },
      });
      setIsModalOpen(false);
      form.resetFields();
      getKanbanBoardById(kanbanId);
    } catch (error) {
      console.error("Error creating Kanban group", error);
    }
  };

  const createKanbanTask = async (group, kanban, status) => {
    try {
      await axios.post(
        "http://localhost:3851/api/v1/kanban/task",
        { group, kanban, status },
        {
          headers: { Authorization: token },
        }
      );
      getTaskListByGroupId(group);
    } catch (error) {
      console.error("Error creating Kanban task", error);
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showDrawer = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTask(null);
  };

  const callUpdateAPI = async (values, taskId) => {
    await axios
      .put(`http://localhost:3851/api/v1/kanban/task/${taskId}`, values, {
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "connect.sid=s%3AqVXEUqJF2VEM-4K300V7CAiApctCb0AB.sC%2FnZad4mIc2w%2FEC8415c7nrC18PUuLZplWz3K5GtIo",
        },
      })
      .then(async (response) => {
        console.log("API called successfully:", response.data);
        await getTaskListByGroupId(response?.data?.data?.group);
      })
      .catch((error) => {
        console.error("API call error:", error);
      });
  };

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    const taskData = JSON.parse(draggableId);
    await callUpdateAPI({ status: destination?.droppableId }, taskData?._id);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{kanbanBoard?.name}</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Create New Group
        </Button>

        <Modal
          title="Create new Group"
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          className="rounded-lg dark:bg-gray-800 dark:text-gray-100"
        >
          <Form
            layout="vertical"
            onFinish={createKanbanGroup}
            form={form}
            className="space-y-4"
          >
            <Form.Item
              name="name"
              label="Group Name"
              rules={[
                { required: true, message: "Please enter the group name!" },
              ]}
            >
              <Input placeholder="Group Name" className="rounded-lg" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full rounded-lg bg-blue-500 hover:bg-blue-600"
              >
                Create Group
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <DragDropContext onDragEnd={onDragEnd}>
            <div key={group._id}>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h2 className="text-xl md:text-2xl font-bold mr-2">
                    {group?.name}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {taskStatus.map((status) => (
                  <Droppable droppableId={status}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        key={`${group._id}-${status}`}
                        className={`p-4 rounded-lg bg-gray-600 ${statusGroupShadow[status]}`}
                      >
                        <div className="mb-4">
                          <div className="flex flex-col md:flex-row items-center group">
                            <h3 className="text-lg md:text-xl font-semibold mr-2 camelCase">
                              {status}
                            </h3>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Tooltip title="Add New Task">
                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    createKanbanTask(
                                      group._id,
                                      kanbanId,
                                      status
                                    )
                                  }
                                />
                              </Tooltip>
                              <Tooltip title="More Actions">
                                <Button type="text" icon={<MoreOutlined />} />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {taskList[group?._id]?.[status]?.map(
                            (task, index) => (
                              <Draggable
                                key={status}
                                draggableId={JSON.stringify({
                                  ...task,
                                  fieldStatus: status,
                                })}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`${taskBackground[status]} p-2 rounded-lg cursor-pointer`}
                                    onClick={() => showDrawer(task)}
                                  >
                                    <div className="flex justify-between items-center group">
                                      <div className="font-semibold">
                                        {task?.title}
                                      </div>
                                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Tooltip title="Edit Task">
                                          <Button
                                            type="text"
                                            icon={<EditOutlined />}
                                          />
                                        </Tooltip>
                                        <Tooltip title="More Actions">
                                          <Button
                                            type="text"
                                            icon={<MoreOutlined />}
                                          />
                                        </Tooltip>
                                      </div>
                                    </div>
                                    <div className="text-sm">
                                      {task?.description}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>
          </DragDropContext>
        ))}
      </div>

      <KanbanDrawer
        selectedTask={selectedTask}
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        getTaskListByGroupId={getTaskListByGroupId}
      />
    </div>
  );
}

export default KanbanDetails;
