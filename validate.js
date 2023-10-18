const simplifiedTokenize = (line) => {
    const tokens = [];

    let pos = 0;

    const PATTERNS = [
        [/^;.*/, null],                      // comments
        [/^\s+/, null],                      // whitespace
        [/^[\w_]{1}[^;]*:/, 'LABEL'],        // labels
        [/^lo8|^LO8/, 'LO8'],                // lo8
        [/^hi8|^HI8/, 'HI8'],                // hi8
        [/^[rR]\d+/, 'REG'],                 // registers
        [/^-{0,1}0x[\dABCDEFabcdef]+|^-{0,1}\$[\dABCDEFabcdef]+|^-{0,1}0b[01]+/, 'INT'], // numbers
        [/^-{0,1}\d+/, 'INT'],              // numbers
        [/^[a-zA-Z]{2,6}/, 'INST'],         // instructions → CAN TURN LABELS USED IN AN INSTRUCTION INTO INST TYPE
        [/^\".*?\"|^\'.*?\'/, 'STR'],       // string
        [/^\.[^\.\s]+/, 'DIR'],             // directives
        [/^[YZ]\+\d{1,2}/, 'WORDPLUSQ'],    // word+q
        [/^[XYZ]\+/, 'WORDPLUS'],           // word+
        [/^-[XYZ]/, 'MINUSWORD'],           // -word
        [/^[XYZ]/, 'WORD'],                 // word
        [/^,/, 'COMMA'],                    // comma
        [/^[^\w\s]+/, 'SYMBOL'],            // symbols
        [/^[^\s\d]{1}[\w\d_]*/, 'REF']      // references (like labels used in an instruction) → Called STRING in sim.py
    ];

    // Iterate over the input code, finding matches for each token type
    while (pos < line.length) {
        let match = null;

        for (let i = 0; i < PATTERNS.length; i++) {
            const [regex, tag] = PATTERNS[i];
            match = regex.exec(line.slice(pos));

            if (match) {
                if (tag) {
                    console.log(tag)
                    if (tag == 'REG' || tag == 'INT' || tag == 'WORDPLUSQ' || tag == 'WORDPLUS' || tag == 'MINUSWORD' || tag == 'WORD' || tag == 'REF') {
                        const token = new Token(tag, match[0]);
                        tokens.push(token);
                    }
                }
                break;
            }
        }

        if (!match) {
            return;
        }

        pos += match[0].length;
    }

    // Fixing any bad tokens (like REFs being INST tokens)
    let i = 0;
    while (i < tokens.length) {
        let current_tok = tokens[i];

        // Turn REG:Rn into REG:n
        if (current_tok.getType() === 'REG' && !Number.isInteger(current_tok.getValue())) {
            const num = current_tok.getValue().substring(1); // the register number
            current_tok.setValue(parseInt(num));
        } else {
            i += 1;
        }
    }

    return tokens;
}

function validateInstruction(instruction, operand, line) {
    const operandRules = INST_OPERANDS[instruction];
    if (operandRules) {
        if (operandRules.length !== operand.length) {
            return {
                valid: false,
                message: `Expected ${operandRules.length} arguments, but got ${operand.length}.`
            };
        }

        const tokens = simplifiedTokenize(line);
        for (let i = 0; i < operandRules.length; i++) {
            const rule = operandRules[i];
            const tok = tokens[i];

            const legalTokenType = rule.getTokenType();
            const providedTokenType = tok.getType();
            const providedTokenValue = tok.getValue();

            if (!legalTokenType.includes(providedTokenType)) {
                const prettyType = Array.isArray(legalTokenType) ? legalTokenType.join(" OR ") : legalTokenType;
                return {
                    valid: false,
                    message: `Expected type ${prettyType}, but got ${providedTokenType}`,
                    position: line.indexOf(providedTokenValue) + 1,
                    length: providedTokenValue.length
                };
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
    const lines = text.split('\n');
    const markers = [];

    if (!lines[0].startsWith(".section")) {
        markers.push({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: lines[0].length + 1,
            severity: 8, // ERROR
            message: "First line must be a '.section' directive."
        });
    }

    if (lines[0].trim() !== ".section .data" || !lines[0].trim() == ".section .text") {
        markers.push({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: lines[0].length + 1,
            severity: 8, // ERROR
            message: "First line must be either '.section .data' or '.section .text'."
        });
    }

    if (lines[lines.length - 1].trim() !== ".end") {
        markers.push({
            startLineNumber: lines.length,
            startColumn: 1,
            endLineNumber: lines.length,
            endColumn: lines[lines.length - 1].length + 1,
            severity: 8, // ERROR
            message: "Final line must be '.end'."
        });
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let tokens = line.trim().split(/[\s,]+/);
        let inst = tokens[0].toUpperCase();
        
        let operands = tokens.slice(1);
        for (let i = 0; i < operands.length; i++) {
            if (operands[i] == "," || operands[i] == "") {
                operands.splice(i, 1);
            }
        }

        const validationResult = validateInstruction(inst, operands, line);
        if (!validationResult.valid) {
            markers.push({
                startLineNumber: i + 1,
                startColumn: validationResult.position ?? 1,
                endLineNumber: i + 1,
                endColumn: validationResult.length ? validationResult.position + validationResult.length : line.length + 1,
                severity: 8, // ERROR
                message: validationResult.message
            });
        }
    }

    return markers;
}

export { checkSyntax }