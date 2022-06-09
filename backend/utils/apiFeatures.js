class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStrCopy = JSON.parse(JSON.stringify(this.queryStr));

        //Removing some field
        const fieldToRemove = ["keyword", "page", "limit"];
        fieldToRemove.forEach((field) => { delete queryStrCopy[field] });
        // Filter for price and rating
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(productsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skipProducts = productsPerPage * (currentPage - 1);

        this.query = this.query.limit(productsPerPage).skip(skipProducts);
        return this;
    }
}

module.exports = ApiFeatures;