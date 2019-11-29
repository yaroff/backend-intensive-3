// Instruments
import { Lessons as LessonsModel } from '../models';

export class Lessons {
    constructor(data) {
        this.models = {
            lessons: new LessonsModel(data),
        };
    }

    async create() {
        const data = await this.models.lessons.create();

        return data;
    }

    async getAll() {
        const data = await this.models.lessons.getAll();

        return data;
    }
}
