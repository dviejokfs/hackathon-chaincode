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
import {
  ChainObject,
  CreateTokenClassDto,
  FulfillMintDto,
  HighThroughputMintTokenDto,
  MintTokenDto,
  TokenClassKey,
  TokenInstanceQueryKey,
  createValidDTO
} from "@gala-chain/api";
import {
  GalaChainContext,
  ObjectNotFoundError,
  createTokenClass,
  fetchTokenClass,
  getObjectByKey,
  getObjectsByPartialCompositeKeyWithPagination,
  putChainObject,
  requestMint,
  takeUntilUndefined
} from "@gala-chain/chaincode";
import BigNumber from "bignumber.js";
import { plainToInstance } from "class-transformer";

import { DEFAULT_TOKENS_STUDENT } from "../constants";
import { Chapter, Course, Lesson, Student, StudentNFT, StudentPurchase } from "./AppleTree";
import {
  AddBalanceToStudentDto,
  ChapterDto,
  CompleteLessonDto,
  CourseDto,
  CreateChapterDto,
  CreateCourseDto,
  CreateLessonDto,
  CreateNFTForLessonDto,
  EnrollInCourseDto,
  FetchCoursesDto,
  FetchCreatedCoursesDto,
  FetchPurchasedCoursesDto,
  GetStudentNFTsDto,
  LessonDto,
  PagedCoursesDto,
  PagedStudentNFTDto,
  PagedStudentPurchaseDto,
  StudentNFTWithTokenDto,
  StudentPurchaseWithCourseDto,
  UpdateChapterDto,
  UpdateCourseDto,
  UpdateLessonDto
} from "./dtos";

export async function createCourse(ctx: GalaChainContext, dto: CreateCourseDto) {
  const course = new Course(
    dto.courseId,
    ctx.callingUser,
    dto.title,
    dto.description,
    BigNumber(dto.price),
    dto.status
  );
  await putChainObject(ctx, course);
}
export async function fetchMyCourseAll(ctx: GalaChainContext, courseId: string) {
  return await fetchAllInfoCourse(ctx, ctx.callingUser, courseId);
}
export async function fetchMyCourse(ctx: GalaChainContext, courseId: string) {
  return await fetchCourse(ctx, ctx.callingUser, courseId);
}
export async function fetchCourse(ctx: GalaChainContext, creator: string, courseId: string) {
  const keyParts = [creator, courseId];
  const key = ctx.stub.createCompositeKey(Course.INDEX_KEY, keyParts);
  return await getObjectByKey(ctx, Course, key);
}
export async function fetchLesson(
  ctx: GalaChainContext,
  courseId: string,
  chapterId: string,
  lessonId: string
) {
  const keyParts = [courseId, chapterId, lessonId];
  const key = ctx.stub.createCompositeKey(Lesson.INDEX_KEY, keyParts);
  return await getObjectByKey(ctx, Lesson, key);
}
export async function fetchAllInfoCourse(
  ctx: GalaChainContext,
  creator: string,
  courseId: string
): Promise<CourseDto> {
  const course = await fetchCourse(ctx, creator, courseId);
  // get chapters
  const chapterKeyParts = [courseId];

  const dtoChapters: ChapterDto[] = [];
  const chapters = await getObjectsByPartialCompositeKeyWithPagination(
    ctx,
    Chapter.INDEX_KEY,
    chapterKeyParts,
    Chapter,
    "",
    100
  );
  // get lessons
  for (const chapter of chapters.results) {
    const lessonKeyParts = [courseId, chapter.ChapterID];
    const lessons = await getObjectsByPartialCompositeKeyWithPagination(
      ctx,
      Lesson.INDEX_KEY,
      lessonKeyParts,
      Lesson,
      "",
      100
    );
    const lessonsDto: LessonDto[] = [];
    for (const lesson of lessons.results) {
      lessonsDto.push(new LessonDto(lesson));
    }
    dtoChapters.push(new ChapterDto(chapter, lessonsDto));
  }
  return new CourseDto(course, dtoChapters);
}
export async function editCourse(ctx: GalaChainContext, dto: UpdateCourseDto) {
  const keyParts = [ctx.callingUser, dto.courseId];
  const key = ctx.stub.createCompositeKey(Course.INDEX_KEY, keyParts);
  const course = await getObjectByKey(ctx, Course, key);
  course.Title = dto.title;
  course.Description = dto.description;
  course.Price = BigNumber(dto.price);
  course.Status = dto.status;
  await putChainObject(ctx, course);
}
export async function deleteCourse(ctx: GalaChainContext, courseId: string) {
  const keyParts = [ctx.callingUser, courseId];
  const key = ctx.stub.createCompositeKey(Course.INDEX_KEY, keyParts);
  await ctx.stub.deleteState(key);
}

