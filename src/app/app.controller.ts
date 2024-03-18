import { Controller, Get, Query } from '@nestjs/common';
import { MockSource } from 'src/scraper/mockSource';

@Controller()
export class AppController {
  constructor(private readonly mockSource: MockSource) {}

  @Get('/categories')
  listCategories() {
    return this.mockSource.listCategories();
  }

  @Get('/category_info')
  categoryInfo(@Query() categoryId: string) {
    return this.mockSource.getCategoryInfo(categoryId);
  }

  @Get('/search_page')
  searchPage(@Query() categoryId: string, @Query() page: string) {
    return this.mockSource.getSearchPage(categoryId, page);
  }

  @Get('/product_page')
  productPage(@Query() productId: string) {
    return this.mockSource.getProductPage(productId);
  }

  @Get('/test')
  async test() {
    const categories = await this.mockSource.listCategories();

    const categoryInfo = await this.mockSource.getCategoryInfo(
      categories[0].categoryId,
    );

    const searchPage = await this.mockSource.getSearchPage(
      categories[0].categoryId,
      categoryInfo.firstPage,
    );

    const productPage = await this.mockSource.getProductPage(
      searchPage.products[0].id,
    );

    const product = {
      id: productPage.product.id,
      searchData: searchPage.products[0].searchData,
      detailedData: productPage.product.detailedData,
    };

    const productDetails = await this.mockSource.getProductDetails(product);

    const images = await this.mockSource.getProductImages(product);

    const image = await this.mockSource.fetchImage(images[0]);

    return {
      categoryInfo,
      productDetails,
      imageLength: image.byteLength,
    };
  }
}
