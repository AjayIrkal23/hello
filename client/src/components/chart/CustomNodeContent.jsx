import React, { useContext } from "react";
import { FaFileArchive } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { BiLogoPython } from "react-icons/bi";
import { BiLogoJavascript } from "react-icons/bi";
import { PiFileSqlBold } from "react-icons/pi";
import { PiBracketsCurlyLight } from "react-icons/pi";
import { PiBracketsRound } from "react-icons/pi";
import { BsDatabaseFill } from "react-icons/bs";
import { BiLogoPostgresql } from "react-icons/bi";
import { MdSchema } from "react-icons/md";
import "./styles.css";

const iconMap = {
  zip: <FaFileArchive className="node-icon" />,
  summary: <RiFilePaper2Fill className="node-icon" />,
  py: <BiLogoPython className="node-icon" />,
  js: <BiLogoJavascript className="node-icon" />,
  sql: <PiFileSqlBold className="node-icon" />,
  pyClass: <PiBracketsCurlyLight className="node-icon" />,
  pyFunction: <PiBracketsRound className="node-icon" />,
  db: <BsDatabaseFill className="node-icon" />,
  model: <BiLogoPostgresql className="node-icon" />,
  schema: <MdSchema className="node-icon" />,
};

const CustomNodeContent = (props) => {
  const iconComponent = iconMap[props.data.type] || null;
  const highlighted = props.data._highlighted ? "highlighted" : "";
  const newNode = props.data.isNew ? "newNode" : "";

  return (
    <div className={`node-container ${highlighted} ${newNode}`}>
      <div className="node-details">
        <div className="node-content">
          {iconComponent}
          <div className="node-info">
            <p className="node-name">{props.data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNodeContent;
