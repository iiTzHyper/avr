export const declaredVariables = [];
export const declaredLabels = [];

function validateInstruction(instruction, operand, line, modelValue) {
    const operandRules = INST_OPERANDS[instruction];
    if (operandRules) {
        if (operandRules.length !== operand.length) {
            return {
                valid: false,
                message: `Expected ${operandRules.length} arguments, but got ${operand.length}.`
            };
        }

        let tokens = app.lexer.tokenize(line)[0][0];
        tokens = tokens.filter(tok => tok.getType() !== "COMMA");

        for (let i = 0; i < operandRules.length; i++) {
            const rule = operandRules[i];
            const tok = tokens[i + 1];

            const legalTokenType = rule.getTokenType();
            const providedTokenType = tok.getType();
            const providedTokenValue = tok.getValue();
            
            if (instruction === "CALL" && providedTokenType == "REF") {
                return {
                    valid: true
                }
            }

            if (!legalTokenType.includes(providedTokenType)) {
                if (legalTokenType.includes("INT") && providedTokenType === "REF") {
                    if (!instruction.startsWith("BR") && instruction !== "JMP") {
                        const definedVarIndex = declaredVariables.findIndex(x => x.varName === providedTokenValue);
                        if (definedVarIndex === -1) {
                            return {
                                valid: false,
                                message: `VARIABLE "${providedTokenValue}" NOT DEFINED`,
                                position: line.indexOf(providedTokenValue) + 1,
                                length: providedTokenValue.length
                            }
                        } else {
                            return {
                                valid: true
                            }
                        }     
                    }

                    const labelRef = providedTokenValue;
                    const labelRegex = new RegExp(`^\\s*${labelRef}\\s*:\\s*$`, "gm");

                    if (!modelValue.match(labelRegex)) {
                        return {
                            valid: false,
                            message: `REFERENCE LABEL "${labelRef}" NOT DEFINED`,
                            position: line.indexOf(providedTokenValue) + 1,
                            length: providedTokenValue.length
                        }
                    }
                } else {
                    if (legalTokenType.includes("INT") && (providedTokenType == "HI8" || providedTokenType == "LO8")) {
                        return {
                            valid: true
                        }
                    }

                    const prettyType = Array.isArray(legalTokenType) ? legalTokenType.join(" OR ") : legalTokenType;
                    return {
                        valid: false,
                        message: `Expected type ${prettyType}, but got ${providedTokenType}`,
                        position: line.indexOf(providedTokenValue) + 1,
                        length: providedTokenValue.length
                    };
                }
            }

            if (rule.hasValueRange()) {
                let val = providedTokenValue; // value of the token
                if (providedTokenType === 'WORDPLUSQ') {
                    val = parseInt(val.substring(2)); // get rid of the Z+ or Y+ part
                }
                if (providedTokenType !== 'REF' && !(rule.getMinVal() <= val && val <= rule.getMaxVal())) {
                    if (providedTokenType === 'REG') {
                        return {
                            valid: false,
                            message: `Expected range R${rule.getMinVal()} - R${rule.getMaxVal()}, got R${providedTokenValue}.`,
                            position: line.indexOf(providedTokenValue),
                            length: providedTokenValue.length
                        }
                    }
                    return {
                        valid: false,
                        message: `Expected range ${rule.getMinVal()} - ${rule.getMaxVal()}, got ${providedTokenValue}.`,
                        position: line.indexOf(providedTokenValue) + 1,
                        length: providedTokenValue.length
                    };
                }
            }

            if (rule.hasOptionsList() && !rule.getOptionsList().includes(tok.getValue())) {
                if (providedTokenType === 'REG') {
                    return {
                        valid: false,
                        message: `Expected one of R${rule.getOptionsList().join(", R")}, got R${providedTokenValue}.`,
                        position: line.indexOf(providedTokenValue),
                        length: providedTokenValue.length
                    };
                }
                else if (providedTokenType !== 'INT') {
                    return {
                        valid: false,
                        message: `Expected one of ${rule.getOptionsList().join(", ")}, got ${providedTokenValue}.`,
                        position: line.indexOf(providedTokenValue) + 1,
                        length: providedTokenValue.length
                    };
                }
            }

            if (rule.hasExactValue() && providedTokenType !== rule.getExactValue()) {
                return {
                    valid: false,
                    message: `Value mismatch, expected ${rule.getExactValue()}, got ${providedTokenValue}.`,
                    position: line.indexOf(providedTokenValue) + 1,
                    length: providedTokenValue.length
                };
            }
        }
    }
    return { valid: true };
}

