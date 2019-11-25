// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const schema = new mongoose.Schema({
    title: {
        type:     String,
        required: true,
    },
    description: {
        type:     String,
        required: true,
    },
    order: {
        type:     Number,
        required: true,
    },
    hash: {
        type:     String,
        required: true,
        unique:   true,
        default:  () => v4(),
    },
    availability: [
        {
            type: String,
            enum: [ 'standard', 'select', 'premium' ],
        },
    ],
    content: {
        videos: [
            {
                title: String,
                order: Number,
                uri:   String,
            },
        ],
        keynotes: [
            {
                title: String,
                order: Number,
                uri:   String,
            },
        ],
    },
    created: {
        type:    Date,
        default: () => new Date(),
    },
    modified: Date,
});

export const lessons = mongoose.model('lessons', schema);
