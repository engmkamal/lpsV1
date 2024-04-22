"use strict";


var editorConfig = {};


if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
    CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.
// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = '11.69in';
CKEDITOR.config.resize_maxHeight = 3508;
CKEDITOR.config.width = '8.27in';
CKEDITOR.config.scayt_autoStartup = false;
//CKEDITOR.config.removeButtons = 'Source';

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

        CKEDITOR.replace(editorElement[0].id, {
            on: {
                pluginsLoaded: function () {
                    var editor = this,
                        config = editor.config;

                    editor.ui.addRichCombo('my-combo', {
                        label: 'Custom property',
                        title: 'Custom property',
                        toolbar: 'basicstyles,0',

                        panel: {
                            css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
                            multiSelect: false,
                            attributes: { 'aria-label': 'Custom property' }
                        },

                        init: function () {
                           
                            this.startGroup('System Properties Names');

                            this.add('{{date_now}}', 'Today');

                            this.startGroup('Single Property Names');

                            this.add('{{cpr_no}}', 'CPR No');
                            this.add('{{name}}', 'Applicant Name');
                            this.add('{{title}}', 'Applicant Title');
                            this.add('{{nic}}', 'Applicant NIC');
                            this.add('{{address}}', 'Applicant Address');
                            this.add('{{join_names}}', 'Joint Applicant Names');
                            this.add('{{prodcut}}', 'Prodcut Name');
                            this.add('{{prodcut_limit}}', 'Amount Request');
                            this.add('{{prodcut_purpose}}', 'Purpose');
                            this.add('{{prodcut_tenour}}', 'Tenour');
                            this.add('{{prodcut_interest_rate}}', ' Interest Rate');
                            this.add('{{prodcut_max_limit}}', 'Maximum limit of the Facility');
                            this.add('{{loan_Start_Date}}', 'Loan Start Date');
                            this.add('{{number_payment}}', 'Number of payment per year');

                            this.startGroup('Arrays Names');                           
                            var html = "<div id= 'vehicleSecurityPanel' >\
                               Vechicle Security Section {{vMake}},{{vModel}},{{vRegistrationNo}},{{vChassisNo}},{{vEngineNo}},{{vForcedSaleValue}}\
                                <table style= 'width:8in' >\
                                    <tbody>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                    </tbody>\
                                </table >\
                                </div>";
                            this.add(html, 'Vehicle Security Details');

                            var html = "<div id= 'gurantorSecurityPanel' >\
                               Gurantor Security Section {{guTitle}},{{guName}},{{guAddress}},{{guNIC}}\
                                <table style= 'width:8in' >\
                                    <tbody>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                    </tbody>\
                                </table >\
                                </div>";
                            this.add(html, 'Gurantor Security Details');

                            var html = "<div id= 'propertySecurityPanel' >\
                               Vechicle Security Section {{prSecurityType}},{{prLotno}},{{prPlanNo}},{{prSurveyorName}},{{prAddress}},{{prExtent}},{{prDate}},{{prRepaymentMethod}}\
                                <table style= 'width:8in' >\
                                    <tbody>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                    </tbody>\
                                </table >\
                                </div>";
                            this.add(html, 'Property Security Details');

                            var html = "<div id= 'equipementSecurityPanel' >\
                               Vechicle Security Section {{eqDescription}},{{eqSupplier}}\
                                <table style= 'width:8in' >\
                                    <tbody>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                    </tbody>\
                                </table >\
                                </div>";
                            this.add(html, 'Equipement Security Details');

                            var html = "<div id= 'jointIndividualPanel' >\
                               Joint Individual Borrower Section {{jointTitle}},{{jointName}},{{jointAddress}},{{jointNIC}}\
                                <table style= 'width:8in' >\
                                    <tbody>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                        <tr>\
                                           <td></td>\
                                           <td></td>\
                                        </tr>\
                                    </tbody>\
                                </table >\
                                </div>";
                            this.add(html, 'Joint Individual Borrower Details');

                            this.startGroup('Custom Properties Names');
                            this.add('{{textbox1}}', 'Textbox 1');
                            this.add('{{textbox2}}', 'Textbox 2');
                            this.add('{{textbox3}}', 'Textbox 3');
                            this.add('{{textbox4}}', 'Textbox 4');
                            this.add('{{textbox5}}', 'Textbox 5');
                            this.add('{{textarea1}}', 'Textarea 1');
                            this.add('{{textarea2}}', 'Textarea 2');
                            this.add('{{textarea3}}', 'Textarea 3');
                            this.add('{{textarea4}}', 'Textarea 4');
                            this.add('{{textarea5}}', 'Textarea 5');

                        },

                        onClick: function (value) {
                            editor.focus();
                            editor.fire('saveSnapshot');

                            editor.insertHtml(value);

                            editor.fire('saveSnapshot');
                        }
                    });
                }
            }
        });
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
