import { rest } from "msw";

const baseURL ="https://auctionghetto-api-17774afbeb21.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                pk: 14,
                username: "Caro",
                email: "",
                first_name: "",
                last_name: "",
                auctioneer_id: 14,
                auctioneer_image:
                "https://res.cloudinary.com/dwzcuabfl/image/upload/v1/media/images/auctioneer4_fyohxu",
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/login/`, (req, res, ctx) => {
        return res(ctx.json({
            key: 'some-fake-key'
        }));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];