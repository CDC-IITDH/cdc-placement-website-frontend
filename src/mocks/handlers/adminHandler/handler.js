import { rest } from "msw";
import API_ENDPOINT from "../../../api/api_endpoint";

export const adminAPIHandler = [
    rest.post(API_ENDPOINT + "api/admin/markStatus", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Mark Status",
                message: "Marked Status",
            })
        );
    }),
];