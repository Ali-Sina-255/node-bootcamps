const advancedResults = (model, populate) => async (req, res, next) => {
    // Copy query object
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["page", "limit", "sort", "select"];

    removeFields.forEach((param) => delete reqQuery[param]);

    // Advanced filtering
    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`,
    );

    // Build query
    let query = model.find(JSON.parse(queryStr));

    // SELECT FIELDS
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    // SORT
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }

    // PAGINATION
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25; // smaller default for testing
    const skip = (page - 1) * limit;

    const total = await model.countDocuments(JSON.parse(queryStr));

    query = query.skip(skip).limit(limit);
    if(populate) {
        query = query.populate(populate);
    }

    const results = await query;

    // Pagination result
    const pagination = {};

    if (skip + results.length < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if (skip > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results,
    };

    next();

}


module.exports = advancedResults;