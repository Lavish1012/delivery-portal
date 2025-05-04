import React from 'react';

const StatusDropdown = ({ currentStatus, onUpdate }) => {
  const statuses = ['Pending', 'Accepted', 'Dispatched', 'Delivered'];

  return (
    <select
      className="border p-2 rounded"
      value={currentStatus}
      onChange={(e) => onUpdate(e.target.value)}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default StatusDropdown;