import { ChainCallDTO, TokenClass } from "@gala-chain/api";
import { AppleTree, Chapter, Course, Lesson, StudentNFT, StudentPurchase } from "./AppleTree";
import { CourseStatus, Variety } from "./types";
export declare class AppleTreeDto extends ChainCallDTO {
    readonly variety: Variety;
    readonly index: number;
    constructor(variety: Variety, index: number);
}
export declare class AppleTreesDto extends ChainCallDTO {
    readonly trees: AppleTreeDto[];
    constructor(trees: AppleTreeDto[]);
}
export declare class CreateCourseDto extends ChainCallDTO {
    readonly courseId: string;
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly status: CourseStatus;
    constructor(courseId: string, title: string, description: string, price: number, status: CourseStatus);
}
export declare class FetchCreatedCoursesDto extends ChainCallDTO {
    readonly bookmark?: string;
    readonly limit?: number;
    constructor(bookmark?: string, limit?: number);
}
export declare class FetchEnrolledCoursesDto extends ChainCallDTO {
    readonly bookmark?: string;
    readonly limit?: number;
    constructor(bookmark?: string, limit?: number);
}
export declare class AddBalanceToStudentDto extends ChainCallDTO {
    readonly amount: number;
    constructor(amount: number);
}
export declare class FetchPurchasedCoursesDto extends ChainCallDTO {
    readonly bookmark?: string;
    readonly limit?: number;
    constructor(bookmark?: string, limit?: number);
}
export declare class PickAppleDto extends ChainCallDTO {
    readonly PlantedBy: string;
    readonly variety: Variety;
    readonly index: number;
    constructor(treePlantedBy: string, variety: Variety, index: number);
}
export declare class FetchCoursesDto extends ChainCallDTO {
    readonly creator?: string;
    readonly bookmark?: string;
    readonly limit?: number;
    constructor(creator?: string, bookmark?: string, limit?: number);
}
export declare class FetchBalanceOfStudentDto extends ChainCallDTO {
    constructor();
}
export declare class PagedCoursesDto {
    readonly courses: Course[];
    readonly bookmark: string;
    constructor(courses: Course[], bookmark: string);
}
export declare class StudentPurchaseWithCourseDto extends ChainCallDTO {
    readonly Course: Course;
    readonly StudentPurchase: StudentPurchase;
    constructor(Course: Course, StudentPurchase: StudentPurchase);
}
export declare class PagedStudentPurchaseDto {
    readonly purchases: StudentPurchaseWithCourseDto[];
    readonly bookmark: string;
    constructor(purchases: StudentPurchaseWithCourseDto[], bookmark: string);
}
export declare class GetStudentNFTsDto extends ChainCallDTO {
    readonly bookmark?: string;
    readonly limit?: number;
    constructor(bookmark?: string, limit?: number);
}
export declare class StudentNFTWithTokenDto extends ChainCallDTO {
    readonly StudentNFT: StudentNFT;
    readonly Token: TokenClass;
    constructor(StudentNFT: StudentNFT, Token: TokenClass);
}
export declare class PagedStudentNFTDto {
    readonly nfts: StudentNFTWithTokenDto[];
    readonly bookmark: string;
    constructor(nfts: StudentNFTWithTokenDto[], bookmark: string);
}
export declare class StudentBalanceDto extends ChainCallDTO {
    readonly balance: number;
    constructor(balance: number);
}
export declare class FetchTreesDto extends ChainCallDTO {
    readonly plantedBy?: string;
    readonly variety?: Variety;
    readonly index?: number;
    readonly bookmark?: string;
    readonly limit?: number;
    constructor(plantedBy?: string, variety?: Variety, index?: number, bookmark?: string, limit?: number);
}
export declare class PagedTreesDto {
    readonly trees: AppleTree[];
    readonly bookmark: string;
    constructor(trees: AppleTree[], bookmark: string);
}
export declare class EnrollInCourseDto extends ChainCallDTO {
    readonly courseId: string;
    readonly creator: string;
    constructor(creator: string, courseId: string);
}
export declare class FetchMyCourseDto extends ChainCallDTO {
    readonly courseId: string;
    constructor(courseId: string);
}
export declare class LessonDto extends ChainCallDTO {
    readonly Lesson: Lesson;
    constructor(Lesson: Lesson);
}
export declare class ChapterDto extends ChainCallDTO {
    readonly Chapter: Chapter;
    readonly Lessons: LessonDto[];
    constructor(Chapter: Chapter, Lessons: LessonDto[]);
}
export declare class CompleteLessonDto extends ChainCallDTO {
    readonly courseId: string;
    readonly creator: string;
    readonly chapterId: string;
    readonly lessonId: string;
    constructor(courseId: string, creator: string, chapterId: string, lessonId: string);
}
export declare class CreateNFTForLessonDto extends ChainCallDTO {
    readonly courseId: string;
    readonly chapterId: string;
    readonly lessonId: string;
    readonly NFTCollectionName: string;
    readonly NFTCategory: string;
    readonly NFTType: string;
    readonly NFTAdditionalKey: string;
    readonly NFTSymbol: string;
    readonly NFTDescription: string;
    readonly NFTImage: string;
    readonly NFTMaxSupply: number;
    constructor(courseId: string, chapterId: string, lessonId: string, NFTCollectionName: string, NFTCategory: string, NFTType: string, NFTAdditionalKey: string, NFTSymbol: string, NFTDescription: string, NFTImage: string, NFTMaxSupply: number);
}
export declare class FetchLessonDto extends ChainCallDTO {
    readonly courseId: string;
    readonly chapterId: string;
    readonly lessonId: string;
    constructor(courseId: string, chapterId: string, lessonId: string);
}
export declare class CourseDto extends ChainCallDTO {
    readonly Course: Course;
    readonly Chapters: ChapterDto[];
    constructor(Course: Course, Chapters: ChapterDto[]);
}
export declare class FetchCourseDto extends ChainCallDTO {
    readonly courseId: string;
    readonly creator: string;
    constructor(creator: string, courseId: string);
}
export declare class UpdateCourseDto extends ChainCallDTO {
    readonly courseId: string;
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly status: CourseStatus;
    constructor(courseId: string, title: string, description: string, price: number, status: CourseStatus);
}
export declare class UpdateLessonDto extends ChainCallDTO {
    readonly courseId: string;
    readonly chapterId: string;
    readonly lessonId: string;
    readonly title: string;
    readonly ipfsCID: string;
    constructor(courseId: string, chapterId: string, lessonId: string, title: string, ipfsCID: string);
}
export declare class UpdateChapterDto extends ChainCallDTO {
    readonly courseId: string;
    readonly chapterId: string;
    readonly title: string;
    constructor(courseId: string, chapterId: string, title: string);
}
export declare class CreateChapterDto extends ChainCallDTO {
    readonly courseId: string;
    readonly chapterId: string;
    readonly title: string;
    constructor(courseId: string, chapterId: string, title: string);
}
export declare class CreateLessonDto extends ChainCallDTO {
    readonly courseId: string;
    readonly chapterId: string;
    readonly lessonId: string;
    readonly title: string;
    readonly ipfsCID: string;
    constructor(courseId: string, chapterId: string, lessonId: string, title: string, ipfsCID: string);
}
