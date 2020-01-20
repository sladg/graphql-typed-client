"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var qs_1 = __importDefault(require("qs"));
var rxjs_1 = require("rxjs");
var lodash_1 = require("lodash");
var operators_1 = require("rxjs/operators");
var prettify_1 = require("../helpers/prettify");
var applyTypeMapperToResponse_1 = require("./applyTypeMapperToResponse");
var chain_1 = require("./chain");
var requestToGql_1 = require("./requestToGql");
var getSubscriptionCreator_1 = require("./getSubscriptionCreator");
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError(message, errors) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, errors ? message + "\n" + errors.map(function (error) { return prettify_1.prettify(JSON.stringify(error), 'json'); }).join('\n') : message) || this;
        _this.errors = errors;
        _newTarget.prototype.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        if (Error.captureStackTrace)
            Error.captureStackTrace(_this, ClientError);
        return _this;
    }
    return ClientError;
}(Error));
exports.ClientError = ClientError;
exports.createClient = function (_a) {
    var fetcher = _a.fetcher, subscriptionCreatorOptions = _a.subscriptionCreatorOptions, queryRoot = _a.queryRoot, mutationRoot = _a.mutationRoot, subscriptionRoot = _a.subscriptionRoot, typeMapper = _a.typeMapper;
    var createSubscription = subscriptionCreatorOptions ? getSubscriptionCreator_1.getSubscriptionCreator(subscriptionCreatorOptions) : function () { return rxjs_1.NEVER; };
    var query = function (request) {
        if (!fetcher)
            throw new Error('fetcher argument is missing');
        if (!queryRoot)
            throw new Error('queryRoot argument is missing');
        var resultPromise = fetcher(requestToGql_1.requestToGql('query', queryRoot, request, typeMapper), fetch, qs_1.default);
        return typeMapper
            ? resultPromise.then(function (result) { return applyTypeMapperToResponse_1.applyTypeMapperToResponse(queryRoot, result, typeMapper); })
            : resultPromise;
    };
    var mutation = function (request) {
        if (!fetcher)
            throw new Error('fetcher argument is missing');
        if (!mutationRoot)
            throw new Error('mutationRoot argument is missing');
        var resultPromise = fetcher(requestToGql_1.requestToGql('mutation', mutationRoot, request, typeMapper), fetch, qs_1.default);
        return typeMapper
            ? resultPromise.then(function (result) { return applyTypeMapperToResponse_1.applyTypeMapperToResponse(mutationRoot, result, typeMapper); })
            : resultPromise;
    };
    var subscription = function (request) {
        if (!subscriptionCreatorOptions)
            throw new Error('subscriptionClientOptions argument is missing');
        if (!subscriptionRoot)
            throw new Error('subscriptionRoot argument is missing');
        var resultObservable = createSubscription(requestToGql_1.requestToGql('subscription', subscriptionRoot, request, typeMapper));
        return typeMapper
            ? resultObservable.pipe(operators_1.map(function (result) { return applyTypeMapperToResponse_1.applyTypeMapperToResponse(subscriptionRoot, result, typeMapper); }))
            : resultObservable;
    };
    var mapResponse = function (path, defaultValue) { return function (response) {
        if (response.errors)
            throw new ClientError("Response contains errors", response.errors);
        if (!response.data)
            throw new ClientError('Response data is empty');
        var result = lodash_1.get(response, ['data'].concat(path), defaultValue);
        if (result === undefined)
            throw new ClientError("Response path `" + path.join('.') + "` is empty");
        return result;
    }; };
    return {
        query: query,
        mutation: mutation,
        subscription: subscription,
        chain: {
            query: chain_1.chain(function (path, request, defaultValue) { return query(request).then(mapResponse(path, defaultValue)); }),
            mutation: chain_1.chain(function (path, request, defaultValue) { return mutation(request).then(mapResponse(path, defaultValue)); }),
            subscription: (chain_1.chain(function (path, request, defaultValue) { return subscription(request).pipe(operators_1.map(mapResponse(path, defaultValue))); })),
        },
    };
};
//# sourceMappingURL=createClient.js.map