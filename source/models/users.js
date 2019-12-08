// Core
import bcrypt from 'bcryptjs';

// Instruments
import { students } from '../odm';
import { validatePaginationObj, NotFoundError } from '../utils';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformCreateUser(this.data);
        const data = await students.create(user);

        return data;
    }

    async getAll() {
        const { page: oPage, size: oSize } = this.data;

        const { page, size } = validatePaginationObj({
            page: oPage,
            size: oSize,
        });
        const total = await students.countDocuments();
        const offset = (page - 1) * size;

        const data = await students
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

    async getByHash() {
        const { hash } = this.data;

        const data = await students
            .findOne({ hash })
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await students.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await students.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async _transformCreateUser(data) {
        const { name, email, phone, password, sex, role } = data;
        const hashedPassword = await bcrypt.hash(password, 11);
        const [ first, last ] = name.split(' ');
        const user = {
            name: {
                first,
                last,
            },
            sex,
            emails:   [{ email, primary: true }],
            roles:    [ role ],
            phones:   [{ phone, primary: true }],
            password: hashedPassword,
        };

        return user;
    }
}
