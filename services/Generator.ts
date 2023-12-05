import { TOOLS_GEN_URL } from "@/config/config";
export class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}