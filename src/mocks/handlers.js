import { rest } from "msw";

const baseURL ="https://auctionghetto-api-17774afbeb21.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                "id": 14,
                "owner": "Caro",
                "is_owner": true,
                "following_id": null,
                "auctions_count": 1,
                "followers_count": 0,
                "following_count": 5,
                "created_at": "07 Jul 2024",
                "updated_at": "12 Sep 2024",
                "name": "Caro",
                "description": "Hi there",
                "street_address": "Test 3",
                "city": "Ghetto Site",
                "postcode": "950 18",
                "email": "caro.test@auctionghetto",
                "phone": "07000000001",
                "image": "https://res.cloudinary.com/dwzcuabfl/image/upload/v1/media/images/auctioneer4_fyohxu"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/login/`, (req, res, ctx) => {
        return res(ctx.json({
            key: 'fake-key'
        }));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.get(`${baseURL}auctioneers/:username/is_following/`, (req, res, ctx) => {
        const { username } = req.params;
        if (username === 'usertesting') {
            return res(ctx.json({ is_following: false }));
        } else {
            return res(ctx.json({ is_following: true }));
        }
    }),
    rest.post(`${baseURL}auctioneers/:username/follow/`, (req, res, ctx) => {
        return res(ctx.status(201));
    }),
    rest.delete(`${baseURL}auctioneers/:username/unfollow/`, (req, res, ctx) => {
        return res(ctx.status(204));
    }),
];