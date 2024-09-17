const asyncHandler = (handler) => {
  return async function (req, res) {
    try {
      await handler(req, res)
    } catch (error) {
      console.log(`${error.name} : ${error.message}`)
    }
  }
}

export default asyncHandler
