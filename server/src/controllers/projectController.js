import pool from '../db/pool.js';

const formatDate = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value.split('T')[0];
  if (value instanceof Date) return value.toISOString().split('T')[0];
  return value;
};

export const listProjects = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, summary, client, status, updated_at, budget, timeline FROM projects ORDER BY updated_at DESC'
    );
    const projects = rows.map((row) => ({
      id: row.id,
      name: row.name,
      summary: row.summary,
      client: row.client,
      status: row.status,
      updatedAt: formatDate(row.updated_at),
      budget: row.budget,
      timeline: row.timeline
    }));
    return res.json({ projects });
  } catch (error) {
    return next(error);
  }
};
