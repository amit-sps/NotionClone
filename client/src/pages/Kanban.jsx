import React, { useState } from "react";
import { Button, Modal, Form, Select, Checkbox, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getMyKanbanBoards } from "@/redux/action/kanban";

const Kanban = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamspaceChecked, setIsTeamspaceChecked] = useState(false);
  const { teamSpaces } = useSelector((state) => state.TeamSpaceReducer);
  const dispatch = useDispatch();

  // Function to handle modal open
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Function to handle form submission
  const createKanbanBoard = async(values) => {
    try {
      const token = localStorage.getItem("accessToken");

      let data = {name: values?.name}
      if(values?.isTeamspace){
        data["teamspace"]=values?.teamspace
      }
      const {data:response} = await axios.post("http://localhost:3851/api/v1/kanban",data,{
        headers:{
          Authorization: token
        }
      })

      dispatch(getMyKanbanBoards());
      navigate(`/kanban/${response?.data?._id}`)
      // Handle form submission logic here
      setIsModalOpen(false); // Close modal after submission
      // navigate('/path-to-kanban'); // Navigate to the newly created Kanban board (if needed)
    } catch (error) {
      
    }
   
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsTeamspaceChecked(e.target.checked);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Kanban Board
        </h1>
        <Button
          onClick={showModal}
          type="primary"
          size="large"
          className="rounded-lg px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 transition duration-300"
        >
          + New Kanban Board
        </Button>
      </div>

      <Modal
        title="Create New Kanban Board"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="rounded-lg dark:bg-gray-800 dark:text-gray-100"
      >
        <Form
          layout="vertical"
          onFinish={createKanbanBoard}
          className="space-y-4"
        >
          <Form.Item
            name="isTeamspace"
            valuePropName="checked"
            className="flex justify-end items-center"
          >
            <Checkbox onChange={handleCheckboxChange} className="text-gray-900">
              Teamspace
            </Checkbox>
          </Form.Item>

          {isTeamspaceChecked && (
            <Form.Item
              name="teamspace"
              label="Select Teamspace"
              rules={[
                { required: true, message: "Please select a teamspace!" },
              ]}
            >
              <Select placeholder="Select a Teamspace" className="rounded-lg">
                {teamSpaces.map((teamspace) => (
                  <Select.Option value={teamspace?._id}>
                    {teamspace?.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="name"
            label="Kanban Board Name"
            rules={[
              { required: true, message: "Please enter the board name!" },
            ]}
          >
            <Input
              placeholder="Enter Kanban Board Name"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-lg bg-blue-500 hover:bg-blue-600"
            >
              Create Kanban Board
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kanban;
