import React, { useContext, useEffect, useState } from "react";
import OrganizationalChart from "../components/chart/OrgChart";
import chartData from "../data";
import ContentDrawer from "../components/drawers/ContentDrawer";
import HNContentDrawer from "../components/drawers/HNContentDrawer";
import { AllContext } from "../context/All";
import ChatInput from "../components/chart/ChatInput";
import { Spinner } from "@chakra-ui/react";
import ChartIcons from "../components/chart/ChartIcons";

const Chart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});

  // HN = HIGHLIGHTED NODE :))))
  const [isHNDrawerOpen, setIsHNDrawerOpen] = useState(false);
  const [HNDrawerContent, setHNDrawerContent] = useState({});

  const { data } = useContext(AllContext);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openHNDrawer = () => {
    setIsHNDrawerOpen(true);
  };

  const closeHNDrawer = () => {
    setIsHNDrawerOpen(false);
  };

  return data ? (
    <div>
      <OrganizationalChart
        data={data}
        isDrawerOpen={isDrawerOpen}
        isHNDrawerOpen={isHNDrawerOpen}
        openDrawer={openDrawer}
        openHNDrawer={openHNDrawer}
        closeDrawer={closeDrawer}
        closeHNDrawer={closeHNDrawer}
        setDrawerContent={setDrawerContent}
        setHNDrawerContent={setHNDrawerContent}
      />

      {/* <ChartIcons /> */}
      <ContentDrawer
        drawerContent={drawerContent}
        isDrawerOpen={isDrawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <HNContentDrawer
        HNDrawerContent={HNDrawerContent}
        isHNDrawerOpen={isHNDrawerOpen}
        openHNDrawer={openHNDrawer}
        closeHNDrawer={closeHNDrawer}
      />
    </div>
  ) : (
    <div className="contanier">
      <div className="con-child">
        <Spinner
          size="xl"
          color="brand.primary"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </div>
    </div>
  );
};

export default Chart;
