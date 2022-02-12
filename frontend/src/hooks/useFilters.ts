/**
 * @param {array} items
 * @param {object} filters { filterBy: [value, inverse] }
 * @summary Filters an array of items depending on it's values
*/
export function useFilters(items: any[], filters: any, search: string): any[] {
    const res: any[] = items.filter(item => {
        return Object.keys(filters).every(filter => {
            if(filters[filter][0] === 'all')
                return item;

            if(filters[filter][1] === true) {
                if(item[filter] !== filters[filter][0]) {
                    return item;
                }
            }

            else if(item[filter] === filters[filter][0]) {
                return item;
            }

        })
    }).filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
    
    return res;
}