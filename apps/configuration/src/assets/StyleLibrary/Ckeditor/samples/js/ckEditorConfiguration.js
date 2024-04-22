"use strict";


var editorConfig = {};


if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
    CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.
// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 250;
CKEDITOR.config.resize_maxHeight = 1500;
CKEDITOR.config.width = '100%';
CKEDITOR.config.scayt_autoStartup = false;
CKEDITOR.config.removeButtons = 'Source';

editorConfig.Instance = function (id) {
    var wysiwygareaAvailable = editorConfig.isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

    var editorElement = CKEDITOR.document.getById(id);

    // Depending on the wysiwygare plugin availability initialize classic or inline editor.
    if (wysiwygareaAvailable) {
        CKEDITOR.replace(id, { filebrowserImageUploadUrl: common.sPSite + '/_layouts/15/tog.dialog.zenhance.portal/Upload.ashx' });
    } else {
        editorElement.setAttribute('contenteditable', 'true');
        CKEDITOR.inline(id);

        // TODO we can consider displaying some info box that
        // without wysiwygarea the classic editor may not work.
    }
}

editorConfig.InstanceByElement = function (editorElement) {
    var wysiwygareaAvailable = editorConfig.isWysiwygareaAvailable(),
        isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

    // Depending on the wysiwygare plugin availability initialize classic or inline editor.
    if (wysiwygareaAvailable) {
        CKEDITOR.replace(editorElement[0].id, { filebrowserImageUploadUrl: common.sPSite + '/_layouts/15/tog.dialog.zenhance.portal/Upload.ashx' });
    } else {
        editorElement.setAttribute('contenteditable', 'true');
        CKEDITOR.inline(editorElement[0].id);

        // TODO we can consider displaying some info box that
        // without wysiwygarea the classic editor may not work.
    }

    return CKEDITOR.instances[editorElement[0].id];

}

editorConfig.isWysiwygareaAvailable = function () {
    // If in development mode, then the wysiwygarea must be available.
    // Split REV into two strings so builder does not replace it :D.
    if (CKEDITOR.revision == ('%RE' + 'V%')) {
        return true;
    }

    return !!CKEDITOR.plugins.get('wysiwygarea');
}
