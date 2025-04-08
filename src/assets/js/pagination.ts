export function xDataPagination(context: any) {
    return {
      currentGroup: 1,
      pagesPerGroup: 4,
  
      get totalPages() {
        return context.pagination.totalPages;
      },
  
      get currentPage() {
        return context.pagination.page;
      },
  
      get totalGroups() {
        return Math.ceil(this.totalPages / this.pagesPerGroup);
      },
  
      get pagesToShow() {
        const start = (this.currentGroup - 1) * this.pagesPerGroup + 1;
        const end = Math.min(start + this.pagesPerGroup - 1, this.totalPages);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      },
  
      setPagination(page: number) {
            window.updateLoading('page', true);
            if (page >= 1 && page <= this.totalPages) {
          context.pagination.page = page;
          this.currentGroup = Math.ceil(page / this.pagesPerGroup);
          Qumra.products.setPage(page).then((res: any) => {
            window.updateLoading('page', false);
            window.updateContext({ products: res.data.products, pagination: res.data.pagination });
          }).catch((err: any) => {
            console.error("setLimit error", err);
          }
          );
        }
      },
  
      nextGroup() {
        if (this.currentGroup < this.totalGroups) {
          this.currentGroup++;
        }
      },
  
      prevGroup() {
        if (this.currentGroup > 1) {
          this.currentGroup--;
        }
      }
    };
  }
  
  (window as any).xDataPagination = xDataPagination;
  