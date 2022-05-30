import { setupWorker } from "msw";

import { loginHandler } from "./handlers/login/loginHandler";
import { studentAPIHandlers } from "./handlers/studentHandler/handler";
import { adminAPIHandler } from "./handlers/adminHandler/handler";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
    ...loginHandler,
    ...studentAPIHandlers,
    ...adminAPIHandler
);