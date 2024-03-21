import { GalaChainContext } from "@gala-chain/chaincode";
import { CreateCourseDto, FetchCoursesDto, PagedCoursesDto } from "./dtos";
export declare function createCourse(ctx: GalaChainContext, dto: CreateCourseDto): Promise<void>;
export declare function fetchCourses(ctx: GalaChainContext, dto: FetchCoursesDto): Promise<PagedCoursesDto>;
