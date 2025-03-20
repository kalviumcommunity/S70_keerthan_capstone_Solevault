import React from "react";

function InputField({ label, placeholder, type = "text" }) {
  return (
    <div className="mb-6">
      <label className="block self-start mt-6 font-medium text-slate-600">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-6 py-6 mt-2 rounded-xl border-2 border-solid bg-slate-50 border-slate-200 text-neutral-400 max-md:px-5 max-md:max-w-full"
      />
    </div>
  );
}

export default InputField;
