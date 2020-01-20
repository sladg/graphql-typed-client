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
var prettify_1 = require("../helpers/prettify");
var renderTypeMap_1 = require("../render/typeMap/renderTypeMap");
var render_1 = require("../testHelpers/render");
var linkTypeMap_1 = require("./linkTypeMap");
var requestToGql_1 = require("./requestToGql");
var getRoot = function () { return __awaiter(_this, void 0, void 0, function () {
    var result, typeMap;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, render_1.schemaRenderTest(
                /* GraphQL */ "\n      enum FriendshipKind {\n        close\n        distant\n      }\n\n      interface Person {\n        name: String!\n      }\n\n      type User implements Person {\n        name: String!\n        age: Int!\n        friends(kind: FriendshipKind): [Person!]!\n      }\n\n      type Cat {\n        name: String!\n        lives: Int!\n      }\n\n      union LivingThing = Cat | User\n\n      type Query {\n        user(id: ID!): User!\n        livingThings: [LivingThing!]!\n        userCount(withFriends: Boolean): Int\n      }\n    ", renderTypeMap_1.renderTypeMap)];
            case 1:
                result = _a.sent();
                typeMap = linkTypeMap_1.linkTypeMap(JSON.parse(result));
                if (!typeMap.Query)
                    throw new Error('query type is missing');
                return [2 /*return*/, typeMap.Query];
        }
    });
}); };
describe('requestToGql', function () {
    test('converts request object to gql query and variables', function () { return __awaiter(_this, void 0, void 0, function () {
        var gql, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = requestToGql_1.requestToGql;
                    _b = ['query'];
                    return [4 /*yield*/, getRoot()];
                case 1:
                    gql = _a.apply(void 0, _b.concat([_c.sent(), {
                            user: [
                                { id: 'userId' },
                                {
                                    name: 1,
                                    age: 1,
                                    friends: [
                                        { kind: 'close' },
                                        {
                                            __typename: 1,
                                            on_User: {
                                                __scalar: 1,
                                            },
                                        },
                                    ],
                                },
                            ],
                            livingThings: {
                                __typename: 1,
                                on_User: {
                                    age: 1,
                                },
                                on_Cat: {
                                    lives: 1,
                                },
                            },
                            userCount: [{}],
                        }]));
                    expect(prettify_1.prettify(gql.query, 'graphql')).toBe(prettify_1.prettify(
                    /* GraphQL */ "\n          query($v1: ID!, $v2: FriendshipKind) {\n            user(id: $v1) {\n              name\n              age\n              friends(kind: $v2) {\n                __typename\n                ...f2\n              }\n            }\n            livingThings {\n              __typename\n              ...f3\n              ...f4\n            }\n            userCount\n          }\n          fragment f1 on User {\n            name\n            age\n          }\n          fragment f2 on User {\n            ...f1\n          }\n          fragment f3 on User {\n            age\n          }\n          fragment f4 on Cat {\n            lives\n          }\n        ", 'graphql'));
                    expect(gql.variables).toEqual({ v1: 'userId', v2: 'close' });
                    return [2 /*return*/];
            }
        });
    }); });
    test('converts request object to gql query and empty variables', function () { return __awaiter(_this, void 0, void 0, function () {
        var gql, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = requestToGql_1.requestToGql;
                    _b = ['query'];
                    return [4 /*yield*/, getRoot()];
                case 1:
                    gql = _a.apply(void 0, _b.concat([_c.sent(), {
                            livingThings: {
                                __typename: 1,
                            },
                        }]));
                    expect(prettify_1.prettify(gql.query, 'graphql')).toBe(prettify_1.prettify(
                    /* GraphQL */ "\n          query {\n            livingThings {\n              __typename\n            }\n          }\n        ", 'graphql'));
                    expect(gql.variables).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
    describe('throws an error', function () {
        test('when field selection is empty', function () { return __awaiter(_this, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getRoot()];
                    case 1:
                        root = _a.sent();
                        expect(function () {
                            return requestToGql_1.requestToGql('query', root, {
                                user: [{ id: 'userId' }, {}],
                            });
                        }).toThrow('field selection should not be empty');
                        return [2 /*return*/];
                }
            });
        }); });
        test('when argument typing is not defined in type map', function () { return __awaiter(_this, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getRoot()];
                    case 1:
                        root = _a.sent();
                        expect(function () {
                            return requestToGql_1.requestToGql('query', root, {
                                user: [{ unknown: 'value' }, {}],
                            });
                        }).toThrow('no typing defined for argument `unknown` in path `user`');
                        return [2 /*return*/];
                }
            });
        }); });
        test('when requesting __scalar on type that has no scalar fields', function () { return __awaiter(_this, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getRoot()];
                    case 1:
                        root = _a.sent();
                        expect(function () {
                            return requestToGql_1.requestToGql('query', root, {
                                livingThings: { __scalar: 1 },
                            });
                        }).toThrow('type LivingThing has no scalar fields');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=requestToGql.test.js.map