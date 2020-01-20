"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var RenderContext_1 = require("../render/common/RenderContext");
var files_1 = require("../helpers/files");
exports.toClientSchema = function (schemaGql) { return __awaiter(_this, void 0, void 0, function () {
    var schema, introspectionResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = graphql_1.buildSchema(schemaGql);
                return [4 /*yield*/, graphql_1.graphql(schema, graphql_1.getIntrospectionQuery())];
            case 1:
                introspectionResponse = _a.sent();
                if (!introspectionResponse.data) {
                    throw new Error(JSON.stringify(introspectionResponse.errors));
                }
                return [2 /*return*/, graphql_1.buildClientSchema(introspectionResponse.data)];
        }
    });
}); };
exports.schemaRenderTest = function (schemaGql, renderer, parser) { return __awaiter(_this, void 0, void 0, function () {
    var schema, ctx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.toClientSchema(schemaGql)];
            case 1:
                schema = _a.sent();
                ctx = new RenderContext_1.RenderContext(schema);
                renderer(schema, ctx);
                return [2 /*return*/, ctx.toCode(parser)];
        }
    });
}); };
exports.typeRenderTest = function (schemaGql, renderer, typeNames, parser) { return __awaiter(_this, void 0, void 0, function () {
    var schema, ctx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.toClientSchema(schemaGql)];
            case 1:
                schema = _a.sent();
                ctx = new RenderContext_1.RenderContext(schema);
                typeNames.forEach(function (typeName) {
                    var type = schema.getType(typeName);
                    if (!type) {
                        throw new Error("type " + typeName + " is not defined in the schema");
                    }
                    renderer(type, ctx);
                });
                return [2 /*return*/, ctx.toCode(parser)];
        }
    });
}); };
exports.typeRenderTestCase = function (dirName, file, renderer, typeNames, output) {
    if (output === void 0) { output = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var _a, gql, ts, actualTs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        files_1.readFileFromPath([dirName, "cases/" + file + ".graphql"]),
                        files_1.readFileFromPath([dirName, "cases/" + file + ".case.ts"]),
                    ])];
                case 1:
                    _a = _b.sent(), gql = _a[0], ts = _a[1];
                    return [4 /*yield*/, exports.typeRenderTest(gql, renderer, typeNames, 'typescript')];
                case 2:
                    actualTs = _b.sent();
                    if (output) {
                        console.log(actualTs);
                        throw new Error('test case did not run');
                    }
                    else {
                        expect(actualTs).toBe(ts);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=render.js.map