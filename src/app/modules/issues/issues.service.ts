import status from "http-status";
import AppError from "../../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateIssues } from "./issues.interface";










const createIssue = async(payload:ICreateIssues, userId: string) =>{
      const userInfo = await prisma.user.findUnique({
        where:{
            id:userId
        }
      })
      if(!userInfo){
        throw new Error("User not found")
      }

      const result = await prisma.issue.create({
        data:{
            ...payload,
            authorId:userInfo.id,
            divisionId: userInfo.divisionId,
            districtId: userInfo.districtId
        }
      });

      if(!result){
        throw new AppError(status.BAD_REQUEST,"Create issue failed")
      }
      return result
}


const getIssuebyDivision = async(userId:string) =>{
    const userInfo = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });

    if(!userInfo){
        throw new AppError(status.UNAUTHORIZED, "User not exist")
    }

    const data = await prisma.issue.findMany({
        where:{
            divisionId: userInfo.divisionId,
            districtId: userInfo.districtId
        }
    });
    
    return data;
}


const getGlobalIssues = async()=>{
    const result = await prisma.issue.findMany();
    return result
}


const deleteIssues = async(userId: string, issueId: string) =>{
    const userInfo = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });

    if(!userInfo){
        throw new AppError(status.UNAUTHORIZED, "User not exist")
    }


    const issueInfo = await prisma.issue.findUnique({
        where:{
            id:issueId
        }
    });

    if(!issueInfo){
        throw new AppError(status.NOT_FOUND, "Issue not found")
    }

    if(issueInfo.authorId !== userInfo.id){
        throw new AppError(status.UNAUTHORIZED, "You are not authorized to delete this issue")
    }



    const result = await prisma.issue.delete({
        where:{
            authorId: userInfo.id,
            id: issueId
        }
    });

    if(!result){
        throw new AppError(status.BAD_REQUEST,"Delete issue failed")
    }
    return result
}


export const IssuesServices = {
    createIssue,
    getIssuebyDivision,
    getGlobalIssues,
    deleteIssues
}
