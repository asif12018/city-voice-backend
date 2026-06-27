

import { Gender } from "@prisma/client";




export interface ILoginUser {
    email: string;
    password: string;
}




export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    gender: Gender;
    districtId: string;
    divisionId: string;
}