export async function createChapter(ctx: GalaChainContext, dto: CreateChapterDto) {
  const course = await fetchMyCourse(ctx, dto.courseId);
  const chapter = new Chapter(dto.chapterId, course.CourseID, dto.title);
  await putChainObject(ctx, chapter);
}

export async function fetchChapter(ctx: GalaChainContext, courseId: string, chapterId: string) {
  const keyParts = [courseId, chapterId];
  const key = ctx.stub.createCompositeKey(Chapter.INDEX_KEY, keyParts);
  return await getObjectByKey(ctx, Chapter, key);
}

export async function editChapter(ctx: GalaChainContext, dto: UpdateChapterDto) {
  const keyParts = [dto.courseId, dto.chapterId];
  const key = ctx.stub.createCompositeKey(Chapter.INDEX_KEY, keyParts);
  const chapter = await getObjectByKey(ctx, Chapter, key);
  chapter.Title = dto.title;
  await putChainObject(ctx, chapter);
}

export async function deleteChapter(ctx: GalaChainContext, courseId: string, chapterId: string) {
  const keyParts = [courseId, chapterId];
  const key = ctx.stub.createCompositeKey(Chapter.INDEX_KEY, keyParts);
  await ctx.stub.deleteState(key);
}

export async function createLesson(ctx: GalaChainContext, dto: CreateLessonDto) {
  const course = await fetchMyCourse(ctx, dto.courseId);
  const chapter = await fetchChapter(ctx, dto.courseId, dto.chapterId);
  const lesson = new Lesson(dto.lessonId, chapter.ChapterID, course.CourseID, dto.title, "", dto.ipfsCID);
  await putChainObject(ctx, lesson);
}
export async function editLesson(ctx: GalaChainContext, dto: UpdateLessonDto) {
  const keyParts = [dto.courseId, dto.chapterId, dto.lessonId];
  const key = ctx.stub.createCompositeKey(Lesson.INDEX_KEY, keyParts);
  const lesson = await getObjectByKey(ctx, Lesson, key);
  lesson.Title = dto.title;
  lesson.IPFSCID = dto.ipfsCID;
  await putChainObject(ctx, lesson);
}
export async function getStudentNFTWithPagination(
  ctx: GalaChainContext,
  studentId: string,
  dto: GetStudentNFTsDto
) {
  const keyParts = [studentId];
  const { results, metadata } = await getObjectsByPartialCompositeKeyWithPagination(
    ctx,
    StudentNFT.INDEX_KEY,
    keyParts,
    StudentNFT,
    dto.bookmark,
    dto.limit
  );
  const studentsWithToken: StudentNFTWithTokenDto[] = [];
  for (const result of results) {
    const token = await getTokenClassByKey(ctx, result.NFTClassKey);
    const studentWithToken = new StudentNFTWithTokenDto(result, token);
    studentsWithToken.push(studentWithToken);
  }
  return new PagedStudentNFTDto(studentsWithToken, metadata.bookmark);
}

