import { prisma } from "../../lib/prisma";

const getLocations = async () => {
    const divisions = await prisma.division.findMany({
        include: {
            districts: true
        }
    });
    return divisions;
};

export const LocationServices = {
    getLocations
};
