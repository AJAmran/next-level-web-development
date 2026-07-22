import { prisma } from "../../lib/prisma"

const getPremiumContent = async (query: any) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc"

    const posts = await prisma.post.findMany({
        where: {
            isPremium: true
        },
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    });

    const totalPostCount = await prisma.post.count({
        where: {
            isPremium: true
        }
    });

    return {
        data: posts,
        meta: {
            page,
            limit,
            total: totalPostCount,
            totalPages: Math.ceil(totalPostCount / limit)
        }
    }
}

export const premiumServices = {
    getPremiumContent
}