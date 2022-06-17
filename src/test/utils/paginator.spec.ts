import { pageDataRaw } from "../../utils/paginator";


describe("Paginator", () => {

    it("Should return pagination data", async (done) => {

        const pageData = pageDataRaw(0, 5, 100);
        expect(pageData.totalPages).toEqual(20);
        expect(pageData.currentPage).toEqual(0);
        expect(pageData.totalItems).toEqual(100);


        const pageData2 = pageDataRaw(1, 4, 22);
        expect(pageData2.totalPages).toEqual(6);
        expect(pageData2.currentPage).toEqual(1);
        expect(pageData2.totalItems).toEqual(22);

        done();
    });

});
