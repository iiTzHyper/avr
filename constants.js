export const basicAvrManual = {
    ADC: `
      Syntax:   ADC Rd, Rr
      Family:   Arithmetic Instructions
      Function: Adds both registers and the value of the C flag together
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rd + Rr + C`,
    ADD: `
      Syntax: ADD Rd, Rr
      Family: Arithmetic Instructions
      Function: Adds both registers together
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rd + Rr`,
    ADIW: `
      Syntax:   ADIW Rd, K
      Family:   Arithmetic Instructions
      Function: Adds K to the word register Rd+1:Rd
  
      Boundaries:
      Rd → [R24, R26, R28, R30]
      K  → [0 - 63]
  
      Operation:
      Rd+1:Rd = Rd+1:Rd + K
  
      Example:
      ADIW R24, 15
      → R25:R24 = R25:R24 + 15`,
    AND: `
      Syntax:   AND Rd, Rr
      Family:   Logic Instructions
      Function: Performs the logical AND on the bit values of Rd and Rr
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rd • Rr`,
    ANDI: `
      Syntax:   ANDI Rd, K
      Family:   Logic Instructions
      Function: Performs the logical AND on the bit values of Rd and K
  
      Boundaries:
      Rd → [R16 - R31]
      K  → [0 - 255]
  
      Operation:
      Rd = Rd • K`,
    ASR: `
      Syntax:   ASR Rd
      Family:   Bit & Bit Test Instructions
      Function: Shifts every bit to the right. Bit 7 doesnt change. Bit 0 goes into C flag.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operations:
      C = Rd(0)
      Rd(7) → unchanged
      Rd(6:0) = Rd(7:1)
  
      Example:
      ASR R20 (where R20 = 10010011 = 147)
      → C = 1
      → R20 = 11001001 = 201`,
    BCLR: `
      Syntax:   BCLR s
      Family:   Bit & Bit Test Instructions
      Function: Clears a single flag in the SREG
  
      Boundaries:
      s → [0 - 7]
  
      Operation:
      SREG(s) = 0`,
    BLD: `Syntax:   BLD Rd, b
      Family:   Bit & Bit Test Instructions
      Function: Loads the value of the SREG T flag into bit b of Rd
  
      Boundaries:
      Rd → [R0 - R31]
      b → [0 - 7]
  
      Operation:
      Rd(b) = T`,
    BRBC: `
      Syntax:   BRBC s, k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG bit s is cleared (SREG(s) = 0)
  
      Boundaries:
      s → [0 - 7]
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if SREG(s) = 0 }
      PC = PC + 1 { else }`,
    BRBS: `
      Syntax:   BRBS s, k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG bit s is set (SREG(s) = 1)
  
      Boundaries:
      s → [0 - 7]
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if SREG(s) = 1 }
      PC = PC + 1 { else }`,
    BRCC: `
      Syntax:   BRCC k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG carry flag is cleared (C = 0)
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if C = 0 }
      PC = PC + 1 { else }`,
    BRCS: `
      Syntax:   BRCS k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG carry flag is set (C = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if C = 1 }
      PC = PC + 1 { else }`,
    BREQ: `
      Syntax:   BREQ k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG zero flag is set (Z = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if Z = 1 }
      PC = PC + 1 { else }`,
    BRGE: `
      Syntax:   BRGE k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG signed flag is cleared (S = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if S = 0 }
      PC = PC + 1 { else }`,
    BRHC: `
      Syntax:   BRHC k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG half carry flag is cleared (H = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if H = 0 }
      PC = PC + 1 { else }`,
    BRHS: `
      Syntax:   BRHS k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG half carry flag is set (H = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if H = 1 }
      PC = PC + 1 { else }`,
    BRID: `
      Syntax:   BRID k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG interrupt flag is cleared (I = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if I = 0 }
      PC = PC + 1 { else }`,
    BRIE: `
      Syntax:   BRHC k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG interrupt flag is set (I = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if I = 1 }
      PC = PC + 1 { else }`,
    BRLO: `
      Syntax:   BRLO k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG carry flag is set (C = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if C = 1 }
      PC = PC + 1 { else }`,
    BRLT: `
      Syntax:   BRLT k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG signed flag is set (S = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if S = 1 }
      PC = PC + 1 { else }`,
    BRMI: `
      Syntax:   BRMI k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG negative flag is set (N = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if N = 1 }
      PC = PC + 1 { else }`,
    BRNE: `
      Syntax:   BRNE k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG zero flag is cleared (Z = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if Z = 0 }
      PC = PC + 1 { else }`,
    BRPL: `
      Syntax:   BRPL k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG negative flag is cleared (N = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if N = 0 }
      PC = PC + 1 { else }`,
    BRSH: `
      Syntax:   BRSH k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG carry flag is cleared (C = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if C = 0 }
      PC = PC + 1 { else }`,
    BRTC: `
      Syntax:   BRTC k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG transfer flag is cleared (T = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if T = 0 }
      PC = PC + 1 { else }`,
    BRTS: `
      Syntax:   BRTS k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG transfer flag is set (T = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if T = 1 }
      PC = PC + 1 { else }`,
    BRVC: `
      Syntax:   BRVC k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG overflow flag is cleared (V = 0)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if V = 0 }
      PC = PC + 1 { else }`,
    BRVS: `
      Syntax:   BRVS k
      Family:   Branch Instructions
      Function: Brach k spaces in PMEM if SREG overflow flag is set (V = 1)
  
      Boundaries:
      k → [-64 - 63]
  
      Operations:
      PC = PC + k + 1 { if V = 1 }
      PC = PC + 1 { else }`,
    BSET: `
      Syntax:   BSET s
      Family:   Bit & Bit Test Instructions
      Function: Sets a single flag in the SREG
  
      Boundaries:
      s → [0 - 7]
  
      Operation:
      SREG(s) = 1`,
    BST: `
      Syntax:   BST Rd, b
      Family:   Bit & Bit Test Instructions
      Function: Stores the value of Rd bit b into the SREG T flag
  
      Boundaries:
      Rd → [R0 - R31]
      b → [0 - 7]
  
      Operation:
      T = Rd(b)`,
    CALL: `
      Syntax:   CALL k
      Family:   Branch Instructions
      Function: Calls to a subroutine within the entire Program memory. The return address (to the instruction after the CALL) will be stored onto the Stack. The Stack Pointer uses a post-decrement scheme during CALL.
  
      Boundaries:
      k → [0 - 65535]
  
      Operations:
      PC = k
      SP = SP - 2
      STACK ← PC + 2`,
    CBI: `
      Syntax:   CBI A, b
      Family:   Bit & Bit Test Instructions
      Function: Clears a specified bit in an I/O register. This instruction operates on the lower 32 I/O registers with addresses 0-31.
  
      Boundaries:
      A → [0 - 31]
      b → [0 - 7]
  
      Operation:
      I/O(A, b) = 0`,
    CBR: `
      Syntax:   CBR Rd, K
      Family:   Logic Instructions
      Function: Clears the bits of Rd that correspond to the 1's in the binary value of K. CBR does this by performing the logical AND between Rd and the complement of K.
  
      Boundaries:
      Rd → [R16 - R31]
      K  → [0 - 255]
  
      Operation:
      Rd = Rd • (255 - K)`,
    CLC: `
      Syntax:   CLC
      Family:   Bit & Bit Test Instructions
      Function: Clears the carry flag (C) in the SREG
  
      Operation:
      C = 0`,
    CLH: `
      Syntax:   CLH
      Family:   Bit & Bit Test Instructions
      Function: Clears the half carry flag (H) in the SREG
  
      Operation:
      H = 0`,
    CLI: `
      Syntax:   CLI
      Family:   Bit & Bit Test Instructions
      Function: Clears the global interrupt flag (I) in the SREG
  
      Operation:
      I = 0`,
    CLN: `
      Syntax:   CLN
      Family:   Bit & Bit Test Instructions
      Function: Clears the negative flag (N) in the SREG
  
      Operation:
      N = 0`,
    CLR: `
      Syntax:   CLR Rd
      Family:   Logic Instructions
      Function: Clears a register. This instruction performs an Exclusive OR between a register and itself. This will clear all bits in the register.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation:
      Rd = Rd ⊕ Rd`,
    CLS: `
      Syntax:   CLS
      Family:   Bit & Bit Test Instructions
      Function: Clears the signed flag (S) in the SREG
  
      Operation:
      S = 0`,
    CLT: `
      Syntax:   CLT
      Family:   Bit & Bit Test Instructions
      Function: Clears the transfer bit flag (T) in the SREG
  
      Operation:
      T = 0`,
    CLV: `
      Syntax:   CLV
      Family:   Bit & Bit Test Instructions
      Function: Clears the overflow flag (V) in the SREG
  
      Operation:
      V = 0`,
    CLZ: `
      Syntax:   CLZ
      Family:   Bit & Bit Test Instructions
      Function: Clears the zero flag (Z) in the SREG
  
      Operation:
      Z = 0`,
    COM: `
      Syntax:   COM Rd
      Family:   Logic Instructions
      Function: Performs a ones complement of register Rd
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation:
      Rd = 255 - Rd`,
    CP: `
      Syntax:   CP Rd, Rr
      Family:   Branch Instructions
      Function: Performs a compare between two registers Rd and Rr. None of the registers are changed. All conditional branches can be used after this instruction.
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd - Rr (not stored back into any register)`,
    CPC: `
      Syntax:   CPC Rd, Rr
      Family:   Branch Instructions
      Function: Performs a compare between two registers Rd and Rr and also takes into account the previous carry. None of the registers are changed. All conditional branches can be used after this instruction.                    
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd - Rr - C (not stored back into any register)`,
    CPI: `
      Syntax:   CPI Rd, K
      Family:   Branch Instructions
      Function: Performs a compare between register Rd and a constant. The register is not changed. All conditional branches can be used after this instruction.
  
      Boundaries:
      Rd → [R16 - R31]
      K → [0 - 255]
  
      Operation:
      Rd - K (not stored back into any register)`,
    CPSE: `
      Syntax:   CPSE Rd, Rr
      Family:   Branch Instructions
      Function: Performs a compare between two registers Rd and Rr, and skips the next instruction if Rd = Rr
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation Options:
      PC = PC + 1 { if Rd != Rr }
      PC = PC + 2 { if Rd = Rr and the next instruction is 16 bits }
      PC = PC + 3 { if Rd = Rr and the next instruction is 32 bits }`,
    DEC: `
      Syntax:   DEC Rd
      Family:   Arithmetic Instructions
      Function: Subtracts 1 from the contents of register Rd and places the result in the destination register Rd. The C flag in SREG is not affected by the operation.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation:
      Rd = Rd - 1`,
    EOR: `
      Syntax:   EOR Rd, Rr
      Family:   Logic Instructions
      Function: Performs the logical EOR between the contents of register Rd and register Rr and places the result in the destination register Rd
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rd ⊕ Rr`,
    ICALL: `Syntax:   ICALL
      Family:   Branch Instructions
      Function: Calls to a subroutine within the entire 4M (words) Program memory. The return address (to the instruction after the CALL) will be stored onto the Stack. See also RCALL. The Stack Pointer uses a post-decrement scheme during CALL. This instruction is not available in all devices. Refer to the device specific instruction set summary.
      Operations:
      PC = Z(15:0)
      SP = SP - 2
      STACK ← PC + 1`,
    IJMP: `
      Syntax:   IJMP
      Family:   Branch Instructions
      Function: Indirect jump to the address pointed to by the Z (16 bits) Pointer Register in the Register File. The Zpointer Register is 16 bits wide and allows jump within the lowest 64K words (128KB) section of Program memory. This instruction is not available in all devices. Refer to the device specific instruction set summary.
      Operation:
      PC = Z(15:0)`,
    IN: `
      Syntax:   IN Rd, A
      Family:   Data Transfer Instructions
      Function: Loads data from the I/O space (ports, timers, configuration registers, etc.) into register Rd in the register file
  
      Boundaries:
      Rd → [R0 - R31]
      A → [0 - 63]
  
      Operation:
      Rd = I/O(A)`,
    INC: `
      Syntax:   INC Rd
      Family:   Arithmetic Instructions
      Function: Adds 1 to the contents of register Rd and places the result in the destination register Rd. The C flag in SREG is not affected by the operation.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation:
      Rd = Rd + 1`,
    JMP: `
      Syntax:   JMP k
      Family:   Branch Instructions
      Function: Jump to an address within the entire program memory. See also RJMP. This instruction is not available in all devices. Refer to the device specific instruction set summary.
  
      Boundaries:
      k → [0 - 4194303]
  
      Operation:
      PC = k`,
    LD_X: `
      Syntax: (i) LD Rd, X
      &emsp;&emsp;&emsp;&ensp;(ii) LD Rd, X+
      &emsp;&emsp;&emsp;&nbsp;(iii) LD Rd, -X
      Family: Data Transfer Instructions
      Function: Loads one byte indirect from data memory into register Rd using X as the pointer to the data memory cell. Can post-increment X with the X+ variant or can pre-decrement X with the -X variant.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation Options:
      (i) &ensp;Rd ← (X)
      (ii)&ensp;Rd ← (X), X = X + 1
      (iii) X = X - 1, Rd ← (X)`,
    LD_Y: `
      Syntax: (i) LD Rd, Y
      &emsp;&emsp;&emsp;&ensp;(ii) LD Rd, Y+
      &emsp;&emsp;&emsp;&nbsp;(iii) LD Rd, -Y
      Family:   Data Transfer Instructions
      Function: Loads one byte indirect from data memory into register Rd using Y as the pointer to the data memory cell. Can post-increment Y with the Y+ variant or can pre-decrement Y with the -Y variant.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation Options:
      (i) &ensp;Rd ← (Y)
      (ii)&ensp;Rd ← (Y), Y = Y + 1
      (iii) Y = Y - 1, Rd ← (Y)`,
    LD_Z: `
      Syntax: (i) LD Rd, Z
      &emsp;&emsp;&emsp;&ensp;(ii) LD Rd, Z+
      &emsp;&emsp;&emsp;&nbsp;(iii) LD Rd, -Z
      Family:   Data Transfer Instructions
      Function: Loads one byte indirect from data memory into register Rd using Z as the pointer to the data memory cell. Can post-increment Z with the Z+ variant or can pre-decrement Z with the -Z variant.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation Options:
      (i) &ensp;Rd ← (Z)
      (ii)&ensp;Rd ← (Z), Z = Z + 1
      (iii) Z = Z - 1, Rd ← (Z)`,
    LDD: `
      Syntax: (i) LDD Rd, Y+q
      &emsp;&emsp;&emsp;&ensp;(ii) LDD Rd, Z+q
      Family: Data Transfer Instructions
      Function: Uses the Y (or Z) word-register as a pointer to data memory and loads the value at address Y+q (or Z+q) into register Rd, using q as the displacement from Y (or Z). Y (or Z) is left unchanged after the operation.
  
      Boundaries:
      Rd → [R0 - R31]
      q → [0 - 63]
  
      Operation Options:
      (i)&ensp;Rd ← (Y+q) 
      (ii) Rd ← (Z+q)`,
    LDI: `
      Syntax: LDI Rd, K
      Family: Data Transfer Instructions
      Function: Loads an 8-bit constant directly to register 16 to 31
  
      Boundaries:
      Rd → [R16 - R31]
      K → [0 - 255]
  
      Operation:
      Rd = K`,
    LDS: `
      Syntax: LDS Rd, k
      Family: Data Transfer Instructions
      Function: Loads one byte indirect from data memory into register Rd using k as a pointer
  
      Boundaries:
      Rd → [R16 - R31]
      k → [0 - 65535]
  
      Operation:
      Rd ← (k)`,
    LPM: `
      Syntax: (i) LPM
      &emsp;&emsp;&emsp;&ensp;(ii) LPM Rd, Z
      &emsp;&emsp;&emsp;&nbsp;(iii) LPM Rd, Z+
      Family:   Data Transfer Instructions
      Function: Loads one byte pointed to by the Z-register into the destination register Rd. Can post-increment Z with the Z+ variant.
      Boundaries:
      Rd → [R0 - R31]
      Operation Options:
      (i) &ensp;R0 ← (Z)
      (ii) &ensp;Rd ← (Z)
      (iii)&ensp;Rd ← (Z), Z = Z + 1`,
    LSL: `
      Syntax:   LSL Rd
      Family:   Bit & Bit Test Instructions
      Function: Shifts all bits in Rd one place to the left. Bit 0 is cleared. Bit 7 is loaded into the C flag of the SREG. This operation effectively multiplies signed and unsigned values by two.
      
      Boundaries:
      Rd → [R0 - R31]
  
      Operations:
      C = Rd(7)
      Rd(7:1) = Rd(6:0)
      Rd(0) = 0
  
      Example:
      LSL R20 (where R20 = 10010011 = 147)
      → C = 1
      → R20 = 00100110 = 38`,
    LSR: `
      Syntax:   LSR Rd
      Family:   Bit & Bit Test Instructions
      Function: Shifts all bits in Rd one place to the right. Bit 7 is cleared. Bit 0 is loaded into the C flag of the SREG. This operation effectively divides an unsigned value by two. The C flag can be used to round the result.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operations:
      C = Rd(0)
      Rd(6:0) = Rd(7:1)
      Rd(7) = 0
  
      Example:
      LSR R20 (where R20 = 10010011 = 147)
      → C = 1
      → R20 = 01001001 = 73`,
    MOV: `
      Syntax: MOV Rd, Rr
      Family: Data Transfer Instructions
      Function: Makes a copy of one register into another. The source register Rr is left unchanged, while the destination register Rd is loaded with a copy of Rr.
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rr`,
    MOVW: `
      Syntax: MOVW Rd, Rr
      Family: Data Transfer Instructions
      Function: Makes a copy of one register pair into another register pair. The source register pair Rr+1:Rr is left unchanged, while the destination register pair Rd+1:Rd is loaded with a copy of Rr+1:Rr.
  
      Boundaries:
      Rd → [R0, R2, R4, R6, etc] (even registers)
      Rr → [R0, R2, R4, R6, etc] (even registers)
  
      Operation:
      Rd+1:Rd = Rr+1:Rr`,
    MUL: `
      Syntax:   MUL Rd, Rr
      Family:   Arithmetic Instructions
      Function: This instruction performs 8-bit x 8-bit → 16-bit unsigned multiplication. The resulting value is stored in R1:R0.
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      R1:R0 ← Rd x Rr (unsigned ← unsigned x unsigned)`,
    MULS: `
      Syntax:   MULS Rd, Rr
      Family:   Arithmetic Instructions
      Function: This instruction performs 8-bit x 8-bit → 16-bit signed multiplication. The resulting value is stored in R1:R0.
  
      Boundaries:
      Rd → [R16 - R31]
      Rr → [R16 - R31]
  
      Operation:
      R1:R0 ← Rd x Rr (signed ← signed x signed)`,
    MULSU: `
      Syntax:   MULS Rd, Rr
      Family:   Arithmetic Instructions
      Function: This instruction performs 8-bit x 8-bit → 16-bit multiplication of a signed and an unsigned number. The resulting value is stored in R1:R0.
  
      Boundaries:
      Rd → [R16 - R23]
      Rr → [R16 - R23]
  
      Operation:
      R1:R0 ← Rd x Rr (signed ← signed x unsigned)`,
    NEG: `
      Syntax:   NEG Rd
      Family:   Logic Instructions
      Function: Performs a twos complement of register Rd. The value 128 is left unchanged.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation:
      Rd = 0 - Rd`,
    NOP: `
      Syntax:   NOP
      Family:   MCU Control Instructions
      Function: Performs a single cycle no operation
  
      Operation:
      No operation`,
    OR: `
      Syntax: OR Rd, Rr
      Family: Logic Instructions
      Function: Performs the logical OR on the bit values of Rd and Rr
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rd ∨ Rr`,
    ORI: `
      Syntax: ORI Rd, K
      Family: Logic Instructions
      Function: Performs the logical OR on the bit values of Rd and K
  
      Boundaries:
      Rd → [R16 - R31]
      K → [0 - 255]
  
      Operation:
      Rd = Rd ∨ K`,
    OUT: `
      Syntax:   OUT A, Rr
      Family:   Data Transfer Instructions
      Function: Stores data into the I/O space (ports, timers, configuration registers, etc.) from register Rr in the register file
  
      Boundaries:
      A → [0 - 63]
      Rr → [R0 - R31]
  
      Operation:
      I/O(A) = Rr`,
    POP: `
      Syntax:   POP Rd
      Family:   Data Transfer Instructions
      Function: Loads register Rd with a byte from the STACK. The Stack Pointer is pre-incremented by 1 before the POP.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation:
      SP = SP + 1
      Rd ← STACK (top value from the stack)`,
    PUSH: `
      Syntax:   PUSH Rr
      Family:   Data Transfer Instructions
      Function: Stores the contents of register Rr on the STACK. The Stack Pointer is post-decremented by 1 after the PUSH.
  
      Boundaries:
      Rr → [R0 - R31]
  
      Operation:
      STACK ← Rr (Rr onto the top of the stack)
      SP = SP - 1`,
    RET: `
      Syntax:   RET
      Family:   Branch Instructions
      Function: Returns from subroutine. The return address is loaded from the STACK. The Stack Pointer uses a preincrement scheme during RET.
  
      Operation:
      PC(15:0) ← STACK`,
    RCALL: `
      Syntax:   RCALL k
      Family:   Branch Instructions
      Function: Relative call to an address within PC - 2047 and PC + 2048 (words)
      Boundaries:
      k → [-2048 - 2047]
      Operation:
      PC = PC + k + 1
      SP = SP - 2
      STACK ← PC + 1`,
    RJMP: `
      Syntax:   RJMP k
      Family:   Branch Instructions
      Function: Relative jump to an address within PC - 2047 and PC + 2048 (words)
  
      Boundaries:
      k → [-2048 - 2047]
  
      Operation:
      PC = PC + k + 1`,
    ROL: `
      Syntax:   ROL Rd
      Family:   Bit & Bit Test Instructions
      Function: Shifts all bits in Rd one place to the left. The C flag is shifted into bit 0 of Rd. Bit 7 is shifted into the C flag. This operation, combined with LSL, effectively multiplies multi-byte signed and unsigned values by two.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Diagram:
      &emsp;&emsp;&emsp;&emsp;&ensp;←
      C ← [b7---------b0] ← C
  
      Operations:
      C = Rd(7)
      Rd(7:1) = Rd(6:0)
      Rd(0) = C
  
      Example:
      ROL R20 (where R20 = 00010011 = 19 and C = 1)
      → C = 0
      → R20 = 00100111 = 39`,
    ROR: `
      Syntax:   ROR Rd
      Family:   Bit & Bit Test Instructions
      Function: Shifts all bits in Rd one place to the right. The C flag is shifted into bit 7 of Rd. Bit 0 is shifted into the C flag. This operation, combined with ASR, effectively divides multi-byte signed values by two. Combined with LSR it effectively divides multi-byte unsigned values by two. The carry flag can be used to round the result.
      
      Boundaries:
      Rd → [R0 - R31]
  
      Diagram:
      &emsp;&emsp;&emsp;&emsp;&ensp;→
      C → [b7---------b0] → C
  
      Operations:
      C = Rd(0)
      Rd(6:0) = Rd(7:1)
      Rd(7) = C
  
      Example:
      ROR R20 (where R20 = 00010010 = 18 and C = 1)
      → C = 0
      → R20 = 10001001 = 137`,
    SBC: `
      Syntax:   SBC Rd, Rr
      Family:   Arithmetic Instructions
      Function: Subtracts two registers and subtracts with the C flag
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rd - Rr - C`,
    SBCI: `
      Syntax:   SBC Rd, K
      Family:   Arithmetic Instructions
      Function: Subtracts a constant from a register and subtracts with the C flag
  
      Boundaries:
      Rd → [R0 - R31]
      K → [0 - 255]
  
      Operation:
      Rd = Rd - K - C`,
    SBI: `
      Syntax:   SBI A, b
      Family:   Bit & Bit Test Instructions
      Function: Sets a specified bit in an I/O register. This instruction operates on the lower 32 I/O registers with addresses 0-31.
  
      Boundaries:
      A → [0 - 31]
      b → [0 - 7]
  
      Operation:
      I/O(A, b) = 1`,
    SBIW: `
      Syntax:   SBIW Rd, K
      Family:   Arithmetic Instructions
      Function: Subtracts K from the word register Rd+1:Rd
  
      Boundaries:
      Rd → [R24, R26, R28, R30]
      K  → [0 - 63]
  
      Operation:
      Rd+1:Rd = Rd+1:Rd - K
  
      Example:
      SBIW R24, 15
      → R25:R24 = R25:R24 - 15`,
    SBR: `
      Syntax: SBR Rd, K
      Family: Logic Instructions
      Function: Performs the logical OR on the bit values of Rd and K
  
      Boundaries:
      Rd → [R16 - R31]
      K → [0 - 255]
  
      Operation:
      Rd = Rd ∨ K`,
    SBRC: `
      Syntax:   SBRC Rr, b
      Family:   Branch Instructions
      Function: Tests a single bit in a register and skips the next instruction if the bit is cleared
  
      Boundaries:
      Rr → [R0 - R31]
      b → [0 - 7]
  
      Operation Options:
      PC = PC + 1 { if Rr(b) = 1 }
      PC = PC + 2 { if Rr(b) = 0 and the next instruction is 16 bits }
      PC = PC + 3 { if Rr(b) = 0 and the next instruction is 32 bits }`,
    SBRS: `
      Syntax:   SBRS Rr, b
      Family:   Branch Instructions
      Function: Tests a single bit in a register and skips the next instruction if the bit is set
  
      Boundaries:
      Rr → [R0 - R31]
      b → [0 - 7]
  
      Operation Options:
      PC = PC + 1 { if Rr(b) = 0 }
      PC = PC + 2 { if Rr(b) = 1 and the next instruction is 16 bits }
      PC = PC + 3 { if Rr(b) = 1 and the next instruction is 32 bits }`,
    SEC: `
      Syntax:   SEC
      Family:   Bit & Bit Test Instructions
      Function: Sets the carry flag (C) in the SREG
  
      Operation:
      C = 1`,
    SEH: `
      Syntax:   SEH
      Family:   Bit & Bit Test Instructions
      Function: Sets the half carry flag (H) in the SREG
  
      Operation:
      H = 1`,
    SEI: `
      Syntax:   SEI
      Family:   Bit & Bit Test Instructions
      Function: Sets the global interrupt flag (I) in the SREG
  
      Operation:
      I = 1`,
    SEN: `
      Syntax:   SEN
      Family:   Bit & Bit Test Instructions
      Function: Sets the negative flag (N) in the SREG
  
      Operation:
      N = 1`,
    SER: `
      Syntax:   SER
      Family:   Logic Instructions
      Function: Loads 255 directly to register Rd
  
      Boundaries:
      Rd → [R16 - R31]
  
      Operation:
      Rd = 255`,
    SES: `
      Syntax:   SES
      Family:   Bit & Bit Test Instructions
      Function: Sets the signed flag (S) in the SREG
  
      Operation:
      S = 1`,
    SET: `
      Syntax:   SET
      Family:   Bit & Bit Test Instructions
      Function: Sets the transfer bit flag (T) in the SREG
  
      Operation:
      T = 1`,
    SEV: `
      Syntax:   SEV
      Family:   Bit & Bit Test Instructions
      Function: Sets the overflow flag (V) in the SREG
  
      Operation:
      V = 1`,
    SEZ: `
      Syntax:   SEZ
      Family:   Bit & Bit Test Instructions
      Function: Sets the zero flag (Z) in the SREG
  
      Operation:
      Z = 1`,
    ST_X: `
      Syntax: (i) ST X, Rr
      &emsp;&emsp;&emsp;&ensp;(ii) ST X+, Rr
      &emsp;&emsp;&emsp;&nbsp;(iii) ST -X, Rr
      Family: Data Transfer Instructions
      Function: Stores one byte from register Rr into data memory using indirection with X as the pointer to the data memory cell. Can post-increment X with the X+ variant or can pre-decrement X with the -X variant.
  
      Boundaries:
      Rr → [R0 - R31]
  
      Operation Options:
      (i) &ensp;(X) ← Rr
      (ii)&ensp;(X) ← Rr, X = X + 1
      (iii) X = X - 1, (X) ← Rr`,
    ST_Y: `
      Syntax: (i) ST Y, Rr
      &emsp;&emsp;&emsp;&ensp;(ii) ST Y+, Rr
      &emsp;&emsp;&emsp;&nbsp;(iii) ST -Y, Rr
      Family: Data Transfer Instructions
      Function: Stores one byte from register Rr into data memory using indirection with Y as the pointer to the data memory cell. Can post-increment Y with the Y+ variant or can pre-decrement Y with the -Y variant.
  
      Boundaries:
      Rr → [R0 - R31]
  
      Operation Options:
      (i) &ensp;(Y) ← Rr
      (ii)&ensp;(Y) ← Rr, Y = Y + 1
      (iii) Y = Y - 1, (Y) ← Rr`,
    ST_Z: `
      Syntax: (i) ST Z, Rr
      &emsp;&emsp;&emsp;&ensp;(ii) ST Z+, Rr
      &emsp;&emsp;&emsp;&nbsp;(iii) ST -Z, Rr
      Family: Data Transfer Instructions
      Function: Stores one byte from register Rr into data memory using indirection with Z as the pointer to the data memory cell. Can post-increment Z with the Z+ variant or can pre-decrement Z with the -Y variant.
  
      Boundaries:
      Rr → [R0 - R31]
  
      Operation Options:
      (i) &ensp;(Z) ← Rr
      (ii)&ensp;(Z) ← Rr, Z = Z + 1
      (iii) Z = Z - 1, (Z) ← Rr`,
    STD: `
      Syntax: (i) LDD Y+q, Rr
      &emsp;&emsp;&emsp;&ensp;(ii) LDD Z+q, Rr
      Family: Data Transfer Instructions
      Function: Uses the Y (or Z) word-register as a pointer to data memory and store the value of register Rr into address Y+q (or Z+q), using q as the displacement from Y (or Z). Y (or Z) is left unchanged after the operation.
  
      Boundaries:
      Rr → [R0 - R31]
      q → [0 - 63]
  
      Operation Options:
      (i)&ensp;(Y+q) ← Rr 
      (ii) (z+q) ← Rr `,
    STS: `
      Syntax: STS k, Rr
      Family: Data Transfer Instructions
      Function: Stores the value of register Rr indirectly into data memory using k as a pointer
  
      Boundaries:
      k → [0 - 65535]
      Rr → [R0 - R31]
  
      Operation:
      (k) ← Rr`,
    SUB: `
      Syntax: SUB Rd, Rr
      Family: Arithmetic Instructions
      Function: Subtracts one register from another
  
      Boundaries:
      Rd → [R0 - R31]
      Rr → [R0 - R31]
  
      Operation:
      Rd = Rd - Rr`,
    SUBI: `
      Syntax:   SUBI Rd, K
      Family:   Arithmetic Instructions
      Function: Subtracts the constant K from the register Rd
  
      Boundaries:
      Rd → [R16 - R31]
      K  → [0 - 255]
  
      Operation:
      Rd = Rd - K`,
    SWAP: `
      Syntax:   SWAP Rd
      Family:   Bit & Bit Test Instructions
      Function: Swaps the high and low 4 bits in a register
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operations:
      Rd(7:4) = Rd(3:0)
      Rd(3:0) = Rd(7:4)
  
      Example:
      SWAP R20 (where R20 = 11110000 = 240)
      → R20 = 00001111 = 15`,
    TST: `
      Syntax:   TST Rd
      Family:   Logic Instructions
      Function: Tests if a register is zero or negative. Performs a logical AND between a register and itself. The register will remain unchanged.
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operation:
      Rd = Rd • Rd`,
    XCH: `
      Syntax:   XCH Z, Rd
      Family:   Data Transfer Instructions
      Function: Exchanges one byte indirect between register and data space using Z as a pointer to the data memory cell
  
      Boundaries:
      Rd → [R0 - R31]
  
      Operations:
      (Z) ← Rd
      Rd ← (Z)`,
    PC: `
      Program Counter
  
      The purpose of the program counter is to store what line of the PMEM to execute next. The line number will be highlighted in blue to help show what line.`,
    SP: `
      Stack Pointer
  
      The purpose of the stack pointer is to store the location of the top of the stack. In AVR the stack pointer points to the line above the top value on the stack.`,
    X: `
      Definition: X means R27:R26 (two registers read as one 2 byte number)
      
      Calculation: Value of X = (R27 * 256) + R26
      
      Purpose: X is used to store the 2 byte address of a cell in DMEM. It is used in load and store instructions as a pointer to the relevant cell.`,
    Y: `
      Definition: Y means R29:R28 (two registers read as one 2 byte number)
      
      Calculation: Value of Y = (R29 * 256) + R28
      
      Purpose: Y is used to store the 2 byte address of a cell in DMEM. It is used in load and store instructions as a pointer to the relevant cell.`,
    Z: `
      Definition: Z means R31:R30 (two registers read as one 2 byte number)
      
      Calculation: Value of Z = (R31 * 256) + R30
      
      Purpose: Z is used to store the 2 byte address of a cell in DMEM. It is used in load and store instructions as a pointer to the relevant cell.`,
};

