/*
 * Copyright (c) Gala Games Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ChainObject, FulfillMintDto, TokenClass, TokenClassKey } from "@gala-chain/api";
import { Evaluate, GalaChainContext, GalaContract, Submit, fetchTokenClass } from "@gala-chain/chaincode";

import { version } from "../../package.json";
import { StudentNFT } from "./AppleTree";
import {
  AddBalanceToStudentDto,
  CompleteLessonDto,
  CourseDto,
  CreateChapterDto,
  CreateCourseDto,
  CreateLessonDto,
  CreateNFTForLessonDto,
  EnrollInCourseDto,
  FetchBalanceOfStudentDto,
  FetchCourseDto,
  FetchCoursesDto,
  FetchCreatedCoursesDto,
  FetchEnrolledCoursesDto,
  FetchLessonDto,
  FetchMyCourseDto,
  GetStudentNFTsDto,
  LessonDto,
  PagedCoursesDto,
  PagedStudentNFTDto,
  PagedStudentPurchaseDto,
  StudentBalanceDto,
  UpdateChapterDto,
  UpdateCourseDto,
  UpdateLessonDto
} from "./dtos";
import {
  addBalanceToStudent,
  completeLesson,
  createChapter,
  createCourse,
  createLesson,
  createNFTForLesson,
  editChapter,
  editCourse,
  editLesson,
  enrollInCourse,
  fetchAllInfoCourse,
  fetchCourses,
  fetchCreatedCourses,
  fetchEnrolledCourses,
  fetchLesson,
  fetchMyCourseAll,
  getCurrentStudent,
  getStudentNFTWithPagination
} from "./lib";

export class AppleContract extends GalaContract {
  constructor() {
    super("AppleContract", version);
  }

  @Submit({
    in: CreateCourseDto
  })
  public async CreateCourse(ctx: GalaChainContext, dto: CreateCourseDto): Promise<void> {
    await createCourse(ctx, dto);
  }

  @Submit({
    in: UpdateCourseDto
  })
  public async EditCourse(ctx: GalaChainContext, dto: UpdateCourseDto): Promise<void> {
    // check if course exists
    // if exists, update course
    await editCourse(ctx, dto);
  }
  @Submit({
    in: CreateChapterDto
  })
  public async CreateChapter(ctx: GalaChainContext, dto: CreateChapterDto): Promise<void> {
    await createChapter(ctx, dto);
  }
  @Submit({
    in: UpdateChapterDto
  })
  public async EditChapter(ctx: GalaChainContext, dto: UpdateChapterDto) {
    await editChapter(ctx, dto);
  }

  @Submit({
    in: CreateLessonDto
  })
  public async CreateLesson(ctx: GalaChainContext, dto: CreateLessonDto) {
    await createLesson(ctx, dto);
  }
  @Submit({
    in: UpdateLessonDto
  })
  public async EditLesson(ctx: GalaChainContext, dto: UpdateLessonDto) {
    await editLesson(ctx, dto);
  }
  @Submit({
    in: FetchLessonDto,
    out: LessonDto
  })
  public async FetchLesson(ctx: GalaChainContext, dto: FetchLessonDto) {
    const lesson = await fetchLesson(ctx, dto.courseId, dto.chapterId, dto.lessonId);
    return new LessonDto(lesson);
  }
  @Submit({
    in: AddBalanceToStudentDto
  })
  public async AddBalanceToStudent(ctx: GalaChainContext, dto: AddBalanceToStudentDto) {
    await addBalanceToStudent(ctx, dto);
    // check if student exists
    // if exists, add balance
  }
  @Submit({
    in: CreateNFTForLessonDto
  })
  public async CreateNFTForLesson(ctx: GalaChainContext, dto: CreateNFTForLessonDto) {
    await createNFTForLesson(ctx, dto);
  }

  @Evaluate({
    in: FetchBalanceOfStudentDto,
    out: StudentBalanceDto
  })
  public async FetchBalanceOfStudent(
    ctx: GalaChainContext,
    _: FetchBalanceOfStudentDto
  ): Promise<StudentBalanceDto> {
    const student = await getCurrentStudent(ctx);
    return new StudentBalanceDto(student.tokens.toNumber());
  }
  @Evaluate({
    in: FetchEnrolledCoursesDto,
    out: PagedStudentPurchaseDto
  })
  public async FetchEnrolledCourses(ctx: GalaChainContext, dto: FetchEnrolledCoursesDto) {
    return await fetchEnrolledCourses(ctx, dto);
  }
  @Submit({
    in: CompleteLessonDto,
    out: StudentNFT
  })
  public async CompleteLesson(ctx: GalaChainContext, dto: CompleteLessonDto): Promise<StudentNFT> {
    return await completeLesson(ctx, dto);
  }

  @Evaluate({
    in: GetStudentNFTsDto,
    out: PagedStudentNFTDto
  })
  public async GetStudentNFTs(ctx: GalaChainContext, dto: GetStudentNFTsDto): Promise<PagedStudentNFTDto> {
    return await getStudentNFTWithPagination(ctx, ctx.callingUser, dto);
  }
  @Submit({
    in: EnrollInCourseDto
  })
  public async EnrollInCourse(ctx: GalaChainContext, dto: EnrollInCourseDto) {
    await enrollInCourse(ctx, dto);
  }

  @Evaluate({
    in: FetchCoursesDto,
    out: PagedCoursesDto
  })
  public async FetchCourses(ctx: GalaChainContext, dto: FetchCoursesDto): Promise<PagedCoursesDto> {
    return await fetchCourses(ctx, dto);
  }

  @Evaluate({
    in: FetchCourseDto,
    out: CourseDto
  })
  public async FetchCourse(ctx: GalaChainContext, dto: FetchCourseDto): Promise<CourseDto> {
    console.log("calling user", ctx.callingUser, decodeURIComponent(dto.creator), dto.courseId);
    return await fetchAllInfoCourse(ctx, dto.creator, dto.courseId);
  }

  @Evaluate({
    in: FetchLessonDto,
    out: CourseDto
  })
  public async FetchLessonNFT(ctx: GalaChainContext, dto: FetchLessonDto): Promise<TokenClass> {
    const lesson = await fetchLesson(ctx, dto.courseId, dto.chapterId, dto.lessonId);
    const parts = lesson.NFTClassKey.split(ChainObject.ID_SPLIT_CHAR);
    const tokenClassKey = new TokenClassKey();
    const [collection, category, type, additionalKey] = parts;
    tokenClassKey.collection = collection;
    tokenClassKey.category = category;
    tokenClassKey.type = type;
    tokenClassKey.additionalKey = additionalKey;
    return fetchTokenClass(ctx, tokenClassKey);
  }

  @Evaluate({
    in: FetchMyCourseDto,
    out: CourseDto
  })
  public async FetchMyCourse(ctx: GalaChainContext, dto: FetchCourseDto): Promise<CourseDto> {
    return await fetchMyCourseAll(ctx, dto.courseId);
  }

  @Evaluate({
    in: FetchCreatedCoursesDto,
    out: PagedCoursesDto
  })
  public async FetchCreatedCourses(
    ctx: GalaChainContext,
    dto: FetchCreatedCoursesDto
  ): Promise<PagedCoursesDto> {
    return await fetchCreatedCourses(ctx, dto);
  }
}
