import { basicAvrManual, instructionSet, functions, registers, directives } from "./constants.js";
import { checkSyntax } from "./validate.js";
import { declaredVariables } from "./validate.js";

require.config({ paths: { vs: 'monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {
    monaco.languages.register({ id: 'avr' });
    monaco.languages.setLanguageConfiguration('avr', {
        comments: {
            lineComment: ';'
        }
    })

    monaco.languages.setMonarchTokensProvider('avr', {
        ignoreCase: true,
        defaultToken: "invalid",
        avrInstructions: instructionSet,
        functions: functions,
        registers: registers,
        tokenizer: {
            root: [
                [/[a-z_$][\w$]*/, {
                    cases: {
                        '@avrInstructions': 'keyword',
                        '@functions': 'functions',
                        '@registers': 'registers',
                        '@default': 'identifier'
                    }
                }],

                // Brackets
                [/[()\[\]]/, '@brackets'],

                // Directives
                [/\.(section|text|data|global|end)/, 'directives'],

                // Data type
                [/\.(byte|string|ascii|asciz|space|def)/, 'type'],

                // Numbers
                [/\b0[xX][0-9a-fA-F]+\b/, "number.hex"],
                [/\b0[oO][0-7]+\b/, "number.octal"],
                [/\b0[bB][01]+\b/, "number.binary"],
                [/\d+/, 'number'],

                // Comments
                [/(;.*$)/, "comment"],

                // Operators
                [/[:,+-]/, "operators"],
            ]
        }
    });

    monaco.languages.registerHoverProvider('avr', {
        provideHover: function (model, position) {
            const wordAtPosition = model.getWordAtPosition(position);
            if (!wordAtPosition) return;

            const hoveringWord = wordAtPosition.word;
            if (basicAvrManual[hoveringWord]) {
                return {
                    contents: [
                        {
                            value: basicAvrManual[hoveringWord.toUpperCase()]
                        }
                    ]
                }
            }

            const variableIndex = declaredVariables.findIndex(v => v.varName === hoveringWord);
            if (variableIndex !== -1) {
                return {
                    contents: [
                        {
                            value: "```\n" +
                                `Variable: ${hoveringWord}\n` +
                                `Type: ${declaredVariables[variableIndex].varType}\n` +
                                `Value: ${declaredVariables[variableIndex].varValue}\n` +
                                "```"
                        }
                    ]
                }
            }
        }
    })

    monaco.languages.registerCompletionItemProvider('avr', {
        provideCompletionItems: function () {
            return {
                suggestions: [
                    ...directives.map(directive => {
                        return {
                            label: directive,
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: directive
                        }
                    }),
                    ...instructionSet.map(instruction => {
                        return {
                            label: instruction,
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: instruction
                        }
                    }),
                    ...functions.map(func => {
                        return {
                            label: func,
                            kind: monaco.languages.CompletionItemKind.Function,
                            insertText: func
                        }
                    }),
                    ...registers.map(register => {
                        return {
                            label: register,
                            kind: monaco.languages.CompletionItemKind.Variable,
                            insertText: register
                        }
                    })
                ]
            }
        }
    })

    monaco.editor.defineTheme('avrThemeLight', {
        base: 'vs',
        inherit: true,
        rules: [
            {
                token: 'keyword',
                foreground: '3598DB'
            },
            {
                token: 'functions',
                foreground: '169179'
            },
            {
                token: 'registers',
                foreground: 'E67E23'
            },
            {
                token: 'directives',
                foreground: 'B96AD9'
            },
            {
                token: 'type',
                foreground: 'F1C40F'
            }
        ],
        colors: {
            'editor.foreground': '#000000'
        }
    })

    monaco.editor.defineTheme('avrThemeDark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            {
                token: 'functions',
                foreground: '5BD0B9'
            },
            {
                token: 'registers',
                foreground: 'E2C384'
            },
            {
                token: 'directives',
                foreground: 'FBFB97'
            },
            {
                token: 'identifier',
                foreground: 'FFFFFF'
            },
            {
                token: 'operators',
                foreground: 'FFFFFF'
            }
        ],
        colors: {
            'editor.foreground': '#FFFFFF'
        }
    })

    window.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        fontSize: '16px',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        overviewRulerLanes: 0,
        language: 'avr',
        theme: 'avrThemeLight',
        value: [
            '.section .data',
            '',
            '.section .text',
            '.global asm_function',
            '',
            'asm_function:',
            'ret',
            '',
            '.end'
        ].join("\n"),
        minimap: {
            enabled: false
        }
    });

    const model = window.editor.getModel();
    model.onDidChangeContent(() => {
        const markers = checkSyntax(model);
        monaco.editor.setModelMarkers(model, 'instruction-validation', markers);
    });
});