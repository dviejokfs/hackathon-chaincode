"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_1 = require("@gala-chain/api");
const client_1 = require("@gala-chain/client");
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const dtos_1 = require("./apples/dtos");
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
function appleContractAPI(client) {
    return {
        FetchCourses(dto) {
            return client.evaluateTransaction("FetchCourses", dto, dtos_1.PagedCoursesDto);
        },
        CreateCourse(dto) {
            return client.submitTransaction("CreateCourse", dto);
        }
    };
}
const pubKeyClient = client_1.gcclient
    .forConnectionProfile(params)
    .forContract(pubKeyContract)
    .extendAPI(client_1.publicKeyContractAPI);
const tokenClient = client_1.gcclient.forConnectionProfile(params).forContract(tokenContract);
const courseClient = client_1.gcclient
    .forConnectionProfile(params)
    .forContract(appleContract)
    .extendAPI(appleContractAPI);
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
    CreateCourseDto: dtos_1.CreateCourseDto,
    FetchCoursesDto: dtos_1.FetchCoursesDto,
    GetMyProfileDto: api_1.GetMyProfileDto
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
