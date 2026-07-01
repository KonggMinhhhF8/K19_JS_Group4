import { get } from "./api.js";

const getCategories = async () => {
    return await get("categories");
};

export { getCategories };
