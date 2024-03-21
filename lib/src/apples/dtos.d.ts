import { ChainCallDTO } from "@gala-chain/api";
import { AppleTree, Course } from "./AppleTree";
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
export declare class EditCourseDto extends ChainCallDTO {
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
export declare class PagedCoursesDto {
    readonly courses: Course[];
    readonly bookmark: string;
    constructor(courses: Course[], bookmark: string);
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
