"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLessonDto = exports.CreateChapterDto = exports.UpdateChapterDto = exports.UpdateLessonDto = exports.UpdateCourseDto = exports.FetchCourseDto = exports.CourseDto = exports.FetchLessonDto = exports.CreateNFTForLessonDto = exports.CompleteLessonDto = exports.ChapterDto = exports.LessonDto = exports.FetchMyCourseDto = exports.EnrollInCourseDto = exports.PagedTreesDto = exports.FetchTreesDto = exports.StudentBalanceDto = exports.PagedStudentNFTDto = exports.StudentNFTWithTokenDto = exports.GetStudentNFTsDto = exports.PagedStudentPurchaseDto = exports.StudentPurchaseWithCourseDto = exports.PagedCoursesDto = exports.FetchBalanceOfStudentDto = exports.FetchCoursesDto = exports.PickAppleDto = exports.FetchPurchasedCoursesDto = exports.AddBalanceToStudentDto = exports.FetchEnrolledCoursesDto = exports.FetchCreatedCoursesDto = exports.CreateCourseDto = exports.AppleTreesDto = exports.AppleTreeDto = void 0;
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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AppleTree_1 = require("./AppleTree");
const types_1 = require("./types");
class AppleTreeDto extends api_1.ChainCallDTO {
    constructor(variety, index) {
        super();
        this.variety = variety;
        this.index = index;
    }
}
exports.AppleTreeDto = AppleTreeDto;
tslib_1.__decorate([
    (0, api_1.StringEnumProperty)(types_1.Variety),
    tslib_1.__metadata("design:type", String)
], AppleTreeDto.prototype, "variety", void 0);
class AppleTreesDto extends api_1.ChainCallDTO {
    constructor(trees) {
        super();
        this.trees = trees;
    }
}
exports.AppleTreesDto = AppleTreesDto;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AppleTreeDto),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], AppleTreesDto.prototype, "trees", void 0);
class CreateCourseDto extends api_1.ChainCallDTO {
    constructor(courseId, title, description, price, status) {
        super();
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = status;
    }
}
exports.CreateCourseDto = CreateCourseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, api_1.StringEnumProperty)(types_1.CourseStatus),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "status", void 0);
class FetchCreatedCoursesDto extends api_1.ChainCallDTO {
    constructor(bookmark, limit) {
        super();
        this.bookmark = bookmark;
        this.limit = limit;
    }
}
exports.FetchCreatedCoursesDto = FetchCreatedCoursesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FetchCreatedCoursesDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], FetchCreatedCoursesDto.prototype, "limit", void 0);
class FetchEnrolledCoursesDto extends api_1.ChainCallDTO {
    constructor(bookmark, limit) {
        super();
        this.bookmark = bookmark;
        this.limit = limit;
    }
}
exports.FetchEnrolledCoursesDto = FetchEnrolledCoursesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FetchEnrolledCoursesDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], FetchEnrolledCoursesDto.prototype, "limit", void 0);
class AddBalanceToStudentDto extends api_1.ChainCallDTO {
    constructor(amount) {
        super();
        this.amount = amount;
    }
}
exports.AddBalanceToStudentDto = AddBalanceToStudentDto;
class FetchPurchasedCoursesDto extends api_1.ChainCallDTO {
    constructor(bookmark, limit) {
        super();
        this.bookmark = bookmark;
        this.limit = limit;
    }
}
exports.FetchPurchasedCoursesDto = FetchPurchasedCoursesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FetchPurchasedCoursesDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], FetchPurchasedCoursesDto.prototype, "limit", void 0);
class PickAppleDto extends api_1.ChainCallDTO {
    constructor(treePlantedBy, variety, index) {
        super();
        this.PlantedBy = treePlantedBy;
        this.variety = variety;
        this.index = index;
    }
}
exports.PickAppleDto = PickAppleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PickAppleDto.prototype, "PlantedBy", void 0);
tslib_1.__decorate([
    (0, api_1.StringEnumProperty)(types_1.Variety),
    tslib_1.__metadata("design:type", String)
], PickAppleDto.prototype, "variety", void 0);
class FetchCoursesDto extends api_1.ChainCallDTO {
    constructor(creator, bookmark, limit) {
        super();
        this.creator = creator;
        this.bookmark = bookmark;
        this.limit = limit;
    }
}
exports.FetchCoursesDto = FetchCoursesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.creator !== undefined),
    tslib_1.__metadata("design:type", String)
], FetchCoursesDto.prototype, "creator", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FetchCoursesDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], FetchCoursesDto.prototype, "limit", void 0);
class FetchBalanceOfStudentDto extends api_1.ChainCallDTO {
    constructor() {
        super();
    }
}
exports.FetchBalanceOfStudentDto = FetchBalanceOfStudentDto;
class PagedCoursesDto {
    constructor(courses, bookmark) {
        this.courses = courses;
        this.bookmark = bookmark;
    }
}
exports.PagedCoursesDto = PagedCoursesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AppleTree_1.Course),
    tslib_1.__metadata("design:type", Array)
], PagedCoursesDto.prototype, "courses", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PagedCoursesDto.prototype, "bookmark", void 0);
class StudentPurchaseWithCourseDto extends api_1.ChainCallDTO {
    constructor(Course, StudentPurchase) {
        super();
        this.Course = Course;
        this.StudentPurchase = StudentPurchase;
    }
}
exports.StudentPurchaseWithCourseDto = StudentPurchaseWithCourseDto;
class PagedStudentPurchaseDto {
    constructor(purchases, bookmark) {
        this.purchases = purchases;
        this.bookmark = bookmark;
    }
}
exports.PagedStudentPurchaseDto = PagedStudentPurchaseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AppleTree_1.StudentPurchase),
    tslib_1.__metadata("design:type", Array)
], PagedStudentPurchaseDto.prototype, "purchases", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PagedStudentPurchaseDto.prototype, "bookmark", void 0);
class GetStudentNFTsDto extends api_1.ChainCallDTO {
    constructor(bookmark, limit) {
        super();
        this.bookmark = bookmark;
        this.limit = limit;
    }
}
exports.GetStudentNFTsDto = GetStudentNFTsDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetStudentNFTsDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetStudentNFTsDto.prototype, "limit", void 0);
class StudentNFTWithTokenDto extends api_1.ChainCallDTO {
    constructor(StudentNFT, Token) {
        super();
        this.StudentNFT = StudentNFT;
        this.Token = Token;
    }
}
exports.StudentNFTWithTokenDto = StudentNFTWithTokenDto;
class PagedStudentNFTDto {
    constructor(nfts, bookmark) {
        this.nfts = nfts;
        this.bookmark = bookmark;
    }
}
exports.PagedStudentNFTDto = PagedStudentNFTDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StudentNFTWithTokenDto),
    tslib_1.__metadata("design:type", Array)
], PagedStudentNFTDto.prototype, "nfts", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PagedStudentNFTDto.prototype, "bookmark", void 0);
class StudentBalanceDto extends api_1.ChainCallDTO {
    constructor(balance) {
        super();
        this.balance = balance;
    }
}
exports.StudentBalanceDto = StudentBalanceDto;
class FetchTreesDto extends api_1.ChainCallDTO {
    constructor(plantedBy, variety, index, bookmark, limit) {
        super();
        this.plantedBy = plantedBy;
        this.variety = variety;
        this.index = index;
        this.bookmark = bookmark;
        this.limit = limit;
    }
}
exports.FetchTreesDto = FetchTreesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.plantedBy !== undefined || o.variety !== undefined),
    tslib_1.__metadata("design:type", String)
], FetchTreesDto.prototype, "plantedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsIn)(Object.keys(types_1.Variety)),
    (0, class_validator_1.ValidateIf)((o) => o.variety !== undefined || o.index !== undefined),
    tslib_1.__metadata("design:type", String)
], FetchTreesDto.prototype, "variety", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], FetchTreesDto.prototype, "index", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FetchTreesDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], FetchTreesDto.prototype, "limit", void 0);
class PagedTreesDto {
    constructor(trees, bookmark) {
        this.trees = trees;
        this.bookmark = bookmark;
    }
}
exports.PagedTreesDto = PagedTreesDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AppleTree_1.AppleTree),
    tslib_1.__metadata("design:type", Array)
], PagedTreesDto.prototype, "trees", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PagedTreesDto.prototype, "bookmark", void 0);
class EnrollInCourseDto extends api_1.ChainCallDTO {
    constructor(creator, courseId) {
        super();
        this.creator = creator;
        this.courseId = courseId;
    }
}
exports.EnrollInCourseDto = EnrollInCourseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnrollInCourseDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnrollInCourseDto.prototype, "creator", void 0);
class FetchMyCourseDto extends api_1.ChainCallDTO {
    constructor(courseId) {
        super();
        this.courseId = courseId;
    }
}
exports.FetchMyCourseDto = FetchMyCourseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchMyCourseDto.prototype, "courseId", void 0);
class LessonDto extends api_1.ChainCallDTO {
    constructor(Lesson) {
        super();
        this.Lesson = Lesson;
    }
}
exports.LessonDto = LessonDto;
class ChapterDto extends api_1.ChainCallDTO {
    constructor(Chapter, Lessons) {
        super();
        this.Chapter = Chapter;
        this.Lessons = Lessons;
    }
}
exports.ChapterDto = ChapterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LessonDto),
    tslib_1.__metadata("design:type", Array)
], ChapterDto.prototype, "Lessons", void 0);
class CompleteLessonDto extends api_1.ChainCallDTO {
    constructor(courseId, creator, chapterId, lessonId) {
        super();
        this.courseId = courseId;
        this.creator = creator;
        this.chapterId = chapterId;
        this.lessonId = lessonId;
    }
}
exports.CompleteLessonDto = CompleteLessonDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CompleteLessonDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CompleteLessonDto.prototype, "creator", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CompleteLessonDto.prototype, "chapterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CompleteLessonDto.prototype, "lessonId", void 0);
class CreateNFTForLessonDto extends api_1.ChainCallDTO {
    constructor(courseId, chapterId, lessonId, NFTCollectionName, NFTCategory, NFTType, NFTAdditionalKey, NFTSymbol, NFTDescription, NFTImage, NFTMaxSupply) {
        super();
        this.courseId = courseId;
        this.chapterId = chapterId;
        this.lessonId = lessonId;
        this.NFTCollectionName = NFTCollectionName;
        this.NFTCategory = NFTCategory;
        this.NFTType = NFTType;
        this.NFTAdditionalKey = NFTAdditionalKey;
        this.NFTSymbol = NFTSymbol;
        this.NFTDescription = NFTDescription;
        this.NFTImage = NFTImage;
        this.NFTMaxSupply = NFTMaxSupply;
    }
}
exports.CreateNFTForLessonDto = CreateNFTForLessonDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "chapterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "lessonId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "NFTCollectionName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "NFTCategory", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "NFTType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "NFTAdditionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "NFTSymbol", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "NFTDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNFTForLessonDto.prototype, "NFTImage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateNFTForLessonDto.prototype, "NFTMaxSupply", void 0);
class FetchLessonDto extends api_1.ChainCallDTO {
    constructor(courseId, chapterId, lessonId) {
        super();
        this.courseId = courseId;
        this.chapterId = chapterId;
        this.lessonId = lessonId;
    }
}
exports.FetchLessonDto = FetchLessonDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchLessonDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchLessonDto.prototype, "chapterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchLessonDto.prototype, "lessonId", void 0);
class CourseDto extends api_1.ChainCallDTO {
    constructor(Course, Chapters) {
        super();
        this.Course = Course;
        this.Chapters = Chapters;
    }
}
exports.CourseDto = CourseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ChapterDto),
    tslib_1.__metadata("design:type", Array)
], CourseDto.prototype, "Chapters", void 0);
class FetchCourseDto extends api_1.ChainCallDTO {
    constructor(creator, courseId) {
        super();
        this.courseId = courseId;
        this.creator = creator;
    }
}
exports.FetchCourseDto = FetchCourseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchCourseDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchCourseDto.prototype, "creator", void 0);
class UpdateCourseDto extends api_1.ChainCallDTO {
    constructor(courseId, title, description, price, status) {
        super();
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = status;
    }
}
exports.UpdateCourseDto = UpdateCourseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateCourseDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateCourseDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateCourseDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, api_1.StringEnumProperty)(types_1.CourseStatus),
    tslib_1.__metadata("design:type", String)
], UpdateCourseDto.prototype, "status", void 0);
class UpdateLessonDto extends api_1.ChainCallDTO {
    constructor(courseId, chapterId, lessonId, title, ipfsCID) {
        super();
        this.courseId = courseId;
        this.chapterId = chapterId;
        this.lessonId = lessonId;
        this.title = title;
        this.ipfsCID = ipfsCID;
    }
}
exports.UpdateLessonDto = UpdateLessonDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLessonDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLessonDto.prototype, "chapterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLessonDto.prototype, "lessonId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLessonDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLessonDto.prototype, "ipfsCID", void 0);
class UpdateChapterDto extends api_1.ChainCallDTO {
    constructor(courseId, chapterId, title) {
        super();
        this.courseId = courseId;
        this.chapterId = chapterId;
        this.title = title;
    }
}
exports.UpdateChapterDto = UpdateChapterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateChapterDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateChapterDto.prototype, "chapterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateChapterDto.prototype, "title", void 0);
class CreateChapterDto extends api_1.ChainCallDTO {
    constructor(courseId, chapterId, title) {
        super();
        this.courseId = courseId;
        this.chapterId = chapterId;
        this.title = title;
    }
}
exports.CreateChapterDto = CreateChapterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateChapterDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateChapterDto.prototype, "chapterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateChapterDto.prototype, "title", void 0);
class CreateLessonDto extends api_1.ChainCallDTO {
    constructor(courseId, chapterId, lessonId, title, ipfsCID) {
        super();
        this.courseId = courseId;
        this.chapterId = chapterId;
        this.lessonId = lessonId;
        this.title = title;
        this.ipfsCID = ipfsCID;
    }
}
exports.CreateLessonDto = CreateLessonDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLessonDto.prototype, "courseId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLessonDto.prototype, "chapterId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLessonDto.prototype, "lessonId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLessonDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLessonDto.prototype, "ipfsCID", void 0);
