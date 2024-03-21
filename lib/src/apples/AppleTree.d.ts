import { ChainObject } from "@gala-chain/api";
import BigNumber from "bignumber.js";
import { Variety } from "./types";
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
    EnrollmentLimit: BigNumber;
    Status: string;
    constructor(CourseID: string, Creator: string, Title: string, Description: string, Price: BigNumber, EnrollmentLimit: BigNumber, Status: string);
}
export declare class Student extends ChainObject {
    static INDEX_KEY: string;
    readonly StudentID: string;
    tokens: number;
    EnrolledCourses: string[];
    CompletedCourses: string[];
    constructor(StudentID: string, EnrolledCourses: string[], CompletedCourses: string[]);
}
export declare class Lesson extends ChainObject {
    static INDEX_KEY: string;
    CourseID: string;
    readonly LessonID: string;
    Title: string;
    Description: string;
    Content: string;
    constructor(LessonID: string, CourseID: string, Title: string, Description: string, Content: string);
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
