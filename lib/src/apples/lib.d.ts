import { GalaChainContext } from "@gala-chain/chaincode";
import { Chapter, Course, Lesson, Student, StudentNFT } from "./AppleTree";
import { AddBalanceToStudentDto, CompleteLessonDto, CourseDto, CreateChapterDto, CreateCourseDto, CreateLessonDto, CreateNFTForLessonDto, EnrollInCourseDto, FetchCoursesDto, FetchCreatedCoursesDto, FetchPurchasedCoursesDto, GetStudentNFTsDto, PagedCoursesDto, PagedStudentNFTDto, PagedStudentPurchaseDto, UpdateChapterDto, UpdateCourseDto, UpdateLessonDto } from "./dtos";
export declare function createCourse(ctx: GalaChainContext, dto: CreateCourseDto): Promise<void>;
export declare function fetchMyCourseAll(ctx: GalaChainContext, courseId: string): Promise<CourseDto>;
export declare function fetchMyCourse(ctx: GalaChainContext, courseId: string): Promise<Course>;
export declare function fetchCourse(ctx: GalaChainContext, creator: string, courseId: string): Promise<Course>;
export declare function fetchLesson(ctx: GalaChainContext, courseId: string, chapterId: string, lessonId: string): Promise<Lesson>;
export declare function fetchAllInfoCourse(ctx: GalaChainContext, creator: string, courseId: string): Promise<CourseDto>;
export declare function editCourse(ctx: GalaChainContext, dto: UpdateCourseDto): Promise<void>;
export declare function deleteCourse(ctx: GalaChainContext, courseId: string): Promise<void>;
export declare function createChapter(ctx: GalaChainContext, dto: CreateChapterDto): Promise<void>;
export declare function fetchChapter(ctx: GalaChainContext, courseId: string, chapterId: string): Promise<Chapter>;
export declare function editChapter(ctx: GalaChainContext, dto: UpdateChapterDto): Promise<void>;
export declare function deleteChapter(ctx: GalaChainContext, courseId: string, chapterId: string): Promise<void>;
export declare function createLesson(ctx: GalaChainContext, dto: CreateLessonDto): Promise<void>;
export declare function editLesson(ctx: GalaChainContext, dto: UpdateLessonDto): Promise<void>;
export declare function getStudentNFTWithPagination(ctx: GalaChainContext, studentId: string, dto: GetStudentNFTsDto): Promise<PagedStudentNFTDto>;
export declare function completeLesson(ctx: GalaChainContext, dto: CompleteLessonDto): Promise<StudentNFT>;
export declare function getTokenClassByKey(ctx: GalaChainContext, nftClassKey: string): Promise<import("@gala-chain/api").TokenClass>;
export declare function createNFTForLesson(ctx: GalaChainContext, dto: CreateNFTForLessonDto): Promise<{
    lesson: Lesson;
    tokenKey: string;
}>;
export declare function deleteLesson(ctx: GalaChainContext, courseId: string, chapterId: string, lessonId: string): Promise<void>;
export declare function enrollInCourse(ctx: GalaChainContext, dto: EnrollInCourseDto): Promise<void>;
export declare function fetchEnrolledCourses(ctx: GalaChainContext, dto: FetchPurchasedCoursesDto): Promise<PagedStudentPurchaseDto>;
export declare function fetchCourses(ctx: GalaChainContext, dto: FetchCoursesDto): Promise<PagedCoursesDto>;
export declare function getCurrentStudent(ctx: GalaChainContext): Promise<Student>;
export declare function addBalanceToStudent(ctx: GalaChainContext, dto: AddBalanceToStudentDto): Promise<void>;
export declare function fetchCreatedCourses(ctx: GalaChainContext, dto: FetchCreatedCoursesDto): Promise<PagedCoursesDto>;
