import { setupWorker } from "msw";

import { loginHandler } from "./handlers/login/loginHandler";
import { studentAPIHandlers } from "./handlers/Student/handler";
import { adminAPIHandler } from "./handlers/Admin/handler";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
    ...loginHandler,
    ...studentAPIHandlers,
    ...adminAPIHandler
);