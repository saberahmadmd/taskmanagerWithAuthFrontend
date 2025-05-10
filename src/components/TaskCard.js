import React, { useState } from 'react';

function TaskCard({ task, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    Low: 'green',
    Medium: 'orange',
    High: 'red'
  };

  const statusColors = {
    Pending: 'gray',
    'In Progress': 'blue',
    Completed: 'green'
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStatusChange = (e) => {
    onUpdate(task._id, { status: e.target.value });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  return (
    <div className="task-card" style={{ borderLeft: `4px solid ${priorityColors[task.priority]}` }}>
      <div className="task-header" onClick={toggleExpand}>
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span className="priority-badge" style={{ backgroundColor: priorityColors[task.priority] }}>
            {task.priority}
          </span>
          <span className="status-badge" style={{ backgroundColor: statusColors[task.status] }}>
            {task.status}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="task-details">
          <p className="task-description">{task.description}</p>
          <div className="task-meta">
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <p><strong>Created By:</strong> {task.createdBy ? task.createdBy.name : 'Unknown'}</p>
            {task.assignedTo && <p><strong>Assigned To:</strong> {task.assignedTo.name}</p>}
          </div>
          <div className="task-actions">
            <select value={task.status} onChange={handleStatusChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;