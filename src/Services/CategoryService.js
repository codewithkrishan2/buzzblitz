import { myAxios } from "./Helper";

export const loadAllCategories = () => {
    return myAxios.get("/categories/all-categories").then(response=>{return response.data});
};