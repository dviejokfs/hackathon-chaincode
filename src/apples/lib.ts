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
  GalaChainContext,
  getObjectsByPartialCompositeKeyWithPagination,
  putChainObject,
  takeUntilUndefined
} from "@gala-chain/chaincode";
import BigNumber from "bignumber.js";

import { Course } from "./AppleTree";
import { CreateCourseDto, FetchCoursesDto, PagedCoursesDto } from "./dtos";

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
