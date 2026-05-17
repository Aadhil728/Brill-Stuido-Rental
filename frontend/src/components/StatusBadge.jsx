import React from 'react';

const styles = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-emerald-100 text-emerald-800',
  Completed: 'bg-neutral-200 text-neutral-800',
  Cancelled: 'bg-red-100 text-red-800'
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
