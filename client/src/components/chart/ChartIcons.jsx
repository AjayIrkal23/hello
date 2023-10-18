import React, { useContext } from "react";
import {
  IconButton,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineClear,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AllContext } from "../../context/All";

const ChartIcons = ({ chart }) => {
  const { newNodes, setNewNodes } = useContext(AllContext);

  const containerStyle = {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  // function filterChart(e) {
  //   // Get input value
  //   const value = e.srcElement.value;

  //   // Clear previous higlighting
  //   chart.clearHighlighting();

  //   // Get chart nodes
  //   const data = chart.data();

  //   // Mark all previously expanded nodes for collapse
  //   data.forEach((d) => (d._expanded = false));

  //   // Loop over data and check if input value matches any name
  //   data.forEach((d) => {
  //     if (value != "" && d.id === value) {
  //       // If matches, mark node as highlighted
  //       d._highlighted = true;
  //       d._expanded = true;
  //     }
  //   });

  //   // Update data and rerender graph
  //   chart.data(data).render().fit();
  // }

  const handleRemoveNewNodes = () => {
    newNodes.forEach((node) => {
      chart.removeNode(node.id);
    });
  };

  return (
    <>
      <div style={containerStyle}>
        <Stack direction={"column"} gap={3}>
          <IconButton
            isRound={true}
            variant="outline"
            colorScheme="teal"
            aria-label="Send email"
            icon={<AiOutlineClear />}
            fontSize="20px"
            color={"brand.primary"}
            background={"white"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            _hover={{ background: "brand.secondary", color: "white" }}
            onClick={() => {
              chart.clearHighlighting();
              handleRemoveNewNodes();
            }}
          />

          <IconButton
            isRound={true}
            variant="outline"
            colorScheme="teal"
            aria-label="Send email"
            icon={<AiOutlineZoomIn />}
            fontSize="20px"
            color={"brand.primary"}
            background={"white"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            _hover={{ background: "brand.secondary", color: "white" }}
            onClick={() => chart.zoomIn()}
          />

          <IconButton
            isRound={true}
            variant="outline"
            colorScheme="teal"
            aria-label="Send email"
            icon={<AiOutlineZoomOut />}
            fontSize="20px"
            color={"brand.primary"}
            background={"white"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            _hover={{ background: "brand.secondary", color: "white" }}
            onClick={() => chart.zoomOut()}
          />
        </Stack>
      </div>
      {/* <InputGroup
        w={"400px"}
        style={{ position: "absolute", top: "10px", right: "70px" }}
      >
        <InputLeftElement pointerEvents="none">
          <BsSearch color="gray.300" />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search Node"
          onInput={() => filterChart(event)}
        />
      </InputGroup> */}
    </>
  );
};

export default ChartIcons;
