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
var render_1 = require("../../testHelpers/render");
var RenderContext_1 = require("../common/RenderContext");
var objectType_1 = require("./objectType");
var scalarType_1 = require("./scalarType");
var unionType_1 = require("./unionType");
var testCase = function (schemaGql, renderer, cases, output) {
    if (output === void 0) { output = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var schema, ctx, t, type, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, render_1.toClientSchema(schemaGql)];
                case 1:
                    schema = _a.sent();
                    ctx = new RenderContext_1.RenderContext(schema);
                    for (t in cases) {
                        type = schema.getType(t);
                        expected = cases[t];
                        if (!type) {
                            throw new Error("type " + t + " is not defined in the schema");
                        }
                        if (output) {
                            console.log(JSON.stringify(renderer(type, ctx), null, 2));
                        }
                        else {
                            expect(renderer(type, ctx)).toEqual(expected);
                        }
                    }
                    if (output)
                        throw new Error('test case did not run');
                    return [2 /*return*/];
            }
        });
    });
};
test('scalarType', function () {
    return testCase(
    /* GraphQL */ "\n      enum Enum {\n        some\n        other\n      }\n\n      scalar Scalar\n\n      type Query {\n        scalar: String\n        customScalar: Scalar\n        enum: Enum\n      }\n    ", scalarType_1.scalarType, {
        String: { name: 'String' },
        Scalar: { name: 'Scalar' },
        Enum: { name: 'Enum' },
    });
});
test('objectType', function () {
    return testCase(
    /* GraphQL */ "\n      interface Interface {\n        some: String\n      }\n\n      type ImplementorA implements Interface {\n        some: String\n      }\n\n      type ImplementorB implements Interface {\n        some: String\n      }\n\n      type Object {\n        scalar: Int\n        object: Object\n        interface: Interface\n        optionalArgScalar(arg: Int): Int\n        optionalArgObject(arg: Int): Object\n        optionalArgInterface(arg: Int): Interface\n        nestedArg(a: [[[Int]]], b: [[[Int!]!]!]!): Boolean\n      }\n\n      type ObjectWithoutScalar {\n        object: Object\n        interface: Interface\n      }\n\n      type Query {\n        _: Boolean\n      }\n    ", objectType_1.objectType, {
        Object: {
            name: 'Object',
            fields: {
                scalar: { type: 'Int' },
                object: { type: 'Object' },
                interface: { type: 'Interface' },
                optionalArgScalar: { type: 'Int', args: { arg: ['Int', 'Int'] } },
                optionalArgObject: { type: 'Object', args: { arg: ['Int', 'Int'] } },
                optionalArgInterface: { type: 'Interface', args: { arg: ['Int', 'Int'] } },
                nestedArg: { type: 'Boolean', args: { a: ['[[[Int]]]', 'Int'], b: ['[[[Int!]!]!]!', 'Int'] } },
                __typename: { type: 'String' },
            },
            scalar: ['scalar', 'optionalArgScalar', 'nestedArg'],
        },
        Interface: {
            name: 'Interface',
            fields: {
                some: { type: 'String' },
                on_ImplementorA: { type: 'ImplementorA' },
                on_ImplementorB: { type: 'ImplementorB' },
                __typename: { type: 'String' },
            },
            scalar: ['some'],
        },
        ObjectWithoutScalar: {
            name: 'ObjectWithoutScalar',
            fields: {
                __typename: { type: 'String' },
                interface: { type: 'Interface' },
                object: { type: 'Object' },
            },
        },
    });
});
test('unionType', function () {
    return testCase(
    /* GraphQL */ "\n      type Some {\n        field: Int\n      }\n\n      type Other {\n        field: Int\n      }\n\n      type Another {\n        field: Int\n      }\n\n      union Union = Some | Other | Another\n\n      type Query {\n        _: Boolean\n      }\n    ", unionType_1.unionType, {
        Union: {
            name: 'Union',
            fields: {
                on_Some: { type: 'Some' },
                on_Other: { type: 'Other' },
                on_Another: { type: 'Another' },
                __typename: { type: 'String' },
            },
        },
    });
});
//# sourceMappingURL=index.test.js.map