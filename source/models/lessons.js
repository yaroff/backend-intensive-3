// Instruments
import { lessons } from '../odm';
import { validatePaginationObj } from '../utils';

export class Lessons {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await lessons.create(this.data);

        return data;
    }

    async getAll() {
        const { page: oPage, size: oSize } = this.data;

        const { page, size } = validatePaginationObj({
            page: oPage,
            size: oSize,
        });
        const total = await lessons.countDocuments();
        const offset = (page - 1) * size;

        const data = await lessons
            .find({})
            .sort('-created')
            .skip(offset)
            .limit(size)
            .select('-__v -id')
            .lean();

        return {
            data,
            meta: {
                total,
                page,
                size,
            },
        };
    }
}
