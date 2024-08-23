import React, { useEffect, useState } from "react";
import { PlusOutlined, MoreOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Button, Tooltip, Modal, Input, Form, Drawer } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import KanbanDrawer from "@/components/KanbanDrawer";

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

  // Fetch task statuses
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

  // Fetch Kanban board by ID
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

  // Fetch Kanban groups by Kanban ID
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

  // Fetch task list by group ID
  const getTaskListByGroupId = async (group) => {
    try {
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

  // Create a new Kanban group
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

  // Create a new Kanban task and fetch the updated list
  const createKanbanTask = async (group, kanban, status) => {
    try {
      await axios.post(
        "http://localhost:3851/api/v1/kanban/task",
        { group, kanban, status },
        {
          headers: { Authorization: token },
        }
      );
      // Re-fetch the task list for the updated group to get the latest data
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

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white">
      {/* Kanban Title with Create Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          {kanbanBoard?.name}
        </h1>
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
              rules={[{ required: true, message: "Please enter the group name!" }]}
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

      {/* Kanban Groups and Tasks */}
      <div className="space-y-6">
        {groups.map((group) => (
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
                <div
                  key={`${group._id}-${status}`}
                  className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800"
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
                              createKanbanTask(group._id, kanbanId, status)
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
                    {taskList[group?._id]?.[status]?.map((task) => (
                     <div
                     key={task._id}
                     className="dark:bg-gray-700 dark:border-gray-600 border border-gray-600 p-2 rounded-lg cursor-pointer"
                     onClick={() => showDrawer(task)}
                   >
                     <div className="flex justify-between items-center group">
                       <div className="font-semibold">{task?.title}</div>
                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Tooltip title="Edit Task">
                           <Button type="text" icon={<EditOutlined />} />
                         </Tooltip>
                         <Tooltip title="More Actions">
                           <Button type="text" icon={<MoreOutlined />} />
                         </Tooltip>
                       </div>
                     </div>
                     <div className="text-sm">{task?.description}</div>
                   </div>
                   
                    
                    
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer for Task Details */}
      <KanbanDrawer
        selectedTask={selectedTask}
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
      />
    </div>
  );
}

export default KanbanDetails;
