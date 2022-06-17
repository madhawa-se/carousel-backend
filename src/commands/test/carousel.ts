import { slides } from "../../db/fakedb";

export const getSlides= async (slideAmount:number) => {
    return slides.slice(0, slideAmount)  ;
};