export async function completeLesson(ctx: GalaChainContext, dto: CompleteLessonDto): Promise<StudentNFT> {
  const lesson = await fetchLesson(ctx, dto.courseId, dto.chapterId, dto.lessonId);
  if (!lesson.NFTClassKey) {
    throw new Error("NFT not found for lesson");
  }
  // check if student already has NFT
  const studentNFTKeyParts = [ctx.callingUser, lesson.NFTClassKey];
  const studentNFTKey = ctx.stub.createCompositeKey(StudentNFT.INDEX_KEY, studentNFTKeyParts);
  try {
    const studentNFTExist = await getObjectByKey(ctx, StudentNFT, studentNFTKey);
    if (studentNFTExist) {
      throw new Error("Student already has NFT");
    }
  } catch (e) {
    if (e instanceof ObjectNotFoundError) {
      // do nothing
    } else {
      throw e;
    }
  }
  const studentNFT = new StudentNFT(
    ctx.callingUser,
    lesson.NFTClassKey,
    ctx.stub.getTxID(),
    dto.courseId,
    dto.chapterId,
    dto.lessonId
  );
  await putChainObject(ctx, studentNFT);
  // add 50 tokens to student
  const addBalanceToStudentDto = new AddBalanceToStudentDto(50);
  await addBalanceToStudent(ctx, addBalanceToStudentDto);
  return studentNFT;
}
export async function getTokenClassByKey(ctx: GalaChainContext, nftClassKey: string) {
  const parts = nftClassKey.split(ChainObject.ID_SPLIT_CHAR);
  const tokenClassKey = new TokenClassKey();
  const [collection, category, type, additionalKey] = parts;
  tokenClassKey.collection = collection;
  tokenClassKey.category = category;
  tokenClassKey.type = type;
  tokenClassKey.additionalKey = additionalKey;
  return fetchTokenClass(ctx, tokenClassKey);
}
export async function createNFTForLesson(ctx: GalaChainContext, dto: CreateNFTForLessonDto) {
  const lesson = await fetchLesson(ctx, dto.courseId, dto.chapterId, dto.lessonId);
  if (!lesson) {
    throw new Error("Lesson not found");
  }
  if (lesson.NFTClassKey) {
    throw new Error("NFT already created for lesson");
  }
  const nftClassKey: TokenClassKey = plainToInstance(TokenClassKey, {
    collection: dto.NFTCollectionName,
    category: dto.NFTCategory,
    type: dto.NFTType,
    additionalKey: dto.NFTAdditionalKey
  });
  const galaTokenDto: CreateTokenClassDto = await createValidDTO<CreateTokenClassDto>(CreateTokenClassDto, {
    decimals: 0,
    tokenClass: nftClassKey,
    name: nftClassKey.collection,
    symbol: dto.NFTSymbol,
    description: dto.NFTDescription,
    isNonFungible: true,
    image: dto.NFTImage,
    maxSupply: new BigNumber(dto.NFTMaxSupply)
  });
  const tokenClass = await createTokenClass(ctx, {
    network: galaTokenDto.network ?? CreateTokenClassDto.DEFAULT_NETWORK,
    tokenClass: galaTokenDto.tokenClass,
    isNonFungible: !!galaTokenDto.isNonFungible,
    decimals: galaTokenDto.decimals ?? CreateTokenClassDto.DEFAULT_DECIMALS,
    name: galaTokenDto.name,
    symbol: galaTokenDto.symbol,
    description: galaTokenDto.description,
    rarity: galaTokenDto.rarity,
    image: galaTokenDto.image,
    metadataAddress: galaTokenDto.metadataAddress,
    contractAddress: galaTokenDto.contractAddress,
    maxSupply: galaTokenDto.maxSupply ?? CreateTokenClassDto.DEFAULT_MAX_SUPPLY,
    maxCapacity: galaTokenDto.maxCapacity ?? CreateTokenClassDto.DEFAULT_MAX_CAPACITY,
    totalMintAllowance: galaTokenDto.totalMintAllowance ?? CreateTokenClassDto.INITIAL_MINT_ALLOWANCE,
    totalSupply: galaTokenDto.totalSupply ?? CreateTokenClassDto.INITIAL_TOTAL_SUPPLY,
    totalBurned: galaTokenDto.totalBurned ?? CreateTokenClassDto.INITIAL_TOTAL_BURNED,
    authorities: galaTokenDto.authorities ?? [ctx.callingUser]
  });
  const tokenKey = tokenClass.toStringKey();
  lesson.NFTClassKey = tokenKey;
  await putChainObject(ctx, lesson);
  return { lesson, tokenKey };
}

export async function deleteLesson(
  ctx: GalaChainContext,
  courseId: string,
  chapterId: string,
  lessonId: string
) {
  const keyParts = [courseId, chapterId, lessonId];
  const key = ctx.stub.createCompositeKey(Lesson.INDEX_KEY, keyParts);
  await ctx.stub.deleteState(key);
}

