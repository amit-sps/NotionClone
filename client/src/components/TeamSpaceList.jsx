import React, { useState } from "react";
import { PlusOutlined, DeleteOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";
import 'tailwindcss/tailwind.css';

const TeamSpaces = () => {
  const [teamSpaces, setTeamSpaces] = useState([
    { id: 1, name: 'Team Alpha', children: [] },
    { id: 2, name: 'Team Beta', children: [] },
    { id: 3, name: 'Team Gamma', children: [] },
  ]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const handleSelect = (key) => {
    setSelectedKey(key);
  };

  const handleExpand = (key) => {
    setExpandedKeys((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const handleIconClick = async (key) => {
    try {
      const newTeamSpace = { id: teamSpaces.length + 1, name: `Team ${teamSpaces.length + 1}`, children: [] };
      setTeamSpaces([...teamSpaces, newTeamSpace]);
    } catch (error) {
      console.error("Error adding new team space", error);
    }
  };

  const handleDeleteClick = async (key) => {
    try {
      await axios.delete(`/api/teamspaces/${key}`);
      setTeamSpaces(teamSpaces.filter((teamSpace) => teamSpace.id !== key));
    } catch (error) {
      console.error("Error deleting team space", error);
    }
  };

  const renderTreeNodes = (nodes) => {
    return nodes.map(({ id, name, children }) => (
      <div key={id} className={`tree-node px-4 ${selectedKey === id ? " text-white" : ""} transition-colors`}>
        <div className="flex items-center cursor-pointer group gap-1" onClick={() => handleExpand(id)}>
          <div className="flex-shrink-0">
            {expandedKeys.includes(id) ? <DownOutlined /> : <RightOutlined />}
          </div>
          <div className="flex-grow flex items-center justify-between">
            <span className="tree-title" onClick={() => handleSelect(id)}>
              {name}
            </span>
            <div className="flex items-center">
              <DeleteOutlined
                className="ml-0.5 group-hover:text-red-600 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(id);
                }}
              />
              <PlusOutlined
                className="ml-0.5 group-hover:text-green-600 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(id);
                }}
              />
            </div>
          </div>
        </div>
        {expandedKeys.includes(id) && children && (
          <div className="pl-4">
            {renderTreeNodes(children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="tree-container p-4 text-white">
      {renderTreeNodes(teamSpaces)}
    </div>
  );
};

export default TeamSpaces;
