"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateConfigs = exports.EmailTemplateTypes = exports.EmailTemplateKeys = void 0;
var EmailTemplateKeys;
(function (EmailTemplateKeys) {
    EmailTemplateKeys["SupportTicket"] = "supportTicket";
})(EmailTemplateKeys || (exports.EmailTemplateKeys = EmailTemplateKeys = {}));
var EmailTemplateTypes;
(function (EmailTemplateTypes) {
    EmailTemplateTypes["Support"] = "support";
})(EmailTemplateTypes || (exports.EmailTemplateTypes = EmailTemplateTypes = {}));
exports.EmailTemplateConfigs = {
    SupportTicket: {
        name: EmailTemplateKeys.SupportTicket,
        type: EmailTemplateTypes.Support,
    }
};
