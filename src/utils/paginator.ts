import QueryString from "qs";

export const getPager = (page: number, size: number): { limit: number, offset: number } => {
    const defaultLimit = 10;
    const limit = size ? +size : defaultLimit;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

export const getPageData = (query: QueryString.ParsedQs,pageParamName='page',defaultLimit=5) => {
    const  page  = query[pageParamName];
    if (!page) {
        return { limit:defaultLimit, offset:0 ,page:0};
    }
    const pageValue = Number(page);
    // const limit = size ? +size : defaultLimit;
    const offset = pageValue ? pageValue * defaultLimit : 0;
    return { limit:defaultLimit, offset,page:pageValue };
};

export const pageData = (data, page:number, limit:number) => {
    const { count: totalItems, rows: list } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, list, totalPages, currentPage };
  };

  export const pageDataRaw = (page:number, limit:number,totalItems:number):{ totalItems:number, totalPages:number, currentPage:number , data:any } => {
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, totalPages, currentPage , data:null };
  };