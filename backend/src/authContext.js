import { pool } from './db.js';
import jwt from 'jsonwebtoken';

// Helper to load the current user from a JWT token signed with JWT_SECRET.
export async function getUserFromToken(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const secret = process.env.JWT_SECRET || '';
  if (!secret) {
    // If secret is not configured, refuse auth
    return null;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    return null;
  }

  const id = parseInt(decoded && decoded.id, 10);
  if (!Number.isFinite(id)) {
    return null;
  }

  const result = await pool.query(
    `SELECT id, tenant_id, email, role, display_name
     FROM users
     WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  const user = result.rows[0];
  return {
    id: user.id,
    tenantId: user.tenant_id,
    email: user.email,
    role: user.role,
    displayName: user.display_name
  };
}

export async function authMiddleware(req, _res, next) {
  try {
    const headerToken = req.header('x-auth-token');
    const token = headerToken && headerToken.trim() ? headerToken.trim() : null;

    if (!token) {
      req.user = null;
      return next();
    }

    const user = await getUserFromToken(token);
    req.user = user || null;
  } catch (err) {
    console.error('Error resolving auth context:', err);
    req.user = null;
  }

  return next();
}
