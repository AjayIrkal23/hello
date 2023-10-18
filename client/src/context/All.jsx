import React, { createContext, useEffect, useState } from "react";

const AllContext = createContext();

export function AllProvider({ children }) {
  const [data, setData] = useState(null);
  const [currentApp, setCurrentApp] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [changeReq, setChangeReq] = useState([]);
  const [changingNode, setChangingNode] = useState(null);
  const [node, setNode] = useState(null);
  const [newNodes, setNewNodes] = useState([]);

  console.log(node);

  const handleNode = () => {
    changeReq.map((item) => {
      if (node == item.newCode.functionName) {
        setChangingNode(item);
      }
    });
  };

  useEffect(() => {
    handleNode();
  }, [node]);

  return (
    <AllContext.Provider
      value={{
        data,
        setData,
        currentApp,
        setCurrentApp,
        highlightedNodes,
        setHighlightedNodes,
        changeReq,
        setChangeReq,
        changingNode,
        setChangingNode,
        node,
        setNode,
        newNodes,
        setNewNodes,
      }}
    >
      {children}
    </AllContext.Provider>
  );
}

export { AllContext };
