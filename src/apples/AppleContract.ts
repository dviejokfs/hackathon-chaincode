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
import { Evaluate, GalaChainContext, GalaContract, Submit } from "@gala-chain/chaincode";

import { version } from "../../package.json";
import {
  AppleTreeDto,
  AppleTreesDto,
  CreateCourseDto,
  FetchCoursesDto,
  FetchTreesDto,
  PagedCoursesDto,
  PagedTreesDto,
  PickAppleDto
} from "./dtos";
import { fetchTrees } from "./fetchTrees";
import { createCourse, fetchCourses } from "./lib";
import { pickApple } from "./pickApple";
import { plantTree, plantTrees } from "./plantTrees";

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
  public async EditCourse() {}
  public async CreateLesson() {}
  public async EditLesson() {}
  public async DeleteLesson() {}

  public async AddBalanceToStudent() {
    // check if student exists
    // if exists, add balance
  }
  public async EnrollStudentInCourse() {
    // check if student is already enrolled
    // check if student has enough balance
  }
  public async CompleteLesson() {
    // check if student is enrolled in course + give tokens
    // mint nft for student
  }
  public async CompleteCourse() {
    // check if student has completed all lessons
    // mint nft for student + vc
  }
  public async FetchStudentCourses() {
    // get all courses for student
  }
  public async FetchStudentCourse() {
    // get course for student
  }
  public async FetchStudentNFTs() {
    // get all nfts for student
  }
  public async FetchStudentNFT() {
    // get nft for student
  }

  @Evaluate({
    in: FetchCoursesDto,
    out: PagedCoursesDto
  })
  public async FetchCourses(ctx: GalaChainContext, dto: FetchCoursesDto): Promise<PagedCoursesDto> {
    return await fetchCourses(ctx, dto);
  }
}
