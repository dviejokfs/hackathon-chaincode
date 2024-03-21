import { GalaChainContext, GalaContract } from "@gala-chain/chaincode";
import { CreateCourseDto, FetchCoursesDto, PagedCoursesDto } from "./dtos";
export declare class AppleContract extends GalaContract {
    constructor();
    CreateCourse(ctx: GalaChainContext, dto: CreateCourseDto): Promise<void>;
    EditCourse(): Promise<void>;
    CreateLesson(): Promise<void>;
    EditLesson(): Promise<void>;
    DeleteLesson(): Promise<void>;
    AddBalanceToStudent(): Promise<void>;
    EnrollStudentInCourse(): Promise<void>;
    CompleteLesson(): Promise<void>;
    CompleteCourse(): Promise<void>;
    FetchStudentCourses(): Promise<void>;
    FetchStudentCourse(): Promise<void>;
    FetchStudentNFTs(): Promise<void>;
    FetchStudentNFT(): Promise<void>;
    FetchCourses(ctx: GalaChainContext, dto: FetchCoursesDto): Promise<PagedCoursesDto>;
}
