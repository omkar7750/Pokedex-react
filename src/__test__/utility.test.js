import { getPaginatedItems } from "../utility/pagination";

const items = [
    {
        id: 1,
        name: "item1"
    },
    {
        id: 2,
        name: "item2"
    },
    {
        id: 3,
        name: "item3"
    },
    {
        id: 4,
        name: "item4"
    },
    {
        id: 5,
        name: "item5"
    }
]


describe('Test utility functions', () => {
    test('Test getPaginatedItems function', () => {

        let paginationResult = getPaginatedItems(items, 1, 3);
        expect(paginationResult.page).toEqual(1);
        expect(paginationResult.pageSize).toEqual(3);
        expect(paginationResult.total).toEqual(5);
        expect(paginationResult.total_pages).toEqual(2);
        expect(paginationResult.data).toHaveLength(3);

        paginationResult = getPaginatedItems(items, 2, 2);
        expect(paginationResult.page).toEqual(2);
        expect(paginationResult.pageSize).toEqual(2);
        expect(paginationResult.total).toEqual(5);
        expect(paginationResult.total_pages).toEqual(3);
        expect(paginationResult.data).toHaveLength(2);

        paginationResult = getPaginatedItems(items);
        expect(paginationResult.page).toEqual(1);
        expect(paginationResult.pageSize).toEqual(12);
        expect(paginationResult.total).toEqual(5);
        expect(paginationResult.total_pages).toEqual(1);
        expect(paginationResult.data).toHaveLength(5);

    })

})