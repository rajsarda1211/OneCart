const middlewareWrapper = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};

export default middlewareWrapper;
