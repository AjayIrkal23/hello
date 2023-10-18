import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { BiSolidSend } from "react-icons/bi";
import { AllContext } from "../../context/All";
import axios from "../../api/axios";

const ChatInput = ({ chart }) => {
  const {
    setHighlightedNodes,
    changeReq,
    setChangeReq,
    newNodes,
    setNewNodes,
  } = useContext(AllContext);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const boxShadowStyle = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

  const handleAddNewNodes = () => {
    newNodes.forEach((node) => {
      console.log(node);
      chart
        .addNode({
          id: node.name,
          parentId: node.parentId,
          name: node.name,
          type: node.type,
          isNew: true,
          functionCode: node.code,
          functionExplanation: node.functionExplaination,
        })
        .render();
    });
  };

  useEffect(() => {
    handleAddNewNodes();
  }, [newNodes]);

  const handleSendButtonClick = async () => {
    if (inputValue.toLowerCase().includes("google")) {
      try {
        await axios.get("/case1").then((res) => {
          let arr = [];
          res.data.map((item) => {
            arr.push(item.newCode.functionName);
          });
          setHighlightedNodes(arr);
          setChangeReq(res.data);

          // new nodes
          let newNodesArr = [];
          res.data.map((item) => {
            if (item.newNodes) {
              item?.newNodes?.newNode.map((item) => {
                newNodesArr.push(item);
              });
            }
          });

          setNewNodes(newNodesArr);
        });
      } catch (err) {
        console.log(err);
      }
    } else if (inputValue.toLowerCase().includes("model")) {
      try {
        console.log("hello");
        await axios.get("/case2").then((res) => {
          console.log(res.data, "resp");
          let arr = [];
          res.data.map((item) => {
            if (item.newCode) {
              arr.push(item.newCode.functionName);
            }
          });
          setHighlightedNodes(arr);
          setChangeReq(res.data);

          // new nodes
          let newNodesArr = [];
          res.data.map((item) => {
            if (item.newNodes) {
              item?.newNodes?.newNode.map((item) => {
                newNodesArr.push(item);
              });
            }
          });
          console.log(newNodesArr, "arr");

          setNewNodes(newNodesArr);
        });
      } catch (err) {
        console.log(err);
      }
    }
    setInputValue("");
  };

  const isSendDisabled = inputValue.trim() === "";

  return (
    <Box
      w={"50%"}
      style={{
        position: "absolute",
        bottom: "25px",
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: boxShadowStyle,
      }}
    >
      <InputGroup bg={"white"}>
        <Input
          placeholder="Enter Change Request"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          border={"1px solid #304497"}
          _focus={{
            boxShadow: "0 0 0 1px #304497",
            border: "2px solid #304497",
          }}
        />
        <InputRightElement pr={"10px"}>
          <IconButton
            onClick={handleSendButtonClick}
            isDisabled={isSendDisabled}
            variant="solid"
            color={"white"}
            bg={"brand.primary"}
            aria-label="Done"
            fontSize="20px"
            h={"80%"}
            icon={<BiSolidSend />}
            _hover={{
              bg: "brand.secondary",
            }}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default ChatInput;
