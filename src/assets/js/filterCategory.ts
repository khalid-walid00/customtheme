declare global {
  interface Window {
    xDataCategory: () => any;
    filterProducts?: (filters: { categories: number[] }) => void;
  }
}

export default function xDataCategory() {
  return {
    FilterCategoryIds: [] as number[],

    toggleFilterCategory(id: number) {
      const index = this.FilterCategoryIds.indexOf(id);
      if (index === -1) {
        this.FilterCategoryIds.push(id);
      } else {
        this.FilterCategoryIds.splice(index, 1);
      }
      if( typeof window.updateLoading === 'function')  window.updateLoading('page', true);
      Qumra.products.setCategory(this.FilterCategoryIds).then((res) => {
        window.updateLoading('page', false);
        window.updateContext({ products: res.data.products });
      }).catch((err) => {
        console.error("setCategory error", err);
      }
      );
    },

  };
}

window.xDataCategory = xDataCategory;
