const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  let reqQuery = { ...req.query };

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));

  // Remove fields that are not for filtering
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Convert bracket notation to nested objects DIRECTLY
  const finalQuery = {};
  Object.keys(reqQuery).forEach((key) => {
    if (key.includes("[") && key.includes("]")) {
      // Handle bracket notation like "averageCost[lte]"
      const field = key.substring(0, key.indexOf("["));
      const operator = key.substring(key.indexOf("[") + 1, key.indexOf("]"));

      if (!finalQuery[field]) {
        finalQuery[field] = {};
      }

      // Convert string to number if it's numeric
      const value = !isNaN(reqQuery[key])
        ? Number(reqQuery[key])
        : reqQuery[key];
      finalQuery[field][`$${operator}`] = value;
    } else {
      finalQuery[key] = reqQuery[key];
    }
  });

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(finalQuery);

  // Finding resource
  query = model.find(finalQuery).skip(startIndex).limit(limit);

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt"); // Default sort by createdAt
  }

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