function checkSyntax(model) {
    const text = model.getValue();
    processVariables(text);
    processLabels(text);

    const lines = text.split('\n');
    const markers = [];

    let realFirstIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() == "") continue;
        if (lines[i].trim().startsWith(";")) continue;

        realFirstIndex = i;
        break;
    }

    if (!lines[realFirstIndex].startsWith(".section")) {
        markers.push({
            startLineNumber: realFirstIndex + 1,
            startColumn: 1,
            endLineNumber: realFirstIndex + 2,
            endColumn: lines[realFirstIndex].length + 1,
            severity: monaco.MarkerSeverity.Error,
            message: "First line must be a '.section' directive."
        });
    }

    if (lines[realFirstIndex].trim() !== ".section .data" || !lines[realFirstIndex].trim() == ".section .text") {
        markers.push({
            startLineNumber: realFirstIndex + 1,
            startColumn: 1,
            endLineNumber: realFirstIndex + 2,
            endColumn: lines[realFirstIndex].length + 1,
            severity: monaco.MarkerSeverity.Error,
            message: "First line must be either '.section .data' or '.section .text'."
        });
    }

    if (lines[lines.length - 1].trim() !== ".end") {
        markers.push({
            startLineNumber: lines.length,
            startColumn: 1,
            endLineNumber: lines.length,
            endColumn: lines[lines.length - 1].length + 1,
            severity: monaco.MarkerSeverity.Error,
            message: "Final line must be '.end'."
        });
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const tokens = line.trim().replace(/;+$/, "").split(/[\s,]+/);
        const inst = tokens[0].toUpperCase();

        let operands = tokens.slice(1);
        const commentIndex = operands.findIndex(x => x.includes(";"));
        if (commentIndex !== -1) operands = operands.slice(0, commentIndex);

        for (let i = 0; i < operands.length; i++) {
            if (operands[i] == "," || operands[i] == "") {
                operands.splice(i, 1);
            }
        }

        const validationResult = validateInstruction(inst, operands, line, text);
        if (!validationResult.valid) {
            markers.push({
                startLineNumber: i + 1,
                startColumn: validationResult.position ?? 1,
                endLineNumber: i + 1,
                endColumn: validationResult.length ? validationResult.position + validationResult.length : line.length + 1,
                severity: validationResult.severity ?? monaco.MarkerSeverity.Error,
                message: validationResult.message
            });
        }
    }

    return markers;
}

function processVariables(text) {
    const variablesAreaRegex = /\.section\s+\.data\s+([\s\S]*?)(?=\.section)/;
    const dataSection = text.match(variablesAreaRegex)?.[1];
    if (!dataSection) return;

    const potentialVariables = dataSection.split("\n")
    for (let i = 0; i < potentialVariables.length; i++) {
        const varMatch = potentialVariables[i].trim().match(/^([a-zA-Z_]\w*):\s*(\.byte|\.string|\.ascii|\.asciz|\.space|\.def)\s+((?:[^,]+(?:,\s*[^,]+)*)?)/);
        if (!varMatch) continue;

        const existingVarIndex = declaredVariables.findIndex(x => x.varName === varMatch[1]);
        const varData = {
            varName: varMatch[1],
            varType: varMatch[2],
            varValue: varMatch[3]
        }

        if (existingVarIndex === -1) {
            declaredVariables.push(varData);
        } else {
            declaredVariables[existingVarIndex] = varData;
        }
    }
}

function processLabels(text) {
    const potentialLabels = text.split("\n");
    for (let i = 0; i < potentialLabels.length; i++) {
        const labelMatch = potentialLabels[i].trim().match(/^(?!\.)([a-zA-Z_]\w*)\s*:\s*(?=\s*$)/);
        if (!labelMatch) continue;

        if (!declaredLabels.includes(labelMatch[1])) {
            declaredLabels.push(labelMatch[1]);
        }
    }
}

export { checkSyntax }