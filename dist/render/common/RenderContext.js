"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prettify_1 = require("../../helpers/prettify");
var relativeImportPath_1 = require("./relativeImportPath");
var RenderContext = /** @class */ (function () {
    function RenderContext(schema, config) {
        this.schema = schema;
        this.config = config;
        this.codeBlocks = [];
        this.imports = {};
        this.importAliasCounter = 0;
    }
    RenderContext.prototype.addCodeBlock = function (block) {
        this.codeBlocks.push(block);
    };
    RenderContext.prototype.addImport = function (from, isDefault, module, fromAbsolute, noAlias) {
        if (this.config && this.config.output) {
            from = fromAbsolute ? from : relativeImportPath_1.relativeImportPath(this.config.output, from);
        }
        if (!this.imports[from])
            this.imports[from] = [];
        var imports = this.imports[from];
        var existing = imports.find(function (i) { return (isDefault && i.isDefault) || (!isDefault && i.module === module); });
        if (existing)
            return existing.alias;
        this.importAliasCounter++;
        var alias = noAlias ? undefined : "a" + this.importAliasCounter;
        imports.push({ isDefault: isDefault, module: module, alias: alias });
        return alias;
    };
    RenderContext.prototype.getImportBlock = function () {
        var _this = this;
        var imports = [];
        Object.keys(this.imports).forEach(function (from) {
            var defaultImport = _this.imports[from].find(function (i) { return i.isDefault; });
            var namedImports = _this.imports[from].filter(function (i) { return !i.isDefault; });
            var statements = [];
            if (defaultImport) {
                statements.push(defaultImport.alias);
            }
            if (namedImports.length > 0) {
                statements.push("{" + namedImports.map(function (i) { return (i.alias ? i.module + " as " + i.alias : i.module); }).join(',') + "}");
            }
            imports.push("import " + statements.join(',') + " from '" + from + "'");
        });
        if (imports.length > 0)
            return imports.join('\n');
        else
            return;
    };
    RenderContext.prototype.toCode = function (parser) {
        var blocks = this.codeBlocks.slice();
        if (parser && (parser === 'typescript' || parser === 'babel')) {
            var importBlock = this.getImportBlock();
            if (importBlock)
                blocks.unshift(importBlock);
        }
        return parser ? prettify_1.prettify(blocks.join('\n\n'), parser) : blocks.join('');
    };
    return RenderContext;
}());
exports.RenderContext = RenderContext;
//# sourceMappingURL=RenderContext.js.map