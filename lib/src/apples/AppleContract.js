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
const chaincode_1 = require("@gala-chain/chaincode");
const package_json_1 = require("../../package.json");
const dtos_1 = require("./dtos");
const lib_1 = require("./lib");
class AppleContract extends chaincode_1.GalaContract {
    constructor() {
        super("AppleContract", package_json_1.version);
    }
    async CreateCourse(ctx, dto) {
        await (0, lib_1.createCourse)(ctx, dto);
    }
    async EditCourse() { }
    async CreateLesson() { }
    async EditLesson() { }
    async DeleteLesson() { }
    async AddBalanceToStudent() {
        // check if student exists
        // if exists, add balance
    }
    async EnrollStudentInCourse() {
        // check if student is already enrolled
        // check if student has enough balance
    }
    async CompleteLesson() {
        // check if student is enrolled in course + give tokens
        // mint nft for student
    }
    async CompleteCourse() {
        // check if student has completed all lessons
        // mint nft for student + vc
    }
    async FetchStudentCourses() {
        // get all courses for student
    }
    async FetchStudentCourse() {
        // get course for student
    }
    async FetchStudentNFTs() {
        // get all nfts for student
    }
    async FetchStudentNFT() {
        // get nft for student
    }
    async FetchCourses(ctx, dto) {
        return await (0, lib_1.fetchCourses)(ctx, dto);
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
    (0, chaincode_1.Evaluate)({
        in: dtos_1.FetchCoursesDto,
        out: dtos_1.PagedCoursesDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, dtos_1.FetchCoursesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleContract.prototype, "FetchCourses", null);
