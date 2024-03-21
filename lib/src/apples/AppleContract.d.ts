import { TokenClass } from "@gala-chain/api";
import { GalaChainContext, GalaContract } from "@gala-chain/chaincode";
import { StudentNFT } from "./AppleTree";
import { AddBalanceToStudentDto, CompleteLessonDto, CourseDto, CreateChapterDto, CreateCourseDto, CreateLessonDto, CreateNFTForLessonDto, EnrollInCourseDto, FetchBalanceOfStudentDto, FetchCourseDto, FetchCoursesDto, FetchCreatedCoursesDto, FetchEnrolledCoursesDto, FetchLessonDto, GetStudentNFTsDto, LessonDto, PagedCoursesDto, PagedStudentNFTDto, PagedStudentPurchaseDto, StudentBalanceDto, UpdateChapterDto, UpdateCourseDto, UpdateLessonDto } from "./dtos";
export declare class AppleContract extends GalaContract {
    constructor();
    CreateCourse(ctx: GalaChainContext, dto: CreateCourseDto): Promise<void>;
    EditCourse(ctx: GalaChainContext, dto: UpdateCourseDto): Promise<void>;
    CreateChapter(ctx: GalaChainContext, dto: CreateChapterDto): Promise<void>;
    EditChapter(ctx: GalaChainContext, dto: UpdateChapterDto): Promise<void>;
    CreateLesson(ctx: GalaChainContext, dto: CreateLessonDto): Promise<void>;
    EditLesson(ctx: GalaChainContext, dto: UpdateLessonDto): Promise<void>;
    FetchLesson(ctx: GalaChainContext, dto: FetchLessonDto): Promise<LessonDto>;
    AddBalanceToStudent(ctx: GalaChainContext, dto: AddBalanceToStudentDto): Promise<void>;
    CreateNFTForLesson(ctx: GalaChainContext, dto: CreateNFTForLessonDto): Promise<void>;
    FetchBalanceOfStudent(ctx: GalaChainContext, _: FetchBalanceOfStudentDto): Promise<StudentBalanceDto>;
    FetchEnrolledCourses(ctx: GalaChainContext, dto: FetchEnrolledCoursesDto): Promise<PagedStudentPurchaseDto>;
    CompleteLesson(ctx: GalaChainContext, dto: CompleteLessonDto): Promise<StudentNFT>;
    GetStudentNFTs(ctx: GalaChainContext, dto: GetStudentNFTsDto): Promise<PagedStudentNFTDto>;
    EnrollInCourse(ctx: GalaChainContext, dto: EnrollInCourseDto): Promise<void>;
    FetchCourses(ctx: GalaChainContext, dto: FetchCoursesDto): Promise<PagedCoursesDto>;
    FetchCourse(ctx: GalaChainContext, dto: FetchCourseDto): Promise<CourseDto>;
    FetchLessonNFT(ctx: GalaChainContext, dto: FetchLessonDto): Promise<TokenClass>;
    FetchMyCourse(ctx: GalaChainContext, dto: FetchCourseDto): Promise<CourseDto>;
    FetchCreatedCourses(ctx: GalaChainContext, dto: FetchCreatedCoursesDto): Promise<PagedCoursesDto>;
}
