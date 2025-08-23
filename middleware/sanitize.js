function sanitizeBody(req, res, next) {
  const sanitize = (obj) => {
    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          // Remove keys starting with '$' or containing '.'
          if (key.startsWith("$") || key.includes(".")) {
            delete obj[key];
          } else {
            // Recurse into nested objects
            sanitize(obj[key]);
          }
        }
      }
    }
  };

  if (req.body) {
    sanitize(req.body);
  }
  if (req.query) {
    sanitize(req.query);
  }
  if (req.params) {
    sanitize(req.params);
  }

  next();
}

module.exports = { sanitizeBody };
