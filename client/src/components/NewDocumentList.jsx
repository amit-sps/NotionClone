import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPrivatePages } from "@/redux/action/privatePage";
import NotionLogo from "./documents/NotionLogo";

const TreeNode = ({
  title,
  icon,
  keys,
  children,
  onSelect,
  onIconClick,
  isSelected,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNodeClick = () => {
    setExpanded(!expanded);
  };

  const handleTitleClick = () => {
    onSelect(keys);
    navigate(`/documents/${keys}`);
  };

  return (
    <div
      className={`tree-node px-4 ${
        isSelected ? "bg-gray-700 text-white" : ""
      } transition-colors`}
    >
      <div
        className="flex items-center cursor-pointer group"
        onClick={handleNodeClick}
      >
        {/* Icon for expand/collapse */}
        <div className="flex-shrink-0">
          <span
            className={`tree-icon ${expanded ? "expanded" : "collapsed"}`}
          ></span>
        </div>
        {/* Title and custom + icon */}
        <div className="flex-grow flex items-center justify-between">
          <p className="text-6xl hover:opacity-75 transition">
            <div className="shrink-0 mr-2 text-[10px]">
              <NotionLogo letter={icon?.length?icon: title[0].toUpperCase()}/>
              {/* <span className="text-lg">{icon}</span> */}
            </div>
          </p>
          <span className="tree-title" onClick={handleTitleClick}>
            {title}
          </span>
          <PlusOutlined
            className="ml-2 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onIconClick(keys);
            }}
          />
        </div>
      </div>
      {/* Render children nodes */}
      {expanded && <div className="pl-4">{children}</div>}
    </div>
  );
};

const formatTreeData = (docs) => {
  return docs.map(({ title, _id, icon, children = [] }) => ({
    title,
    key: _id,
    icon: icon,
    children: formatTreeData(children),
  }));
};

const TreeComponent = () => {
  const { privatePages } = useSelector((state) => state.PrivatePageReducer);
  const [treeData, setTreeData] = useState(formatTreeData(privatePages || []));
  const [selectedKey, setSelectedKey] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTreeData(formatTreeData(privatePages || []));
  }, [privatePages]);

  useEffect(() => {
    dispatch(getPrivatePages());
  }, []);

  const handleSelect = (key) => {
    setSelectedKey(key);
    navigate(`/documents/${key}`);
  };

  const handleIconClick = (key) => {
    console.log(`Node key: ${key}`);
  };

  const renderTreeNodes = (nodes) => {
    return nodes.map(({ title, key, icon, children }) => (
      <TreeNode
        keys={key}
        title={title}
        icon={icon}
        onSelect={handleSelect}
        onIconClick={handleIconClick}
        isSelected={key === selectedKey}
      >
        {children && renderTreeNodes(children)}
      </TreeNode>
    ));
  };

  return <div className="tree-container">{renderTreeNodes(treeData)}</div>;
};

export default TreeComponent;
