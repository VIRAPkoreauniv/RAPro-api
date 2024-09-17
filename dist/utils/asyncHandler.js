const asyncHandler = (handler) => {
    return async function (req, res) {
        try {
            await handler(req, res);
        }
        catch (error) {
            const err = error;
            res.status(500).send(`${err.name} : ${err.message}`);
        }
    };
};
export default asyncHandler;
