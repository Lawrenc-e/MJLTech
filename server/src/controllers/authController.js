import pool from '../db/pool.js';
import { hashPassword, verifyPassword } from '../utils/passwords.js';
import { signToken } from '../utils/tokens.js';

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  company: user.company
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, company } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (existing.length) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    const passwordHash = await hashPassword(password);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role, company) VALUES (?, ?, ?, ?, ?)',
      [name, email, passwordHash, role || 'client', company || null]
    );
    const user = {
      id: result.insertId,
      name,
      email,
      role: role || 'client',
      company: company || null
    };
    const token = signToken({ sub: user.id, role: user.role, email: user.email });
    return res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const [rows] = await pool.execute(
      'SELECT id, name, email, password_hash, role, company FROM users WHERE email = ?',
      [email]
    );
    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const user = rows[0];
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = signToken({ sub: user.id, role: user.role, email: user.email });
    return res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
};
