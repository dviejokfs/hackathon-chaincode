"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleContract = void 0;
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
const package_json_1 = require("../../package.json");
const AppleTree_1 = require("./AppleTree");
const dtos_1 = require("./dtos");
const lib_1 = require("./lib");
class AppleContract extends chaincode_1.GalaContract {
    constructor() {
        super("AppleContract", package_json_1.version);
    }
    async CreateCourse(ctx, dto) {
        await (0, lib_1.createCourse)(ctx, dto);
    }
    async EditCourse(ctx, dto) {
        // check if course exists
        // if exists, update course
        await (0, lib_1.editCourse)(ctx, dto);
    }
    async CreateChapter(ctx, dto) {
        await (0, lib_1.createChapter)(ctx, dto);
    }
    async EditChapter(ctx, dto) {
        await (0, lib_1.editChapter)(ctx, dto);
    }
    async CreateLesson(ctx, dto) {
        await (0, lib_1.createLesson)(ctx, dto);
    }
    async EditLesson(ctx, dto) {
        await (0, lib_1.editLesson)(ctx, dto);
    }
    async FetchLesson(ctx, dto) {
        const lesson = await (0, lib_1.fetchLesson)(ctx, dto.courseId, dto.chapterId, dto.lessonId);
        return new dtos_1.LessonDto(lesson);
    }
    async AddBalanceToStudent(ctx, dto) {
        await (0, lib_1.addBalanceToStudent)(ctx, dto);
        // check if student exists
        // if exists, add balance
    }
    async CreateNFTForLesson(ctx, dto) {
        await (0, lib_1.createNFTForLesson)(ctx, dto);
    }
    async FetchBalanceOfStudent(ctx, _) {
        const student = await (0, lib_1.getCurrentStudent)(ctx);
        return new dtos_1.StudentBalanceDto(student.tokens.toNumber());
    }
    async FetchEnrolledCourses(ctx, dto) {
        return await (0, lib_1.fetchEnrolledCourses)(ctx, dto);
    }
    async CompleteLesson(ctx, dto) {
        return await (0, lib_1.completeLesson)(ctx, dto);
    }
    async GetStudentNFTs(ctx, dto) {
        return await (0, lib_1.getStudentNFTWithPagination)(ctx, ctx.callingUser, dto);
    }
    async EnrollInCourse(ctx, dto) {
        await (0, lib_1.enrollInCourse)(ctx, dto);
    }
    async FetchCourses(ctx, dto) {
        return await (0, lib_1.fetchCourses)(ctx, dto);
    }
    async FetchCourse(ctx, dto) {
        console.log("calling user", ctx.callingUser, decodeURIComponent(dto.creator), dto.courseId);
        return await (0, lib_1.fetchAllInfoCourse)(ctx, dto.creator, dto.courseId);
    }
    async FetchLessonNFT(ctx, dto) {
        const lesson = await (0, lib_1.fetchLesson)(ctx, dto.courseId, dto.chapterId, dto.lessonId);
        const parts = lesson.NFTClassKey.split(api_1.ChainObject.ID_SPLIT_CHAR);
        const tokenClassKey = new api_1.TokenClassKey();
        const [collection, category, type, additionalKey] = parts;
        tokenClassKey.collection = collection;
        tokenClassKey.category = category;
        tokenClassKey.type = type;
        tokenClassKey.additionalKey = additionalKey;
        return (0, chaincode_1.fetchTokenClass)(ctx, tokenClassKey);
    }
    async FetchMyCourse(ctx, dto) {
        return await (0, lib_1.fetchMyCourseAll)(ctx, dto.courseId);
    }
    async FetchCreatedCourses(ctx, dto) {
        return await (0, lib_1.fetchCreatedCourses)(ctx, dto);
    }
}
exports.AppleContract = AppleContract;
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.CreateCourseDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.CreateCourseDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "CreateCourse", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.UpdateCourseDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.UpdateCourseDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "EditCourse", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.CreateChapterDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.CreateChapterDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "CreateChapter", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.UpdateChapterDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.UpdateChapterDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "EditChapter", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.CreateLessonDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.CreateLessonDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "CreateLesson", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.UpdateLessonDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.UpdateLessonDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "EditLesson", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.FetchLessonDto,
        out: dtos_1.LessonDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.FetchLessonDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchLesson", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.AddBalanceToStudentDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.AddBalanceToStudentDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "AddBalanceToStudent", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.CreateNFTForLessonDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.CreateNFTForLessonDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "CreateNFTForLesson", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchBalanceOfStudentDto,
        out: dtos_1.StudentBalanceDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext,
        dtos_1.FetchBalanceOfStudentDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchBalanceOfStudent", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchEnrolledCoursesDto,
        out: dtos_1.PagedStudentPurchaseDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.FetchEnrolledCoursesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchEnrolledCourses", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.CompleteLessonDto,
        out: AppleTree_1.StudentNFT
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.CompleteLessonDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "CompleteLesson", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.GetStudentNFTsDto,
        out: dtos_1.PagedStudentNFTDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.GetStudentNFTsDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "GetStudentNFTs", null);
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: dtos_1.EnrollInCourseDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.EnrollInCourseDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "EnrollInCourse", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchCoursesDto,
        out: dtos_1.PagedCoursesDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.FetchCoursesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchCourses", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchCourseDto,
        out: dtos_1.CourseDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.FetchCourseDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchCourse", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchLessonDto,
        out: dtos_1.CourseDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.FetchLessonDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchLessonNFT", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchMyCourseDto,
        out: dtos_1.CourseDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.FetchCourseDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchMyCourse", null);
tslib_1.__decorate([
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchCreatedCoursesDto,
        out: dtos_1.PagedCoursesDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext,
        dtos_1.FetchCreatedCoursesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchCreatedCourses", null);
