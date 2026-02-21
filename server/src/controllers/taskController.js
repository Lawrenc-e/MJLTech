import pool from '../db/pool.js';

const formatDate = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value.split('T')[0];
  if (value instanceof Date) return value.toISOString().split('T')[0];
  return value;
};

export const listTasks = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, project, status, due_date, priority FROM tasks ORDER BY due_date ASC'
    );
    const tasks = rows.map((row) => ({
      id: row.id,
      title: row.title,
      project: row.project,
      status: row.status,
      dueDate: formatDate(row.due_date),
      priority: row.priority
    }));
    return res.json({ tasks });
  } catch (error) {
    return next(error);
  }
};
