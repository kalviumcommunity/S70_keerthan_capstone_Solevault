import React from "react";
import PropTypes from "prop-types";

const StatCard = ({ title, value, subtext, valueColor = "default" }) => {
  // Determine the text color class based on the valueColor prop
  const getValueColorClass = () => {
    switch (valueColor) {
      case "success":
        return "text-emerald-500";
      case "danger":
        return "text-red-500";
      default:
        return "text-slate-800";
    }
  };

  // Determine if the value should be displayed in a larger or smaller font
  const valueSize = subtext ? "text-3xl" : "text-5xl";

  return (
    <div className="p-8 bg-white rounded-3xl border shadow-lg border-slate-200">
      <div className="mb-4 text-2xl text-slate-500">{title}</div>
      <div className={`${valueSize} font-bold ${getValueColorClass()}`}>
        {value}
      </div>
      {subtext && (
        <div
          className={`${
            valueColor !== "default" ? getValueColorClass() : "text-slate-500"
          } text-2xl`}
        >
          {subtext}
        </div>
      )}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtext: PropTypes.string,
  valueColor: PropTypes.oneOf(["default", "success", "danger"]),
};

export default StatCard;
