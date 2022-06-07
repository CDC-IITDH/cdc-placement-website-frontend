import { rest } from "msw";
import API_ENDPOINT from "../../../api/api_endpoint";

export const loginHandler = [
    // handles a Post request to login
    rest.post(API_ENDPOINT + "api/login/", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Login",
                message: "Verified",
                user_type: ["student", "admin"],
            })
        );
    }),
];