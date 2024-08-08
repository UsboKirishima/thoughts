import { NextApiRequest, NextApiResponse } from 'next';
import { postType } from '@/typings/posts';
import Post from '@/models/Post';
import 'dotenv/config';
import moment from 'moment';
import connectDB from '@/database/connectDB';
import { NextResponse } from 'next/server';

// Funzione POST che gestisce la richiesta
export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        /**
         * Getting postDate
         */
        let postDate: string = moment().toISOString();

        /**
         * Typings Assignment
         */
        let data: postType = {
            author: process.env.USER_NAME as string,
            icon: process.env.USER_ICON as string,
            date: postDate,
            content: content,
            upvotes: 0
        };

        /**
         * Data Validation
         */
        const contentRegex = /^[a-zA-Z0-9\s\W]{1,120}$/;

        const validateContent = (contentToValidate: string): boolean => {
            return contentRegex.test(contentToValidate);
        }

        if (!validateContent(data.content)) {
            return NextResponse.json({
                message: '`content` exceeded max length of 120 chars.'
            }, { status: 414 });
        }

        /**
         * Database Connection
         */
        await connectDB();

        /**
         * Creating Post
         */
        const newPost = new Post({
            author: data.author,
            icon: data.icon,
            date: data.date,
            content: data.content,
            upvotes: data.upvotes,
        });

        /**
         * Saving Post
         */
        await newPost.save();

        console.log('Post saved successfully');
        return NextResponse.json({ message: 'Post saved successfully' }, { status: 200 });

    } catch (err: any) {
        console.error('Error:', err);

        if (err.message.includes('Error connecting to Database')) {
            return NextResponse.json({ message: 'Error connecting to Database' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Error processing the request' }, { status: 500 });
    }
}
