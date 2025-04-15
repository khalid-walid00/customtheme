type SortOption = {
  key: string;
  label: string;
  value: number;
};


declare global {
  interface Window {
    xDataSort: () => ReturnType<typeof xDataSort>;
    setSort?: (sortOb: [{ field: string, order: number }]) => void;
  }
}

export default function xDataSort() {
  return {
    selectedValue: null as string | null | number,
    selectedLabel: null as string | null | number,
    options: [
      { key: 'date', label: 'المضاف حديثا', value: -1 },
      { key: 'date', label: 'المضاف قديما', value: 1 },
      { key: 'price', label: 'السعر الاعلي', value: -1 },
      { key: 'price', label: 'السعر الاقل', value: 1 }
    ] as SortOption[],
    selectOption(option: SortOption) {
      this.selectedValue = option.value;
      this.selectedLabel = option.label;
    
      if (typeof window.updateLoading === 'function') {
        window.updateLoading('page', true);
      }
    
      Qumra.products.setSort?.([{ field: option.key, order: option.value }]).then((res: any) => {
        window.updateLoading('page', false);
        window.toggleModal({ type: "sort", open: false });
        window.updateContext({ products: res.data.products });
      }).catch((err: any) => {
        console.error("setSort error", err);
      });
    }
    
  };
}

window.xDataSort = xDataSort;
