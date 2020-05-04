"use strict";

export default {
    panel: {
        baseUrl: process.env.API_URL,
        name: process.env.APP_NAME,
        api: {
            v1: {
                example: {
                    ex1: "/v1/ex1",
                    ex2: "/v1/ex2",
                }
            }
        }
    }
};
