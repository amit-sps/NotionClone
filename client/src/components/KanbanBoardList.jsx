import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPrivatePages } from "@/redux/action/privatePage";
import NotionLogo from "./documents/NotionLogo";
import { path } from "@/Api/newtorkPaths";
import { getMyKanbanBoards } from "@/redux/action/kanban";

const TreeNode = ({
  title,
  keys,
  icon,
  isSelected,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(title);

  const handleNodeClick = () => {
    setExpanded(!expanded);
  };

  const handleTitleClick = () => {
    navigate(`/kanban/${keys}`);
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
              <NotionLogo
                letter={icon?.toUpperCase()}
              />
              {/* <span className="text-lg">{icon}</span> */}
            </div>
          </p>
          <span className="tree-title" onClick={handleTitleClick}>
            {title}
          </span>
          {/* <DeleteOutlined
            className="ml-0.5 group-hover:text-red-600 opacity-0 group-hover:opacity-100"
            // onClick={(e) => {
            //   e.stopPropagation();
            //   trashDocument(keys);
            // }}
          /> */}
          {/* <PlusOutlined
            className="ml-0.5 group-hover:text-green-600 opacity-0 group-hover:opacity-100"
            // onClick={(e) => {
            //   e.stopPropagation();
            //   onIconClick(keys);
            // }}
          /> */}
        </div>
      </div>
    </div>
  );
};

const formatTreeData = (docs) => {
  return docs.map(({ name, _id }) => ({
    name,
    _id
  }));
};

const KanbanBoardList = () => {
  const { myKanbanBoards } = useSelector((state) => state.KanbanBoardsReducer);
  const [treeData, setTreeData] = useState(formatTreeData(myKanbanBoards || []));
  const dispatch = useDispatch();

  useEffect(() => {
    setTreeData(formatTreeData(myKanbanBoards || []));
  }, [myKanbanBoards]);

  useEffect(() => {
    dispatch(getMyKanbanBoards());
  }, []);

  const renderTreeNodes = (nodes) => {
    return nodes.map(({ name, _id }) => (
      <TreeNode
        keys={_id}
        title={name}
        icon={name[0].toUpperCase()}
      >
      </TreeNode>
    ));
  };

  return <div className="tree-container">{renderTreeNodes(treeData)}</div>;
};

export default KanbanBoardList;
