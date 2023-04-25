import express from "express";

declare global {
  namespace Express {
    interface Request {
      createTime?: Record<string, any>;
    }
  }
}