export async function enrollInCourse(ctx: GalaChainContext, dto: EnrollInCourseDto) {
  const student = await getCurrentStudent(ctx);
  const course = await fetchCourse(ctx, dto.creator, dto.courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  // check if student already enrolled
  try {
    const studentPurchaseKeyParts = [ctx.callingUser, dto.courseId];
    const studentPurchaseKey = ctx.stub.createCompositeKey(
      StudentPurchase.INDEX_KEY,
      studentPurchaseKeyParts
    );
    const studentPurchaseExist = await getObjectByKey(ctx, StudentPurchase, studentPurchaseKey);
    if (studentPurchaseExist) {
      throw new Error("Student already enrolled");
    }
  } catch (e) {
    if (e instanceof ObjectNotFoundError) {
      // do nothing
    } else {
      throw e;
    }
  }

  // check balance
  if (BigNumber(student.tokens).isLessThan(course.Price)) {
    throw new Error("Not enough balance");
  }
  student.tokens = BigNumber(student.tokens).minus(course.Price);
  const txId = ctx.stub.getTxID();
  const studentPurchase = new StudentPurchase(
    ctx.callingUser,
    dto.courseId,
    txId,
    txId,
    course.Creator,
    BigNumber(ctx.txUnixTime)
  );
  // update student
  await putChainObject(ctx, student);
  // save student purchase
  await putChainObject(ctx, studentPurchase);
}
export async function fetchEnrolledCourses(ctx: GalaChainContext, dto: FetchPurchasedCoursesDto) {
  const keyParts = [ctx.callingUser];
  const { results, metadata } = await getObjectsByPartialCompositeKeyWithPagination(
    ctx,
    StudentPurchase.INDEX_KEY,
    keyParts,
    StudentPurchase,
    dto.bookmark,
    dto.limit
  );
  const studentPurchaseWithCourses: StudentPurchaseWithCourseDto[] = [];
  for (const sp of results) {
    try {
      const course = await fetchCourse(ctx, sp.CreatorCourseID, sp.CourseID);
      studentPurchaseWithCourses.push(new StudentPurchaseWithCourseDto(course, sp));
    } catch (e) {
      if (e instanceof ObjectNotFoundError) {
        // do nothing
      } else {
        throw e;
      }
    }
  }
  return new PagedStudentPurchaseDto(studentPurchaseWithCourses, metadata.bookmark);
}

export async function fetchCourses(ctx: GalaChainContext, dto: FetchCoursesDto): Promise<PagedCoursesDto> {
  const keyParts = takeUntilUndefined();

  const { results, metadata } = await getObjectsByPartialCompositeKeyWithPagination(
    ctx,
    Course.INDEX_KEY,
    keyParts,
    Course,
    dto.bookmark,
    dto.limit
  );

  return new PagedCoursesDto(results, metadata.bookmark);
}

export async function getCurrentStudent(ctx: GalaChainContext) {
  const keyParts = [ctx.callingUser];
  const key = ctx.stub.createCompositeKey(Student.INDEX_KEY, keyParts);
  try {
    const student = await getObjectByKey(ctx, Student, key);
    if (student) {
      return student;
    }
    // create student
    const newStudent = new Student(ctx.callingUser, BigNumber(DEFAULT_TOKENS_STUDENT), [], []);
    await putChainObject(ctx, newStudent);
    return newStudent;
  } catch (e) {
    if (e instanceof ObjectNotFoundError) {
      const newStudent = new Student(ctx.callingUser, BigNumber(DEFAULT_TOKENS_STUDENT), [], []);
      await putChainObject(ctx, newStudent);
      return newStudent;
    }
    throw e;
  }
}

export async function addBalanceToStudent(ctx: GalaChainContext, dto: AddBalanceToStudentDto) {
  const student = await getCurrentStudent(ctx);
  student.tokens = BigNumber(student.tokens).plus(dto.amount);
  await putChainObject(ctx, student);
}

export async function fetchCreatedCourses(
  ctx: GalaChainContext,
  dto: FetchCreatedCoursesDto
): Promise<PagedCoursesDto> {
  const keyParts = [ctx.callingUser];
  const { results, metadata } = await getObjectsByPartialCompositeKeyWithPagination(
    ctx,
    Course.INDEX_KEY,
    keyParts,
    Course,
    dto.bookmark,
    dto.limit
  );

  return new PagedCoursesDto(results, metadata.bookmark);
}
