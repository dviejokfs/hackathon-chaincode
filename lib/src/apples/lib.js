"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCourses = exports.createCourse = void 0;
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
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const AppleTree_1 = require("./AppleTree");
const dtos_1 = require("./dtos");
async function createCourse(ctx, dto) {
    const course = new AppleTree_1.Course(dto.courseId, ctx.callingUser, "Test Title", "Test Description", (0, bignumber_js_1.default)(10), (0, bignumber_js_1.default)(20), "published");
    await (0, chaincode_1.putChainObject)(ctx, course);
}
exports.createCourse = createCourse;
async function fetchCourses(ctx, dto) {
    const keyParts = (0, chaincode_1.takeUntilUndefined)();
    const { results, metadata } = await (0, chaincode_1.getObjectsByPartialCompositeKeyWithPagination)(ctx, AppleTree_1.Course.INDEX_KEY, keyParts, AppleTree_1.Course, dto.bookmark, dto.limit);
    return new dtos_1.PagedCoursesDto(results, metadata.bookmark);
}
exports.fetchCourses = fetchCourses;
