"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCreatedCourses = exports.addBalanceToStudent = exports.getCurrentStudent = exports.fetchCourses = exports.fetchEnrolledCourses = exports.enrollInCourse = exports.deleteLesson = exports.createNFTForLesson = exports.getTokenClassByKey = exports.completeLesson = exports.getStudentNFTWithPagination = exports.editLesson = exports.createLesson = exports.deleteChapter = exports.editChapter = exports.fetchChapter = exports.createChapter = exports.deleteCourse = exports.editCourse = exports.fetchAllInfoCourse = exports.fetchLesson = exports.fetchCourse = exports.fetchMyCourse = exports.fetchMyCourseAll = exports.createCourse = void 0;
const tslib_1 = require("tslib");
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
const api_1 = require("@gala-chain/api");
const chaincode_1 = require("@gala-chain/chaincode");
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../constants");
const AppleTree_1 = require("./AppleTree");
const dtos_1 = require("./dtos");
async function createCourse(ctx, dto) {
    const course = new AppleTree_1.Course(dto.courseId, ctx.callingUser, dto.title, dto.description, (0, bignumber_js_1.default)(dto.price), dto.status);
    await (0, chaincode_1.putChainObject)(ctx, course);
}
exports.createCourse = createCourse;
async function fetchMyCourseAll(ctx, courseId) {
    return await fetchAllInfoCourse(ctx, ctx.callingUser, courseId);
}
exports.fetchMyCourseAll = fetchMyCourseAll;
async function fetchMyCourse(ctx, courseId) {
    return await fetchCourse(ctx, ctx.callingUser, courseId);
}
exports.fetchMyCourse = fetchMyCourse;
async function fetchCourse(ctx, creator, courseId) {
    const keyParts = [creator, courseId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Course.INDEX_KEY, keyParts);
    return await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.Course, key);
}
exports.fetchCourse = fetchCourse;
async function fetchLesson(ctx, courseId, chapterId, lessonId) {
    const keyParts = [courseId, chapterId, lessonId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Lesson.INDEX_KEY, keyParts);
    return await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.Lesson, key);
}
exports.fetchLesson = fetchLesson;
async function fetchAllInfoCourse(ctx, creator, courseId) {
    const course = await fetchCourse(ctx, creator, courseId);
    // get chapters
    const chapterKeyParts = [courseId];
    const dtoChapters = [];
    const chapters = await (0, chaincode_1.getObjectsByPartialCompositeKeyWithPagination)(ctx, AppleTree_1.Chapter.INDEX_KEY, chapterKeyParts, AppleTree_1.Chapter, "", 100);
    // get lessons
    for (const chapter of chapters.results) {
        const lessonKeyParts = [courseId, chapter.ChapterID];
        const lessons = await (0, chaincode_1.getObjectsByPartialCompositeKeyWithPagination)(ctx, AppleTree_1.Lesson.INDEX_KEY, lessonKeyParts, AppleTree_1.Lesson, "", 100);
        const lessonsDto = [];
        for (const lesson of lessons.results) {
            lessonsDto.push(new dtos_1.LessonDto(lesson));
        }
        dtoChapters.push(new dtos_1.ChapterDto(chapter, lessonsDto));
    }
    return new dtos_1.CourseDto(course, dtoChapters);
}
exports.fetchAllInfoCourse = fetchAllInfoCourse;
async function editCourse(ctx, dto) {
    const keyParts = [ctx.callingUser, dto.courseId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Course.INDEX_KEY, keyParts);
    const course = await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.Course, key);
    course.Title = dto.title;
    course.Description = dto.description;
    course.Price = (0, bignumber_js_1.default)(dto.price);
    course.Status = dto.status;
    await (0, chaincode_1.putChainObject)(ctx, course);
}
exports.editCourse = editCourse;
async function deleteCourse(ctx, courseId) {
    const keyParts = [ctx.callingUser, courseId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Course.INDEX_KEY, keyParts);
    await ctx.stub.deleteState(key);
}
exports.deleteCourse = deleteCourse;
async function createChapter(ctx, dto) {
    const course = await fetchMyCourse(ctx, dto.courseId);
    const chapter = new AppleTree_1.Chapter(dto.chapterId, course.CourseID, dto.title);
    await (0, chaincode_1.putChainObject)(ctx, chapter);
}
exports.createChapter = createChapter;
async function fetchChapter(ctx, courseId, chapterId) {
    const keyParts = [courseId, chapterId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Chapter.INDEX_KEY, keyParts);
    return await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.Chapter, key);
}
exports.fetchChapter = fetchChapter;
async function editChapter(ctx, dto) {
    const keyParts = [dto.courseId, dto.chapterId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Chapter.INDEX_KEY, keyParts);
    const chapter = await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.Chapter, key);
    chapter.Title = dto.title;
    await (0, chaincode_1.putChainObject)(ctx, chapter);
}
exports.editChapter = editChapter;
async function deleteChapter(ctx, courseId, chapterId) {
    const keyParts = [courseId, chapterId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Chapter.INDEX_KEY, keyParts);
    await ctx.stub.deleteState(key);
}
exports.deleteChapter = deleteChapter;
async function createLesson(ctx, dto) {
    const course = await fetchMyCourse(ctx, dto.courseId);
    const chapter = await fetchChapter(ctx, dto.courseId, dto.chapterId);
    const lesson = new AppleTree_1.Lesson(dto.lessonId, chapter.ChapterID, course.CourseID, dto.title, "", dto.ipfsCID);
    await (0, chaincode_1.putChainObject)(ctx, lesson);
}
exports.createLesson = createLesson;
async function editLesson(ctx, dto) {
    const keyParts = [dto.courseId, dto.chapterId, dto.lessonId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Lesson.INDEX_KEY, keyParts);
    const lesson = await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.Lesson, key);
    lesson.Title = dto.title;
    lesson.IPFSCID = dto.ipfsCID;
    await (0, chaincode_1.putChainObject)(ctx, lesson);
}
exports.editLesson = editLesson;
async function getStudentNFTWithPagination(ctx, studentId, dto) {
    const keyParts = [studentId];
    const { results, metadata } = await (0, chaincode_1.getObjectsByPartialCompositeKeyWithPagination)(ctx, AppleTree_1.StudentNFT.INDEX_KEY, keyParts, AppleTree_1.StudentNFT, dto.bookmark, dto.limit);
    const studentsWithToken = [];
    for (const result of results) {
        const token = await getTokenClassByKey(ctx, result.NFTClassKey);
        const studentWithToken = new dtos_1.StudentNFTWithTokenDto(result, token);
        studentsWithToken.push(studentWithToken);
    }
    return new dtos_1.PagedStudentNFTDto(studentsWithToken, metadata.bookmark);
}
exports.getStudentNFTWithPagination = getStudentNFTWithPagination;
async function completeLesson(ctx, dto) {
    const lesson = await fetchLesson(ctx, dto.courseId, dto.chapterId, dto.lessonId);
    if (!lesson.NFTClassKey) {
        throw new Error("NFT not found for lesson");
    }
    // check if student already has NFT
    const studentNFTKeyParts = [ctx.callingUser, lesson.NFTClassKey];
    const studentNFTKey = ctx.stub.createCompositeKey(AppleTree_1.StudentNFT.INDEX_KEY, studentNFTKeyParts);
    try {
        const studentNFTExist = await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.StudentNFT, studentNFTKey);
        if (studentNFTExist) {
            throw new Error("Student already has NFT");
        }
    }
    catch (e) {
        if (e instanceof chaincode_1.ObjectNotFoundError) {
            // do nothing
        }
        else {
            throw e;
        }
    }
    const studentNFT = new AppleTree_1.StudentNFT(ctx.callingUser, lesson.NFTClassKey, ctx.stub.getTxID(), dto.courseId, dto.chapterId, dto.lessonId);
    await (0, chaincode_1.putChainObject)(ctx, studentNFT);
    // add 50 tokens to student
    const addBalanceToStudentDto = new dtos_1.AddBalanceToStudentDto(50);
    await addBalanceToStudent(ctx, addBalanceToStudentDto);
    return studentNFT;
}
exports.completeLesson = completeLesson;
async function getTokenClassByKey(ctx, nftClassKey) {
    const parts = nftClassKey.split(api_1.ChainObject.ID_SPLIT_CHAR);
    const tokenClassKey = new api_1.TokenClassKey();
    const [collection, category, type, additionalKey] = parts;
    tokenClassKey.collection = collection;
    tokenClassKey.category = category;
    tokenClassKey.type = type;
    tokenClassKey.additionalKey = additionalKey;
    return (0, chaincode_1.fetchTokenClass)(ctx, tokenClassKey);
}
exports.getTokenClassByKey = getTokenClassByKey;
async function createNFTForLesson(ctx, dto) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const lesson = await fetchLesson(ctx, dto.courseId, dto.chapterId, dto.lessonId);
    if (!lesson) {
        throw new Error("Lesson not found");
    }
    if (lesson.NFTClassKey) {
        throw new Error("NFT already created for lesson");
    }
    const nftClassKey = (0, class_transformer_1.plainToInstance)(api_1.TokenClassKey, {
        collection: dto.NFTCollectionName,
        category: dto.NFTCategory,
        type: dto.NFTType,
        additionalKey: dto.NFTAdditionalKey
    });
    const galaTokenDto = await (0, api_1.createValidDTO)(api_1.CreateTokenClassDto, {
        decimals: 0,
        tokenClass: nftClassKey,
        name: nftClassKey.collection,
        symbol: dto.NFTSymbol,
        description: dto.NFTDescription,
        isNonFungible: true,
        image: dto.NFTImage,
        maxSupply: new bignumber_js_1.default(dto.NFTMaxSupply)
    });
    const tokenClass = await (0, chaincode_1.createTokenClass)(ctx, {
        network: (_a = galaTokenDto.network) !== null && _a !== void 0 ? _a : api_1.CreateTokenClassDto.DEFAULT_NETWORK,
        tokenClass: galaTokenDto.tokenClass,
        isNonFungible: !!galaTokenDto.isNonFungible,
        decimals: (_b = galaTokenDto.decimals) !== null && _b !== void 0 ? _b : api_1.CreateTokenClassDto.DEFAULT_DECIMALS,
        name: galaTokenDto.name,
        symbol: galaTokenDto.symbol,
        description: galaTokenDto.description,
        rarity: galaTokenDto.rarity,
        image: galaTokenDto.image,
        metadataAddress: galaTokenDto.metadataAddress,
        contractAddress: galaTokenDto.contractAddress,
        maxSupply: (_c = galaTokenDto.maxSupply) !== null && _c !== void 0 ? _c : api_1.CreateTokenClassDto.DEFAULT_MAX_SUPPLY,
        maxCapacity: (_d = galaTokenDto.maxCapacity) !== null && _d !== void 0 ? _d : api_1.CreateTokenClassDto.DEFAULT_MAX_CAPACITY,
        totalMintAllowance: (_e = galaTokenDto.totalMintAllowance) !== null && _e !== void 0 ? _e : api_1.CreateTokenClassDto.INITIAL_MINT_ALLOWANCE,
        totalSupply: (_f = galaTokenDto.totalSupply) !== null && _f !== void 0 ? _f : api_1.CreateTokenClassDto.INITIAL_TOTAL_SUPPLY,
        totalBurned: (_g = galaTokenDto.totalBurned) !== null && _g !== void 0 ? _g : api_1.CreateTokenClassDto.INITIAL_TOTAL_BURNED,
        authorities: (_h = galaTokenDto.authorities) !== null && _h !== void 0 ? _h : [ctx.callingUser]
    });
    const tokenKey = tokenClass.toStringKey();
    lesson.NFTClassKey = tokenKey;
    await (0, chaincode_1.putChainObject)(ctx, lesson);
    return { lesson, tokenKey };
}
exports.createNFTForLesson = createNFTForLesson;
async function deleteLesson(ctx, courseId, chapterId, lessonId) {
    const keyParts = [courseId, chapterId, lessonId];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Lesson.INDEX_KEY, keyParts);
    await ctx.stub.deleteState(key);
}
exports.deleteLesson = deleteLesson;
async function enrollInCourse(ctx, dto) {
    const student = await getCurrentStudent(ctx);
    const course = await fetchCourse(ctx, dto.creator, dto.courseId);
    if (!course) {
        throw new Error("Course not found");
    }
    // check if student already enrolled
    try {
        const studentPurchaseKeyParts = [ctx.callingUser, dto.courseId];
        const studentPurchaseKey = ctx.stub.createCompositeKey(AppleTree_1.StudentPurchase.INDEX_KEY, studentPurchaseKeyParts);
        const studentPurchaseExist = await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.StudentPurchase, studentPurchaseKey);
        if (studentPurchaseExist) {
            throw new Error("Student already enrolled");
        }
    }
    catch (e) {
        if (e instanceof chaincode_1.ObjectNotFoundError) {
            // do nothing
        }
        else {
            throw e;
        }
    }
    // check balance
    if ((0, bignumber_js_1.default)(student.tokens).isLessThan(course.Price)) {
        throw new Error("Not enough balance");
    }
    student.tokens = (0, bignumber_js_1.default)(student.tokens).minus(course.Price);
    const txId = ctx.stub.getTxID();
    const studentPurchase = new AppleTree_1.StudentPurchase(ctx.callingUser, dto.courseId, txId, txId, course.Creator, (0, bignumber_js_1.default)(ctx.txUnixTime));
    // update student
    await (0, chaincode_1.putChainObject)(ctx, student);
    // save student purchase
    await (0, chaincode_1.putChainObject)(ctx, studentPurchase);
}
exports.enrollInCourse = enrollInCourse;
async function fetchEnrolledCourses(ctx, dto) {
    const keyParts = [ctx.callingUser];
    const { results, metadata } = await (0, chaincode_1.getObjectsByPartialCompositeKeyWithPagination)(ctx, AppleTree_1.StudentPurchase.INDEX_KEY, keyParts, AppleTree_1.StudentPurchase, dto.bookmark, dto.limit);
    const studentPurchaseWithCourses = [];
    for (const sp of results) {
        try {
            const course = await fetchCourse(ctx, sp.CreatorCourseID, sp.CourseID);
            studentPurchaseWithCourses.push(new dtos_1.StudentPurchaseWithCourseDto(course, sp));
        }
        catch (e) {
            if (e instanceof chaincode_1.ObjectNotFoundError) {
                // do nothing
            }
            else {
                throw e;
            }
        }
    }
    return new dtos_1.PagedStudentPurchaseDto(studentPurchaseWithCourses, metadata.bookmark);
}
exports.fetchEnrolledCourses = fetchEnrolledCourses;
async function fetchCourses(ctx, dto) {
    const keyParts = (0, chaincode_1.takeUntilUndefined)();
    const { results, metadata } = await (0, chaincode_1.getObjectsByPartialCompositeKeyWithPagination)(ctx, AppleTree_1.Course.INDEX_KEY, keyParts, AppleTree_1.Course, dto.bookmark, dto.limit);
    return new dtos_1.PagedCoursesDto(results, metadata.bookmark);
}
exports.fetchCourses = fetchCourses;
async function getCurrentStudent(ctx) {
    const keyParts = [ctx.callingUser];
    const key = ctx.stub.createCompositeKey(AppleTree_1.Student.INDEX_KEY, keyParts);
    try {
        const student = await (0, chaincode_1.getObjectByKey)(ctx, AppleTree_1.Student, key);
        if (student) {
            return student;
        }
        // create student
        const newStudent = new AppleTree_1.Student(ctx.callingUser, (0, bignumber_js_1.default)(constants_1.DEFAULT_TOKENS_STUDENT), [], []);
        await (0, chaincode_1.putChainObject)(ctx, newStudent);
        return newStudent;
    }
    catch (e) {
        if (e instanceof chaincode_1.ObjectNotFoundError) {
            const newStudent = new AppleTree_1.Student(ctx.callingUser, (0, bignumber_js_1.default)(constants_1.DEFAULT_TOKENS_STUDENT), [], []);
            await (0, chaincode_1.putChainObject)(ctx, newStudent);
            return newStudent;
        }
        throw e;
    }
}
exports.getCurrentStudent = getCurrentStudent;
async function addBalanceToStudent(ctx, dto) {
    const student = await getCurrentStudent(ctx);
    student.tokens = (0, bignumber_js_1.default)(student.tokens).plus(dto.amount);
    await (0, chaincode_1.putChainObject)(ctx, student);
}
exports.addBalanceToStudent = addBalanceToStudent;
async function fetchCreatedCourses(ctx, dto) {
    const keyParts = [ctx.callingUser];
    const { results, metadata } = await (0, chaincode_1.getObjectsByPartialCompositeKeyWithPagination)(ctx, AppleTree_1.Course.INDEX_KEY, keyParts, AppleTree_1.Course, dto.bookmark, dto.limit);
    return new dtos_1.PagedCoursesDto(results, metadata.bookmark);
}
exports.fetchCreatedCourses = fetchCreatedCourses;
