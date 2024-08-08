import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Post from '@/models/Post';
import connectDB from '@/database/connectDB';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        await connectDB()

            const posts = await Post.find().sort({ date: -1 }); // Order data by most recent post

            return NextResponse.json(posts, { status: 200 });
        
    } catch (err) {
        NextResponse.json({ message: 'Error retrieving posts', error: err }, { status: 500 });
    }
}    
