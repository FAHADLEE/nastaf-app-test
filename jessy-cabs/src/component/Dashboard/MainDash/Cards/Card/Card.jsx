import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { MdCancel } from "@react-icons/all-files/md/MdCancel";
import Chart from "react-apexcharts";
import { APIURL } from "../../../../url";

// parent Card
const apiUrl = APIURL;
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card

function CompactCard({ param, setExpanded }) {

  const user_id = localStorage.getItem('useridno');

  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = 'Dashboard page';
        const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
        setUserPermissions(response.data);
      } catch {
      }
    };

    fetchPermissions();
  }, [user_id]);

  const checkPagePermission = () => {
    const currentPageName = 'Dashboard page';
    const permissions = userPermissions || {};

    if (permissions.page_name === currentPageName) {
      return {
        read: permissions.read_permission === 1,
        new: permissions.new_permission === 1,
        modify: permissions.modify_permission === 1,
        delete: permissions.delete_permission === 1,
      };
    }

    return {
      read: false,
      new: false,
      modify: false,
      delete: false,
    };
  };

  const permissions = checkPagePermission();

  const Png = param.png;
  return (
    <div >
      {!permissions.read && (
        <div className="loading-spinners">
          <motion.div
            className="CompactCard"
            style={{
              background: param.color.backGround,
              boxShadow: param.color.boxShadow,
              border: '2px solid #c7c7c7c0',
            }}
            layoutId="expandableCard"
          >
            <div className="radialBar">
              <CircularProgressbar
                value='0'
                text={`0%`}
              />
              <span>{param.title}</span>
            </div>
            <div className="detail">
              <Png />
              <span> &#8377; 0</span>
              <span>Last 24 hours</span>
            </div>
          </motion.div>
        </div>
      )}
      {permissions.read && (
        <motion.div
          className="CompactCard"
          style={{
            background: param.color.backGround,
            boxShadow: param.color.boxShadow,
            border: '2px solid #c7c7c7c0',
          }}
          layoutId="expandableCard"
          onClick={setExpanded}
        >
          <div className="radialBar">
            <CircularProgressbar
              value={param.barValue}
              text={`${param.barValue}%`}
            />
            <span>{param.title}</span>
          </div>
          <div className="detail">
            <Png />
            <span>&#8377; {param.value}</span>
            <span>Last 24 hours</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: param.series[0]?.categories || [],
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <MdCancel onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        {param.series.map((seriesItem, index) => (
          <Chart key={index} options={data.options} series={[seriesItem]} type="area" />
        ))}
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;