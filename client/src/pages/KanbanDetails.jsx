import React, { useEffect, useState } from "react";
import { PlusOutlined, MoreOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Button, Tooltip, Modal, Input, Form, Drawer } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import KanbanDrawer from "@/components/KanbanDrawer";

function KanbanDetails() {
  const token = localStorage.getItem("accessToken");
  const [groups, setGroups] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [kanbanBoard, setKanbanBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form] = Form.useForm();

  const { kanbanId } = useParams();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTask(null);
  };

  const getTaskStatus = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3851/api/v1/kanban/task/status/list`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTaskStatus(data?.data || []);
    } catch (error) {
      setTaskStatus([]);
    }
  };

  const getKanbanBoardById = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3851/api/v1/kanban/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setKanbanBoard(data?.data);
      getKanbanGroups(id);
    } catch (error) {
      setKanbanBoard(null);
    }
  };

  const getKanbanGroups = async (kanbanId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3851/api/v1/kanban/group/${kanbanId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setGroups(data?.data || []);
    } catch (error) {
      setGroups([]);
    }
  };

  const createKanbanGroup = async (e) => {
    try {
      const data = {
        ...e,
        kanban: kanbanBoard?._id,
        teamspace: kanbanBoard?.teamspace,
      };
      await axios.post("http://localhost:3851/api/v1/kanban/group", data, {
        headers: {
          Authorization: token,
        },
      });
      setIsModalOpen(false);
      form.resetFields();
      getKanbanBoardById(kanbanId);
    } catch (error) {}
  };

  const createKanbanTask = async (group, kanban, status) => {
    try {
      const data = { group, kanban, status };

      await axios.post("http://localhost:3851/api/v1/kanban/task", data, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    getTaskStatus();
    getKanbanBoardById(kanbanId);
  }, [kanbanId]);

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white">
      {/* Kanban Title with Create Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          {kanbanBoard && kanbanBoard?.name}
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
            className="space-y-4"
          >
            <Form.Item
              name="name"
              label="Group Name"
              rules={[
                { required: true, message: "Please enter the board name!" },
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
        {groups &&
          groups.map((group) => (
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
                  <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
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
                      <Card
                        className="dark:bg-gray-700 dark:border-gray-600"
                        onClick={() =>
                          showDrawer({
                            name: "Task 1",
                            description: "Description of Task 1",
                          })
                        }
                      >
                        <div className="flex justify-between items-center group">
                          <div className="font-semibold">Task 1</div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip title="Edit Task">
                              <Button type="text" icon={<EditOutlined />} />
                            </Tooltip>
                            <Tooltip title="More Actions">
                              <Button type="text" icon={<MoreOutlined />} />
                            </Tooltip>
                          </div>
                        </div>
                        <div className="text-sm">Description of Task 1</div>
                      </Card>
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
        closeDrawer={closeDrawer}
        isDrawerOpen={isDrawerOpen}
      />
    </div>
  );
}

export default KanbanDetails;
