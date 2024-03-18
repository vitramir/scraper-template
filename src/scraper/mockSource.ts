import { Injectable } from '@nestjs/common';
import { Source } from './baseSource';
import { FetchService } from 'src/app/fetch.service';
import { InternalCategories } from './internalCategories';

const CAT_1 = {
  categoryId: '1',
  categoryName: 'Woman Shoes',
};

const CAT_2 = {
  categoryId: '2',
  categoryName: 'Woman Bags',
};

const PRODUCT_1 = {
  id: 'itm1',
  searchData: { someSearchFields: 'some-value1' },
  detailedData: {
    category: CAT_1.categoryId,
    someDetailedFields: 'some-value2',
    images: [
      'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@2x.png',
    ],
  },
};

const PRODUCT_2 = {
  id: 'itm2',
  searchData: { someSearchFields: 'some-value3' },
  detailedData: {
    category: CAT_1.categoryId,
    someDetailedFields: 'some-value4',
    images: [
      'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@2x.png',
    ],
  },
};

@Injectable()
export class MockSource extends Source {
  constructor(private readonly fetchService: FetchService) {
    super();
  }

  async listCategories(): Promise<
    { categoryId: string; categoryName?: string }[]
  > {
    return [CAT_1, CAT_2];
  }

  async getCategoryInfo(
    categoryId: string,
  ): Promise<{ firstPage: string; totalPages?: number }> {
    return { firstPage: '1', totalPages: 10 };
  }

  async getSearchPage(
    categoryId: string,
    page: string,
  ): Promise<{
    products: { id: string; searchData: any }[];
    nextPage?: string;
  }> {
    return {
      products: [
        {
          id: PRODUCT_1.id,
          searchData: PRODUCT_1.searchData,
        },
        {
          id: PRODUCT_2.id,
          searchData: PRODUCT_2.searchData,
        },
      ],
      nextPage: page + 1,
    };
  }

  async getProductPage(
    id: string,
  ): Promise<{ product: { id: string; detailedData: any } }> {
    return {
      product: {
        id: PRODUCT_1.id,
        detailedData: PRODUCT_1.detailedData,
      },
    };
  }

  async getProductImages(product: {
    searchData?: any;
    detailedData?: any;
  }): Promise<string[]> {
    return product.detailedData.images;
  }

  async fetchImage(url: string): Promise<ArrayBuffer> {
    return await (await this.fetchService.get(url)).arrayBuffer();
  }

  async getProductDetails(product: {
    searchData?: any;
    detailedData?: any;
  }): Promise<{
    categoryId: string;
    internalCategoryId: keyof typeof InternalCategories;
  }> {
    return {
      categoryId: product.detailedData.category,
      internalCategoryId: 'Fashion/Women/Shoes',
    };
  }
}
