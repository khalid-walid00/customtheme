declare global {
  interface Window {
    xDataPropertiesFilter: () => any;
    setProperties?: ( properties: number[] ) => void;
  }
}

export default function xDataPropertiesFilter() {
  return {
    selectedFilters: {
      colors: [] as number[],
      texts: [] as number[]
    },
    globalProperties: [] as number[],

    addFilter(type: 'colors' | 'texts', value: number) {
      if (!this.selectedFilters[type]) {
        this.selectedFilters[type] = [];
      }

      const list = this.selectedFilters[type];
      const index = list.indexOf(value);

      if (index > -1) {
        this.selectedFilters[type] = list.filter((f) => f !== value);
      } else {
        this.selectedFilters[type].push(value);
      }

      this.updateFilters();
    },

    updateFilters() {
      this.globalProperties = [
        ...new Set([
          ...this.selectedFilters.colors,
          ...this.selectedFilters.texts
        ])
      ];

      const properties=  this.globalProperties
      if( typeof window.updateLoading === 'function')  window.updateLoading('page', true);
        Qumra.products.setProperties(properties).then((res) => {
         window.updateLoading('page', false);
         window.updateContext({ products: res.data.products });
        }).catch((err) => {
          console.error("setProperties error", err);
        });
    },
    isSelected(type: 'colors' | 'texts', value: number) {
      return this.selectedFilters[type]?.includes(value);
    }
  };
}

window.xDataPropertiesFilter = xDataPropertiesFilter;
