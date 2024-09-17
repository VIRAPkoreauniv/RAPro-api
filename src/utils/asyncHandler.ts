import { Handler, Request, Response } from "express"

type HandlerFunctionType = (req: Request, res: Response) => Promise<void>

const asyncHandler = (handler: HandlerFunctionType) => {
  return async function (req: Request, res: Response) {
    try {
      await handler(req, res)
    } catch (error) {
      const err = error as Error

      res.status(500).send(`${err.name} : ${err.message}`)
    }
  }
}

export default asyncHandler
