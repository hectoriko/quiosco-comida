import 'dotenv/config';

import { categories } from './data/categories';
import { products } from './data/products';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        await prisma.category.createMany({
            data: categories,
        });
        await prisma.product.createMany({
            data: products,
        });
        console.log('Seeding completed successfully');
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        console.log('Disconnecting');
        await prisma.$disconnect();
    }
}

main()