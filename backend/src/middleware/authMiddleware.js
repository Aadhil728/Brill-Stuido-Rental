import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'local-brill-studio-secret';

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Admin authentication required.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired admin token.' });
  }
}
