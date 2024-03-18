import { Injectable } from '@nestjs/common';
import { InternalCategories } from './internalCategories';

@Injectable()
export abstract class Source {
  abstract listCategories(): Promise<
    { categoryId: string; categoryName?: string }[] // list of all categories from the resource
  >;

  abstract getCategoryInfo(
    categoryId: string,
  ): Promise<{ firstPage: string; totalPages?: number }>; // First page in the category and total amount of pages in the category (for cursor and offest pagination)

  abstract getSearchPage(
    categoryId: string,
    page: string,
  ): Promise<{
    products: {
      id: string;
      searchData: any; // entire product object from the search API
    }[];
    nextPage?: string; // Next page. Usually page+1 but in case of cursor based bagination could be an identifier
  }>;

  abstract getProductPage(
    id: string,
  ): Promise<{ product: { id: string; detailedData: any } }>;

  abstract getProductImages(product: {
    searchData?: any; // entire product object from the search API
    detailedData?: any; // entire product object from the product API
  }): Promise<string[]>;

  abstract fetchImage(url: string): Promise<ArrayBuffer>;

  abstract getProductDetails(product: {
    searchData?: any; // entire product object from the search API
    detailedData?: any; // entire product object from the product API
  }): Promise<{
    categoryId: string; // categoryId in source website
    internalCategoryId: keyof typeof InternalCategories; // CategoryId in out internal DB
  }>;
}
