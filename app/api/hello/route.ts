import { NextApiRequest, NextApiResponse, GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextResponse } from 'next/server';

 
export async function GET(req: Request) {
    return NextResponse.json({ message: 'Hello World!' });
}