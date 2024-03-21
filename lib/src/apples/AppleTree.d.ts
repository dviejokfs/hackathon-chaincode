import { ChainObject } from "@gala-chain/api";
import BigNumber from "bignumber.js";
import { CourseStatus, Variety } from "./types";
export declare class AppleTree extends ChainObject {
    static INDEX_KEY: string;
    readonly plantedBy: string;
    readonly variety: Variety;
    readonly index: number;
    readonly plantedAt: number;
    applesPicked: BigNumber;
    constructor(plantedBy: string, variety: Variety, index: number, plantedAt: number);
    ageInYears(now: number): BigNumber;
    applesTotal(now: number): BigNumber;
    canPick(now: number): boolean;
    ensureCanPick(now: number): {
        pick(): void;
    };
}
export declare class Course extends ChainObject {
    static INDEX_KEY: string;
    Creator: string;
    readonly CourseID: string;
    Title: string;
    Description: string;
    Price: BigNumber;
    Status: CourseStatus;
    constructor(CourseID: string, Creator: string, Title: string, Description: string, Price: BigNumber, Status: CourseStatus);
}
export declare class Student extends ChainObject {
    static INDEX_KEY: string;
    readonly StudentID: string;
    tokens: BigNumber;
    EnrolledCourses: string[];
    CompletedCourses: string[];
    constructor(StudentID: string, tokens: BigNumber, EnrolledCourses: string[], CompletedCourses: string[]);
}
export declare class StudentPurchase extends ChainObject {
    static INDEX_KEY: string;
    StudentID: string;
    CourseID: string;
    PurchaseID: string;
    TXID: string;
    CreatorCourseID: string;
    Timestamp: BigNumber;
    constructor(StudentID: string, CourseID: string, PurchaseID: string, TXID: string, CreatorCourseID: string, Timestamp: BigNumber);
}
export declare class Chapter extends ChainObject {
    static INDEX_KEY: string;
    CourseID: string;
    readonly ChapterID: string;
    Title: string;
    constructor(ChapterID: string, CourseID: string, Title: string);
}
export declare class Lesson extends ChainObject {
    static INDEX_KEY: string;
    CourseID: string;
    ChapterID: string;
    readonly LessonID: string;
    Title: string;
    Description: string;
    IPFSCID: string;
    NFTClassKey: string;
    constructor(LessonID: string, ChapterID: string, CourseID: string, Title: string, Description: string, IPFSCID: string, NFTClassKey?: string);
}
export declare class StudentNFT extends ChainObject {
    static INDEX_KEY: string;
    StudentID: string;
    NFTClassKey: string;
    NFTInstanceID: string;
    CourseID: string;
    ChapterID: string;
    LessonID: string;
    constructor(StudentID: string, NFTClassKey: string, NFTInstanceID: string, CourseID: string, ChapterID: string, LessonID: string);
}
export declare class Assignment extends ChainObject {
    static INDEX_KEY: string;
    CourseID: string;
    LessonID: string;
    readonly SubmissionID: string;
    StudentID: string;
    Timestamp: number;
    Grade: string;
    constructor(SubmissionID: string, CourseID: string, StudentID: string, Timestamp: number, Grade: string);
}
export declare class Certificate extends ChainObject {
    static INDEX_KEY: string;
    readonly CertificateID: string;
    CourseID: string;
    StudentID: string;
    IssueDate: number;
    constructor(CertificateID: string, CourseID: string, StudentID: string, IssueDate: number);
}