export const instructionSet = [
    'adc',
    'add',
    'adiw',
    'and',
    'andi',
    'asr',
    'bclr',
    'bld',
    'brbc',
    'brbs',
    'brcc',
    'brcs',
    'breq',
    'brge',
    'brhc',
    'brhs',
    'brid',
    'brie',
    'brlo',
    'brlt',
    'brmi',
    'brne',
    'brpl',
    'brsh',
    'brtc',
    'brts',
    'brvc',
    'brvs',
    'bset',
    'bst',
    'call',
    'cbi',
    'cbr',
    'clc',
    'clh',
    'cli',
    'cln',
    'clr',
    'cls',
    'clt',
    'clv',
    'clz',
    'com',
    'cp',
    'cpc',
    'cpi',
    'cpse',
    'dec',
    'eor',
    'icall',
    'ijmp',
    'in',
    'inc',
    'jmp',
    'ld',
    'ldd',
    'ldi',
    'lds',
    'lpm',
    'lsl',
    'lsr',
    'mov',
    'movw',
    'mul',
    'muls',
    'mulsu',
    'neg',
    'nop',
    'or',
    'ori',
    'out',
    'pop',
    'push',
    'rcall',
    'rjmp',
    'ret',
    'rol',
    'ror',
    'sbc',
    'sbci',
    'sbi',
    'sbiw',
    'sbr',
    'sbrc',
    'sbrs',
    'sec',
    'seh',
    'sei',
    'sen',
    'ser',
    'ses',
    'set',
    'sev',
    'sez',
    'st',
    'std',
    'sts',
    'sub',
    'subi',
    'swap',
    'tst',
    'xch'
]

export const functions = [
    'hi8',
    'lo8',
    'printf'
]

export const registers = [
    "r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9",
    "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19",
    "r20", "r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30",
    "r31"
]

export const directives = [
    '.section',
    '.text',
    '.data',
    '.global',
    '.end',
    '.byte',
    '.string',
    '.ascii',
    '.asciz',
    '.space',
    '.set',
    '.word'
]