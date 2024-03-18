import { Injectable } from '@nestjs/common';
import { InternalCategories } from './internalCategories';

@Injectable()
export abstract class Source {
  abstract listCategories(): Promise<
    { categoryId: string; categoryName?: string }[]
  >;

  abstract getCategoryInfo(
    categoryId: string,
  ): Promise<{ firstPage: string; totalPages?: number }>;

  abstract getSearchPage(
    categoryId: string,
    page: string,
  ): Promise<{
    products: { id: string; searchData: any }[];
    nextPage?: string;
  }>;

  abstract getProductPage(
    id: string,
  ): Promise<{ product: { id: string; detailedData: any } }>;

  abstract getProductImages(product: {
    searchData?: any;
    detailedData?: any;
  }): Promise<string[]>;

  abstract fetchImage(url: string): Promise<ArrayBuffer>;

  abstract getProductDetails(product: {
    searchData?: any;
    detailedData?: any;
  }): Promise<{
    categoryId: string;
    internalCategoryId: keyof typeof InternalCategories;
  }>;
}
