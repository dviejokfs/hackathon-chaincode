"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = exports.Assignment = exports.Lesson = exports.Student = exports.Course = exports.AppleTree = void 0;
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
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const types_1 = require("./types");
class AppleTree extends api_1.ChainObject {
    constructor(plantedBy, variety, index, plantedAt) {
        super();
        this.plantedBy = plantedBy;
        this.variety = variety;
        this.index = index;
        this.plantedAt = plantedAt;
        this.applesPicked = new bignumber_js_1.default(0);
    }
    ageInYears(now) {
        if (this.plantedAt > now) {
            throw new api_1.DefaultError("Tree planted in the future", { plantedAt: this.plantedAt, now });
        }
        return new bignumber_js_1.default(now - this.plantedAt)
            .dividedBy(365 * 24 * 60 * 60 * 1000)
            .integerValue(bignumber_js_1.default.ROUND_FLOOR);
    }
    applesTotal(now) {
        const ageInYears = this.ageInYears(now);
        if (ageInYears.isLessThan(1)) {
            return new bignumber_js_1.default(0);
        }
        return new bignumber_js_1.default(2).pow(ageInYears.minus(1));
    }
    canPick(now) {
        return this.applesPicked.isLessThan(this.applesTotal(now));
    }
    ensureCanPick(now) {
        if (!this.canPick(now)) {
            throw new NoApplesLeftError(this.applesPicked, this.applesTotal(now));
        }
        const pick = () => {
            this.applesPicked = this.applesPicked.plus(1);
        };
        return { pick };
    }
}
exports.AppleTree = AppleTree;
AppleTree.INDEX_KEY = "GCAPPL";
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AppleTree.prototype, "plantedBy", void 0);
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 1 }),
    (0, api_1.StringEnumProperty)(types_1.Variety),
    tslib_1.__metadata("design:type", String)
], AppleTree.prototype, "variety", void 0);
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 2 }),
    tslib_1.__metadata("design:type", Number)
], AppleTree.prototype, "index", void 0);
tslib_1.__decorate([
    (0, api_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], AppleTree.prototype, "applesPicked", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], AppleTree, "INDEX_KEY", void 0);
class NoApplesLeftError extends api_1.NotFoundError {
    constructor(total, picked) {
        super(`No apples left to pick. Total: ${total}, picked: ${picked}`);
    }
}
class Course extends api_1.ChainObject {
    constructor(CourseID, Creator, Title, Description, Price, EnrollmentLimit, Status) {
        super();
        this.CourseID = CourseID;
        this.Creator = Creator;
        this.Title = Title;
        this.Description = Description;
        this.Price = Price;
        this.EnrollmentLimit = EnrollmentLimit;
        this.Status = Status;
    }
}
exports.Course = Course;
Course.INDEX_KEY = "CRS";
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "Creator", void 0);
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "CourseID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "Title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "Description", void 0);
tslib_1.__decorate([
    (0, api_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], Course.prototype, "Price", void 0);
tslib_1.__decorate([
    (0, api_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], Course.prototype, "EnrollmentLimit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], Course, "INDEX_KEY", void 0);
class Student extends api_1.ChainObject {
    constructor(StudentID, EnrolledCourses, CompletedCourses) {
        super();
        this.StudentID = StudentID;
        this.EnrolledCourses = EnrolledCourses;
        this.CompletedCourses = CompletedCourses;
    }
}
exports.Student = Student;
Student.INDEX_KEY = "STU";
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Student.prototype, "StudentID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], Student.prototype, "EnrolledCourses", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], Student.prototype, "CompletedCourses", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], Student, "INDEX_KEY", void 0);
class Lesson extends api_1.ChainObject {
    constructor(LessonID, CourseID, Title, Description, Content) {
        super();
        this.LessonID = LessonID;
        this.CourseID = CourseID;
        this.Title = Title;
        this.Description = Description;
        this.Content = Content;
    }
}
exports.Lesson = Lesson;
Lesson.INDEX_KEY = "LES";
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Lesson.prototype, "CourseID", void 0);
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Lesson.prototype, "LessonID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Lesson.prototype, "Title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Lesson.prototype, "Description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Lesson.prototype, "Content", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], Lesson, "INDEX_KEY", void 0);
class Assignment extends api_1.ChainObject {
    constructor(SubmissionID, CourseID, StudentID, Timestamp, Grade) {
        super();
        this.SubmissionID = SubmissionID;
        this.CourseID = CourseID;
        this.StudentID = StudentID;
        this.Timestamp = Timestamp;
        this.Grade = Grade;
    }
}
exports.Assignment = Assignment;
Assignment.INDEX_KEY = "ASSGN";
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Assignment.prototype, "CourseID", void 0);
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Assignment.prototype, "LessonID", void 0);
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Assignment.prototype, "SubmissionID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Assignment.prototype, "StudentID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Assignment.prototype, "Grade", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], Assignment, "INDEX_KEY", void 0);
class Certificate extends api_1.ChainObject {
    constructor(CertificateID, CourseID, StudentID, IssueDate) {
        super();
        this.CertificateID = CertificateID;
        this.CourseID = CourseID;
        this.StudentID = StudentID;
        this.IssueDate = IssueDate;
    }
}
exports.Certificate = Certificate;
Certificate.INDEX_KEY = "CERT";
tslib_1.__decorate([
    (0, api_1.ChainKey)({ position: 0 }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Certificate.prototype, "CertificateID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Certificate.prototype, "CourseID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Certificate.prototype, "StudentID", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], Certificate, "INDEX_KEY", void 0);
