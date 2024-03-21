"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_1 = require("@gala-chain/api");
const client_1 = require("@gala-chain/client");
const json_1 = require("@helia/json");
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const helia_1 = require("helia");
const cid_1 = require("multiformats/cid");
const path_1 = tslib_1.__importDefault(require("path"));
const dto = tslib_1.__importStar(require("./apples/dtos"));
const newUser = client_1.ChainUser.withRandomKeys();
console.log("New user: ", newUser);
const app = (0, express_1.default)();
const networkRoot = () => "/Users/davidviejo/projects/gala/hackathon/decentralized-ed/test-network";
const params = {
    orgMsp: "CuratorOrg",
    userId: "admin",
    userSecret: "adminpw",
    connectionProfilePath: path_1.default.resolve(networkRoot(), "connection-profiles/cpp-curator.json")
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
let adminPrivateKeyString;
function getAdminPrivateKey() {
    if (adminPrivateKeyString === undefined) {
        adminPrivateKeyString = fs_1.default
            .readFileSync(path_1.default.resolve(networkRoot(), "dev-admin-key/dev-admin.priv.hex.txt"))
            .toString();
    }
    return adminPrivateKeyString;
}
// interface AppleContractAPI {
//   CreateCourse(dto: CreateCourseDto): Promise<GalaChainResponse<void>>;
//   FetchCourses(dto: FetchCoursesDto): Promise<GalaChainResponse<PagedCoursesDto>>;
// }
// function appleContractAPI(client: ChainClient): AppleContractAPI {
//   return {
//     FetchCourses(dto: FetchCoursesDto) {
//       return client.evaluateTransaction("FetchCourses", dto, PagedCoursesDto);
//     },
//     CreateCourse(dto: CreateCourseDto) {
//       return client.submitTransaction("CreateCourse", dto) as Promise<GalaChainResponse<void>>;
//     }
//   };
// }
const pubKeyClient = client_1.gcclient
    .forConnectionProfile(params)
    .forContract(pubKeyContract)
    .extendAPI(client_1.publicKeyContractAPI);
const tokenClient = client_1.gcclient.forConnectionProfile(params).forContract(tokenContract);
const courseClient = client_1.gcclient.forConnectionProfile(params).forContract(appleContract);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/ping", async (req, res) => {
    try {
        const newUser = client_1.ChainUser.withRandomKeys();
        const dto = new api_1.RegisterUserDto();
        dto.publicKey = newUser.publicKey;
        dto.sign(getAdminPrivateKey(), false);
        // When
        const chaincodeRes = await pubKeyClient.RegisterEthUser(dto);
        res.send(chaincodeRes);
    }
    catch (e) {
        console.error(e);
        res.send("Error");
    }
});
const sendValidationError = (res, message) => {
    res.status(400).send({ message });
};
const dtoMap = {
    GetMyProfileDto: api_1.GetMyProfileDto,
    AppleTreeDto: dto.AppleTreeDto,
    AppleTreesDto: dto.AppleTreesDto,
    CreateCourseDto: dto.CreateCourseDto,
    FetchCreatedCoursesDto: dto.FetchCreatedCoursesDto,
    FetchEnrolledCoursesDto: dto.FetchEnrolledCoursesDto,
    AddBalanceToStudentDto: dto.AddBalanceToStudentDto,
    FetchPurchasedCoursesDto: dto.FetchPurchasedCoursesDto,
    PickAppleDto: dto.PickAppleDto,
    FetchCoursesDto: dto.FetchCoursesDto,
    FetchBalanceOfStudentDto: dto.FetchBalanceOfStudentDto,
    PagedCoursesDto: dto.PagedCoursesDto,
    StudentPurchaseWithCourseDto: dto.StudentPurchaseWithCourseDto,
    PagedStudentPurchaseDto: dto.PagedStudentPurchaseDto,
    StudentBalanceDto: dto.StudentBalanceDto,
    FetchTreesDto: dto.FetchTreesDto,
    PagedTreesDto: dto.PagedTreesDto,
    EnrollInCourseDto: dto.EnrollInCourseDto,
    FetchMyCourseDto: dto.FetchMyCourseDto,
    FetchCourseDto: dto.FetchCourseDto,
    UpdateCourseDto: dto.UpdateCourseDto,
    UpdateLessonDto: dto.UpdateLessonDto,
    UpdateChapterDto: dto.UpdateChapterDto,
    CreateChapterDto: dto.CreateChapterDto,
    CreateLessonDto: dto.CreateLessonDto
};
let helia;
(0, helia_1.createHelia)().then((h) => {
    helia = h;
});
app.get("/ipfs/get/:cid", async (req, res) => {
    const { cid } = req.params;
    if (!cid) {
        sendValidationError(res, "cid is required");
        return;
    }
    if (!helia) {
        sendValidationError(res, "Helia not initialized");
        return;
    }
    try {
        const s = (0, json_1.json)(helia);
        const cidParsed = cid_1.CID.parse(cid);
        const myString = await s.get(cidParsed);
        res.send({
            data: myString
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send({
            message: e.toString()
        });
    }
});
app.post("/ipfs/add", async (req, res) => {
    try {
        if (!helia) {
            sendValidationError(res, "Helia not initialized");
            return;
        }
        const { data } = req.body;
        if (!data) {
            sendValidationError(res, "data is required");
            return;
        }
        const s = (0, json_1.json)(helia);
        const myImmutableAddress = await s.add(data);
        res.send({
            cid: myImmutableAddress
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send({
            message: e.toString()
        });
    }
});
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
    }
    catch (e) {
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
    }
    catch (e) {
        console.error(e);
        res.status(500).send({
            message: "Error occurred"
        });
    }
});
app.post("/init", async (req, res) => {
    try {
        await pubKeyContract;
    }
    catch (e) {
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
        const dto = new api_1.RegisterUserDto();
        dto.publicKey = publicKey;
        dto.sign(getAdminPrivateKey(), false);
        // When
        const chaincodeRes = await pubKeyClient.RegisterEthUser(dto);
        res.send(chaincodeRes);
    }
    catch (e) {
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
