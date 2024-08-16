import React from "react";
import { PlusOutlined, MoreOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Button, Tooltip } from "antd";

function KanbanDetails() {
  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white">
      {/* Kanban Title with Create Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Kanban</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Create New Board
        </Button>
      </div>

      <div className="space-y-6">
        {/* Group 1 */}
        <div>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center group">
              <h2 className="text-xl md:text-2xl font-bold mr-2">Group 1</h2>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip title="Add New Column">
                  <Button type="text" icon={<PlusOutlined />} />
                </Tooltip>
                <Tooltip title="More Actions">
                  <Button type="text" icon={<MoreOutlined />} />
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Todo Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">Todo</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
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

            {/* In Progress Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">In Progress</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex justify-between items-center group">
                    <div className="font-semibold">Task 2</div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip title="Edit Task">
                        <Button type="text" icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm">Description of Task 2</div>
                </Card>
              </div>
            </div>

            {/* Testing Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">Testing</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex justify-between items-center group">
                    <div className="font-semibold">Task 3</div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip title="Edit Task">
                        <Button type="text" icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm">Description of Task 3</div>
                </Card>
              </div>
            </div>

            {/* Done Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">Done</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex justify-between items-center group">
                    <div className="font-semibold">Task 4</div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip title="Edit Task">
                        <Button type="text" icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm">Description of Task 4</div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2 */}
        <div>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center group">
              <h2 className="text-xl md:text-2xl font-bold mr-2">Group 2</h2>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip title="Add New Column">
                  <Button type="text" icon={<PlusOutlined />} />
                </Tooltip>
                <Tooltip title="More Actions">
                  <Button type="text" icon={<MoreOutlined />} />
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Todo Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">Todo</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex justify-between items-center group">
                    <div className="font-semibold">Task 5</div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip title="Edit Task">
                        <Button type="text" icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm">Description of Task 5</div>
                </Card>
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">In Progress</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex justify-between items-center group">
                    <div className="font-semibold">Task 6</div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip title="Edit Task">
                        <Button type="text" icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm">Description of Task 6</div>
                </Card>
              </div>
            </div>

            {/* Testing Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">Testing</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex justify-between items-center group">
                    <div className="font-semibold">Task 7</div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip title="Edit Task">
                        <Button type="text" icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm">Description of Task 7</div>
                </Card>
              </div>
            </div>

            {/* Done Column */}
            <div className="bg-gray-800 p-4 rounded-lg dark:bg-gray-800">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center group">
                  <h3 className="text-lg md:text-xl font-semibold mr-2">Done</h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Add New Task">
                      <Button type="text" icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Card className="dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex justify-between items-center group">
                    <div className="font-semibold">Task 8</div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip title="Edit Task">
                        <Button type="text" icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm">Description of Task 8</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KanbanDetails;
