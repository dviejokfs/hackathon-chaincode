import { ChainCallDTO, GalaChainResponse, GetMyProfileDto, RegisterUserDto } from "@gala-chain/api";
import { ChainClient, ChainUser, gcclient, publicKeyContractAPI } from "@gala-chain/client";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

import { AppleTreeDto, AppleTreesDto, FetchTreesDto, PagedTreesDto, PickAppleDto, Variety } from "./apples";
import { CreateCourseDto, FetchCoursesDto, PagedCoursesDto } from "./apples/dtos";

const newUser = ChainUser.withRandomKeys();
console.log("New user: ", newUser);

const app = express();
const networkRoot = () => "/Users/davidviejo/projects/gala/hackathon/decentralized-ed/test-network";
const params = {
  orgMsp: "CuratorOrg",
  userId: "admin",
  userSecret: "adminpw",
  connectionProfilePath: path.resolve(networkRoot(), "connection-profiles/cpp-curator.json")
};

const appleContract = {
  channelName: "product-channel",
  chaincodeName: "basic-product",
  contractName: "AppleContract"
};

const pubKeyContract = {
  channelName: "product-channel",
  chaincodeName: "basic-product",
  contractName: "PublicKeyContract"
};
const tokenContract = {
  channelName: "product-channel",
  chaincodeName: "basic-product",
  contractName: "GalaChainTokenContract"
};

let adminPrivateKeyString: string | undefined;
function getAdminPrivateKey() {
  if (adminPrivateKeyString === undefined) {
    adminPrivateKeyString = fs
      .readFileSync(path.resolve(networkRoot(), "dev-admin-key/dev-admin.priv.hex.txt"))
      .toString();
  }

  return adminPrivateKeyString;
}

interface AppleContractAPI {
  CreateCourse(dto: CreateCourseDto): Promise<GalaChainResponse<void>>;
  FetchCourses(dto: FetchCoursesDto): Promise<GalaChainResponse<PagedCoursesDto>>;
}

function appleContractAPI(client: ChainClient): AppleContractAPI {
  return {
    FetchCourses(dto: FetchCoursesDto) {
      return client.evaluateTransaction("FetchCourses", dto, PagedCoursesDto);
    },
    CreateCourse(dto: CreateCourseDto) {
      return client.submitTransaction("CreateCourse", dto) as Promise<GalaChainResponse<void>>;
    }
  };
}

const pubKeyClient = gcclient
  .forConnectionProfile(params)
  .forContract(pubKeyContract)
  .extendAPI(publicKeyContractAPI);

const tokenClient = gcclient.forConnectionProfile(params).forContract(tokenContract);

const courseClient = gcclient
  .forConnectionProfile(params)
  .forContract(appleContract)
  .extendAPI(appleContractAPI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/ping", async (req, res) => {
  try {
    const newUser = ChainUser.withRandomKeys();

    const dto = new RegisterUserDto();
    dto.publicKey = newUser.publicKey;
    dto.sign(getAdminPrivateKey(), false);

    // When
    const chaincodeRes = await pubKeyClient.RegisterEthUser(dto);

    res.send(chaincodeRes);
  } catch (e) {
    console.error(e);
    res.send("Error");
  }
});
const sendValidationError = (res: express.Response, message: string) => {
  res.status(400).send({ message });
};
const dtoMap = {
  CreateCourseDto: CreateCourseDto,
  FetchCoursesDto: FetchCoursesDto,
  GetMyProfileDto: GetMyProfileDto
};
app.post("/submit", async (req, res) => {
  try {
    const { data, fcn, contract } = req.body;
    if (!data) {
      sendValidationError(res, "data is required");
      return;
    }
    if (!fcn) {
      sendValidationError(res, "fcn is required");
      return;
    }
    if (!contract) {
      sendValidationError(res, "contract is required");
      return;
    }
    const client = contract === "course" ? courseClient : pubKeyClient;
    const dto = dtoMap[`${fcn}Dto`];
    if (!dto) {
      sendValidationError(res, "Invalid fcn");
      return;
    }
    // When
    const chaincodeRes = await client.submitTransaction(fcn, dto.deserialize(dto, data));

    res.send(chaincodeRes);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Error occurred"
    });
  }
});

app.post("/evaluate", async (req, res) => {
  try {
    const { data, fcn, contract } = req.body;
    if (!data) {
      sendValidationError(res, "data is required");
      return;
    }
    if (!fcn) {
      sendValidationError(res, "fcn is required");
      return;
    }
    if (!contract) {
      sendValidationError(res, "contract is required");
      return;
    }
    const client = contract === "course" ? courseClient : pubKeyClient;
    const dto = dtoMap[`${fcn}Dto`];
    if (!dto) {
      sendValidationError(res, "Invalid fcn");
      return;
    }
    // When
    const chaincodeRes = await client.evaluateTransaction(fcn, dto.deserialize(dto, data));

    res.send(chaincodeRes);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Error occurred"
    });
  }
});
app.post("/init", async (req, res) => {
  try {
    await pubKeyContract;
  } catch (e) {
    console.error(e);
    res.send("Error");
  }
});
app.post("/register", async (req, res) => {
  try {
    const { publicKey } = req.body;
    if (!publicKey) {
      sendValidationError(res, "publicKey is required");
      return;
    }
    const dto = new RegisterUserDto();
    dto.publicKey = publicKey;
    dto.sign(getAdminPrivateKey(), false);

    // When
    const chaincodeRes = await pubKeyClient.RegisterEthUser(dto);

    res.send(chaincodeRes);
  } catch (e) {
    console.error(e);
    res.send("Error");
  }
});

// app.get("/createcoursetest", async (req, res) => {
//   try {
//     const newUser = ChainUser.withRandomKeys();
//     const registerUserDto = new RegisterUserDto();
//     registerUserDto.publicKey = newUser.publicKey;
//     registerUserDto.sign(getAdminPrivateKey(), false);

//     await pubKeyClient.RegisterEthUser(registerUserDto);
//     const courseId = v4();
//     const dto = new CreateCourseDto(courseId);
//     dto.sign(newUser.privateKey, false);

//     // When
//     const chaincodeRes = await courseClient.CreateCourse(dto);

//     res.send(chaincodeRes);
//   } catch (e) {
//     console.error(e);
//     res.send("Error");
//   }
// });
// app.get("/courses", async (req, res) => {
//   try {
//     const newUser = ChainUser.withRandomKeys();
//     const registerUserDto = new RegisterUserDto();
//     registerUserDto.publicKey = newUser.publicKey;
//     registerUserDto.sign(getAdminPrivateKey(), false);
//     await pubKeyClient.RegisterEthUser(registerUserDto);
//     const courseId = v4();
//     const dto = new FetchCoursesDto(courseId);
//     dto.sign(newUser.privateKey, false);

//     // When

//     const chaincodeRes = await courseClient.FetchCourses(dto);

//     res.send(chaincodeRes);
//   } catch (e) {
//     console.error(e);
//     res.send("Error");
//   }
// });
app.listen(3020, () => {
  console.log("Server running on port 3020");
});
